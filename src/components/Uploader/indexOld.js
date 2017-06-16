import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';

import 'react-fine-uploader/gallery/gallery.css';

const { func } = PropTypes;

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true,
            concurrent: {
                enabled: true
            },
            success: {
                endpoint: "http://workflow.mysitedemo.co.uk/endpoint-cors.php?done"
            }
        },
        deleteFile: {
            enabled: true,
            endpoint: 'http://workflow.mysitedemo.co.uk/endpoint-cors.php',
            method: 'POST'
        },
        request: {
            endpoint: 'http://workflow.mysitedemo.co.uk/endpoint-cors.php'
        },
        retry: {
            enableAuto: true
        }
    }
});

const isFileGone = status => {
    return ['canceled', 'deleted'].indexOf(status) >= 0
};

class Uploader extends Component {
    static propTypes = {
        onFileUploaded: func,
        onFileDeleted: func
    };

    componentDidMount() {
        //uploader.on('statusChange', this.handleStatusChange);
        uploader.on('complete', this.handleComplete);
        uploader.on('deleteComplete', this.handleDeleteComplete);
    }

    componentWillUnmount() {
        //uploader.off('statusChange', this.handleStatusChange);
        uploader.off('complete', this.handleComplete);
        uploader.off('deleteComplete', this.handleDeleteComplete);
    }

    handleStatusChange = (id, oldStatus, newStatus) => {
        //console.log('StatusChange', id, oldStatus, newStatus);
        if (newStatus === 'submitted') {

        }
        else if (isFileGone(newStatus)) {

        }
    };

    handleComplete = (id, name, response) => {
        if (this.props.onFileUploaded) this.props.onFileUploaded(id, 'http://workflow.mysitedemo.co.uk/files/' + response.uuid + '/' + name);
    };

    handleDeleteComplete = (id) => {
        if (this.props.onFileDeleted) this.props.onFileDeleted(id);
    };

    render() {
        return (
            <Gallery uploader={ uploader } />
        )
    }
}

export default Uploader;
