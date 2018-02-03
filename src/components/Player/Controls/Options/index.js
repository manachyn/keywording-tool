import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import tooltip from '../../../Tooltip';
import Button from '../../../Button';
import styles from './styles.css';

const TooltipButton = tooltip(Button);
const { bool, string, func, node } = PropTypes;

export class Options extends Component {
    render() {
        const {
            children,
            className,
            buttonClassName,
            buttonOnClassName,
            buttonOffClassName,
            error,
            loop,
            onToggleLoop,
            onToggleFullScreen,
        } = this.props;

        const loopButtonClasses = loop ?
            [buttonOnClassName, styles.buttonOn] :
            [buttonOffClassName, styles.buttonOff];

        return (
            <div className={className} styleName="options">
              <TooltipButton className={cn(...loopButtonClasses)}
                             disabled={error}
                             icon="repeat"
                             tooltipText="toogle repeat"
                             tooltipDelay={500}
                             onClick={onToggleLoop}
              />
              <TooltipButton className={cn(buttonClassName, styles.buttonFullScreen)}
                             disabled={error}
                             tooltipText="toggle fullscreen"
                             tooltipDelay={500}
                             icon="fullscreen"
                             onClick={onToggleFullScreen}
              />
                {children}
            </div>
        );
    }
}


Options.propTypes = {
    children: node,
    className: string,
    buttonClassName: string,
    buttonOnClassName: string,
    buttonOffClassName: string,
    error: bool,
    loop: bool.isRequired,
    onToggleLoop: func.isRequired,
    onToggleFullScreen: func.isRequired,
};

export default Options;
