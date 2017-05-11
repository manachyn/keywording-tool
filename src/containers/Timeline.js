import { connect } from 'react-redux'
import Timeline from '../components/Timeline'

const mapStateToProps = (state) => {
    return {
        currentTime: state.video.currentTime,
        currentPercentage: state.video.currentPercentage,
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
