import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'

import CancelButton from 'react-fine-uploader/cancel-button'
import DeleteButton from 'react-fine-uploader/delete-button'
import Dropzone from 'react-fine-uploader/dropzone'
import FileInput from 'react-fine-uploader/file-input'
import Filename from 'react-fine-uploader/filename'
import Filesize from 'react-fine-uploader/filesize'
import RetryButton from 'react-fine-uploader/retry-button'
import PauseResumeButton from 'react-fine-uploader/pause-resume-button'
import ProgressBar from 'react-fine-uploader/progress-bar'
import Status from 'react-fine-uploader/status'
import Thumbnail from 'react-fine-uploader/thumbnail'

import PauseIcon from 'react-fine-uploader/gallery/pause-icon'
import PlayIcon from 'react-fine-uploader/gallery/play-icon'
import UploadIcon from 'react-fine-uploader/gallery/upload-icon'
import UploadFailedIcon from 'react-fine-uploader/gallery/upload-failed-icon'
import UploadSuccessIcon from 'react-fine-uploader/gallery/upload-success-icon'
import XIcon from 'react-fine-uploader/gallery/x-icon'

import 'react-fine-uploader/gallery/gallery.css'
import styles from './styles.css'
import cn from 'classnames'

import videoShape from '../../components/Uploader/Video/shape'

const FileInputComponent = ({ uploader, ...props }) => {
    const { children, ...fileInputProps } = props
    const content = children || (
            <span>
            <UploadIcon className='react-fine-uploader-gallery-file-input-upload-icon' />
            Select Files
        </span>
        )

    return (
        <FileInput className='react-fine-uploader-gallery-file-input-container'
                   uploader={ uploader }
                   { ...fileInputProps }
        >
            <span className='react-fine-uploader-gallery-file-input-content'>
                { content }
            </span>
        </FileInput>
    )
}

const getComponentProps = (componentName, allProps) => {
    const componentProps = {}

    Object.keys(allProps).forEach(propName => {
        if (propName.indexOf(componentName + '-') === 0) {
            const componentPropName = propName.substr(componentName.length + 1)
            componentProps[componentPropName] = allProps[propName]
        }
    })

    return componentProps
}

const getDefaultMaybeDropzoneContent = ({ content, disabled }) => {
    const className = disabled
        ? 'react-fine-uploader-gallery-nodrop-content'
        : 'react-fine-uploader-gallery-dropzone-content'

    if (disabled && !content) {
        return (
            <span className={ className }>
                Upload files
            </span>
        )
    }
    else if (content) {
        return <span className={ className }>{ content }</span>
    }
    else if (!disabled) {
        return (
            <span className={ className }>
                <UploadIcon className='react-fine-uploader-gallery-dropzone-upload-icon' />
                Drop files here
            </span>
        )
    }
}

const isFileGone = (statusToCheck, statusEnum) => {
    return [
            statusEnum.CANCELED,
            statusEnum.DELETED,
        ].indexOf(statusToCheck) >= 0
}

class Uploader extends Component {
    static propTypes = {
        className: PropTypes.string,
        uploader: PropTypes.object.isRequired,
        files: PropTypes.arrayOf(videoShape),
        selectedFileId: PropTypes.number,
        onFileAdd: PropTypes.func.isRequired,
        onFileUploaded: PropTypes.func.isRequired,
        onFileRemove: PropTypes.func.isRequired,
        onFileUpdate: PropTypes.func.isRequired,
        onFileSelect: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: '',
        'cancelButton-children': <XIcon />,
        'deleteButton-children': <XIcon />,
        'dropzone-disabled': false,
        'dropzone-dropActiveClassName': 'react-fine-uploader-gallery-dropzone-active',
        'dropzone-multiple': true,
        'fileInput-multiple': true,
        'pauseResumeButton-pauseChildren': <PauseIcon />,
        'pauseResumeButton-resumeChildren': <PlayIcon />,
        'retryButton-children': <PlayIcon />,
        'thumbnail-maxSize': 130
    }

    constructor(props) {
        super(props)

        const statusEnum = props.uploader.qq.status

        this._onStatusChange = (id, oldStatus, status) => {
            if (status === statusEnum.SUBMITTING) {
                this._addVisibleFile(id)
            }
            else if (isFileGone(status, statusEnum)) {
                this._removeVisibleFile(id)
            }
            else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
                this._fileUploaded(id)
                this._updateVisibleFileStatus(id, status)
            }
            else if (status === statusEnum.UPLOAD_FAILED) {
                this._updateVisibleFileStatus(id, status)
            }
        }
    }

    componentDidMount() {
        this.props.uploader.on('statusChange', this._onStatusChange)
        this.props.uploader.on('complete', this._onComplete)
    }

    componentWillUnmount() {
        this.props.uploader.off('statusChange', this._onStatusChange)
        this.props.uploader.off('complete', this._onComplete)
    }

    render() {
        const cancelButtonProps = getComponentProps('cancelButton', this.props)
        const dropzoneProps = getComponentProps('dropzone', this.props)
        const fileInputProps = getComponentProps('fileInput', this.props)
        const filenameProps = getComponentProps('filename', this.props)
        const filesizeProps = getComponentProps('filesize', this.props)
        const progressBarProps = getComponentProps('progressBar', this.props)
        const retryButtonProps = getComponentProps('retryButton', this.props)
        const statusProps = getComponentProps('status', this.props)
        const thumbnailProps = getComponentProps('thumbnail', this.props)
        const uploader = this.props.uploader
        const files = this.props.files
        const selectedFileId = this.props.selectedFileId

        const chunkingEnabled = uploader.options.chunking && uploader.options.chunking.enabled
        const deleteEnabled = uploader.options.deleteFile && uploader.options.deleteFile.enabled
        const deleteButtonProps = deleteEnabled && getComponentProps('deleteButton', this.props)
        const pauseResumeButtonProps = chunkingEnabled && getComponentProps('pauseResumeButton', this.props)

        return (
            <MaybeDropzone content={ this.props.children }
                           hasVisibleFiles={ files.length > 0 }
                           uploader={ uploader }
                           { ...dropzoneProps }
            >
                {
                    !fileInputProps.disabled &&
                    <FileInputComponent uploader={ uploader } { ...fileInputProps }/>
                }
                <ProgressBar className='react-fine-uploader-gallery-total-progress-bar'
                             uploader={ uploader }
                             { ...progressBarProps }
                />
                <ReactCssTransitionGroup className='react-fine-uploader-gallery-files'
                                         component='ul'
                                         transitionEnter={ !this.props.animationsDisabled }
                                         transitionEnterTimeout={ 500 }
                                         transitionLeave={ !this.props.animationsDisabled }
                                         transitionLeaveTimeout={ 300 }
                                         transitionName='react-fine-uploader-gallery-files'
                >
                    {
                        files.map(({ id, status, fromServer }) => (
                            <li key={ id }
                                onClick={ this._handleFileClick(id) }
                                className={cn('react-fine-uploader-gallery-file', { [styles.selectedFile]: id === selectedFileId })}
                            >
                                <ProgressBar className='react-fine-uploader-gallery-progress-bar'
                                             id={ id }
                                             uploader={ uploader }
                                             { ...progressBarProps }
                                />
                                <Thumbnail className='react-fine-uploader-gallery-thumbnail'
                                           id={ id }
                                           fromServer={ fromServer }
                                           uploader={ uploader }
                                           { ...thumbnailProps }
                                />
                                {
                                    status === 'upload successful' &&
                                    <span>
                                        <UploadSuccessIcon className='react-fine-uploader-gallery-upload-success-icon' />
                                        <div className='react-fine-uploader-gallery-thumbnail-icon-backdrop' />
                                    </span>
                                }
                                {
                                    status === 'upload failed' &&
                                    <span>
                                        <UploadFailedIcon className='react-fine-uploader-gallery-upload-failed-icon' />
                                        <div className='react-fine-uploader-gallery-thumbnail-icon-backdrop' />
                                    </span>
                                }
                                <div className='react-fine-uploader-gallery-file-footer'>
                                    <Filename className='react-fine-uploader-gallery-filename'
                                              id={ id }
                                              uploader={ uploader }
                                              { ...filenameProps }
                                    />
                                    <Status className='react-fine-uploader-gallery-status'
                                            id={ id }
                                            uploader={ uploader }
                                            { ...statusProps }
                                    />
                                    <Filesize className='react-fine-uploader-gallery-filesize'
                                              id={ id }
                                              uploader={ uploader }
                                              { ...filesizeProps }
                                    />
                                </div>
                                <CancelButton className='react-fine-uploader-gallery-cancel-button'
                                              id={ id }
                                              uploader={ uploader }
                                              { ...cancelButtonProps }
                                />
                                <RetryButton className='react-fine-uploader-gallery-retry-button'
                                             id={ id }
                                             uploader={ uploader }
                                             { ...retryButtonProps }
                                />
                                {
                                    deleteEnabled &&
                                    <DeleteButton className='react-fine-uploader-gallery-delete-button'
                                                  id={ id }
                                                  uploader={ uploader }
                                                  { ...deleteButtonProps }
                                    />
                                }
                                {
                                    chunkingEnabled &&
                                    <PauseResumeButton className='react-fine-uploader-gallery-pause-resume-button'
                                                       id={ id }
                                                       uploader={ uploader }
                                                       { ...pauseResumeButtonProps }
                                    />
                                }
                            </li>
                        ))
                    }
                </ReactCssTransitionGroup>
            </MaybeDropzone>
        )
    }

    _onComplete = (id, name, response) => {
        this.props.onFileUpdate(id, { uuid: response.uuid, name: response.name, url: response.url });
    };

    _handleFileClick = (id) => (e) => {
        this.props.onFileSelect(id);
    };

    _addVisibleFile(id) {
        this.props.onFileAdd(id);
    }

    _fileUploaded(id) {
        this.props.onFileUploaded(id);
    }

    _removeVisibleFile(id) {
        this.props.onFileRemove(id);
    }

    _updateVisibleFileStatus(id, status) {
        this.props.onFileUpdate(id, { status });
    }
}

const MaybeDropzone = ({ children, content, hasVisibleFiles, uploader, ...props }) => {
    const { disabled, ...dropzoneProps } = props

    let dropzoneDisabled = disabled
    if (!dropzoneDisabled) {
        dropzoneDisabled = !uploader.qq.supportedFeatures.fileDrop
    }

    if (hasVisibleFiles) {
        content = <span/>
    }
    else {
        content = content || getDefaultMaybeDropzoneContent({ content, disabled: dropzoneDisabled })
    }

    if (dropzoneDisabled) {
        return (
            <div className='react-fine-uploader-gallery-nodrop-container'>
                { content }
                { children }
            </div>
        )
    }

    return (
        <Dropzone className='react-fine-uploader-gallery-dropzone'
                  uploader={ uploader }
                  { ...dropzoneProps }
        >
            { content }
            { children }
        </Dropzone>
    )
}

export default Uploader
