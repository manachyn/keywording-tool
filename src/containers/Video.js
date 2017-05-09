import { connect } from 'react-redux'
import { timeUpdate } from '../modules/video/actions'
import Video from '../components/Video'

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTimeUpdate: (currentTime, duration) => {
            dispatch(timeUpdate(currentTime, duration))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Video);
