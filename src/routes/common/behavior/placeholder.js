//@flow

import type {Element} from 'react';
import React, { PureComponent } from 'react';

type PlaceholderProps = {
  componentToDisplay: ?Element<any>,
  componentPlaceholder: Element<any>,
  timeToWait?: number,
};

type PlaceholderState = {
    component: Element<any>,
  };

class Placeholder extends PureComponent<PlaceholderProps, PlaceholderState> {
    timeout: any;
    defaultTimeToWait: number;

    constructor(props: PlaceholderProps) {
        super(props);
        this.defaultTimeToWait = 250;
        this.state = {component: props.componentToDisplay ? props.componentToDisplay : props.componentPlaceholder};
    }

    componentDidUpdate(){
        this.timeout = 
        this.props.componentToDisplay 
        ? this.cancelSwitchToPlaceholder()
        : this.switchToPlaceholder();
    }

    switchToPlaceholder(){
        return setTimeout(() => { 
            console.log('switched!');
            this.setState({component: this.props.componentPlaceholder})
        }, this.props.timeToWait || this.defaultTimeToWait);
    }

    cancelSwitchToPlaceholder(){
        (this.state.component !== this.props.componentToDisplay) && this.setState({component: this.props.componentToDisplay});
        this.timeout && clearTimeout(this.timeout);
        return null;
    }

    render() {
        return (
            <React.Fragment>
                {this.state.component}
            </React.Fragment>
        )
    }
}

export default Placeholder;