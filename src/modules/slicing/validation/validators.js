export const validateSliceStartOffset = (offset, slices) => {
    let valid = true;
    let slice;
    for (let id of slices.allIds) {
        slice = slices.byId[id];
        if (offset >= slice.offset && offset < slice.offset + slice.duration) {
            valid = false;
            break;
        }
    }

    return valid;
};

export const validateSliceFinishOffset = (offset, sliceId, slices) => {
    let valid = true;
    const slice1 = slices.byId[sliceId];
    let slice2;

    for (let id of slices.allIds) {
        slice2 = slices.byId[id];
        if (id != sliceId && Math.max(slice1.offset, slice2.offset) <= Math.min(offset, slice2.offset + slice2.duration)) {
            valid = false;
            break;
        }
    }

    return valid;
};
