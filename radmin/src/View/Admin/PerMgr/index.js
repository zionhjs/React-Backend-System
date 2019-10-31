import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        total:state.PerList.total
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class PerMgr extends Component {
    render() {
        return (
            <div>
                {this.props.total}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(index);