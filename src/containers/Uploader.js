import { connect } from 'react-redux';
import { addAndSelect, remove } from '../modules/uploads/actions';
// import { getAllSlices } from '../modules/slicing/reducers/slices';
import Uploader from '../components/Uploader';

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFileUploaded: (id, url) => {
            dispatch(addAndSelect(url, id))
        },
        onFileDeleted: (id) => {
            dispatch(remove(id))
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Uploader);

