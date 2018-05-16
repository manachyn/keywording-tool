const timeRegexp = /^((0[0-9]|[1-9][0-9]*):)?([0-9]|[0-5][0-9]):([0-5][0-9])$/;

export function formatTime(seconds, guide = seconds) {
    seconds = seconds < 0 ? 0 : seconds;
    let s = Math.floor(seconds % 60);
    let m = Math.floor(seconds / 60 % 60);
    let h = Math.floor(seconds / 3600);
    const gm = Math.floor(guide / 60 % 60);
    const gh = Math.floor(guide / 3600);

    // handle invalid times
    if (isNaN(seconds) || seconds === Infinity) {
        // '-' is false for all relational operators (e.g. <, >=) so this setting
        // will add the minimum number of fields specified by the guide
        h = m = s = '-';
    }

    // Check if we need to show hours
    h = (h > 0 || gh > 0) ? h + ':' : '';

    // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.
    m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';

    // Check if leading zero is need for seconds
    s = (s < 10) ? '0' + s : s;

    return h + m + s;
}

export function formatTimeFull(seconds, guide = seconds) {
    seconds = seconds < 0 ? 0 : seconds;
    let s = Math.floor(seconds % 60);
    let m = Math.floor(seconds / 60 % 60);
    let h = Math.floor(seconds / 3600);
    const gm = Math.floor(guide / 60 % 60);
    const gh = Math.floor(guide / 3600);

    // handle invalid times
    if (isNaN(seconds) || seconds === Infinity) {
        // '-' is false for all relational operators (e.g. <, >=) so this setting
        // will add the minimum number of fields specified by the guide
        h = m = s = '-';
    }

    h = (h < 10 ? '0' + h : h) + ':';

    // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.
    m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';

    // Check if leading zero is need for seconds
    s = (s < 10) ? '0' + s : s;

    return h + m + s;
}

export function isValidTime(time) {
    return timeRegexp.test(time);
}

export function timeToSeconds(timeString) {
    const timeArray = timeString.split(":");
    timeArray.reverse();
    const hours = timeArray[2] ? parseInt(timeArray[2]) * 60 * 60 : 0;
    const minutes = timeArray[1] ? parseInt(timeArray[1]) * 60 : 0;
    const seconds = timeArray[0] ? parseFloat(timeArray[0]) : 0;

    return hours + minutes + seconds;
}
