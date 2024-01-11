import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {CalendarFill, ClockFill} from 'react-bootstrap-icons'

class ClockComponent extends Component{

    constructor() {
        super();
        this.state = {
            date: new Date()
        };
        this.tickClock = this.tickClock.bind(this)
    }

    componentDidMount() {
        setInterval(this.tickClock, 1000);
    }

    componentWillUnmount() {

    }

    tickClock(){
        this.setState({
            date: new Date()
        })
    }

    render(){
        return(
            <div className="d-inline-block">
                <CalendarFill/> {this.state.date.toLocaleDateString()} &nbsp;
                <ClockFill/> {this.state.date.toLocaleTimeString()}
            </div>
        );
    }

}

export default ClockComponent