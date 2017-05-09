import { connect } from 'react-redux'
import Timeline from '../components/Timeline'

const mapStateToProps = (state) => {
    console.log(state);
    return {
        currentTime: state.rootReducer.video.currentTime,
        currentPercentage: state.rootReducer.video.currentPercentage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline);
