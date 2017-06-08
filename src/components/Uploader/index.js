import React, { Component } from 'react';

import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';

import 'react-fine-uploader/gallery/gallery.css';

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true,
            concurrent: {
                enabled: true
            },
            success: {
                endpoint: "http://storage.loc/endpoint-cors.php?done"
            }
        },
        deleteFile: {
            enabled: true,
            endpoint: 'http://storage.loc/endpoint-cors.php'
        },
        request: {
            endpoint: 'http://storage.loc/endpoint-cors.php'
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
    componentDidMount() {
        uploader.on('statusChange', this.handleStatusChange);
    }

    componentWillUnmount() {
        console.log('Unmount Uploader');
        uploader.off('statusChange', this.handleStatusChange);
    }

    handleStatusChange = (id, oldStatus, newStatus) => {
        console.log(id, oldStatus, newStatus);
        if (newStatus === 'submitted') {

        }
        else if (isFileGone(newStatus)) {

        }
    };

    render() {
        return (
            <Gallery uploader={ uploader } />
        )
    }
}

export default Uploader;
