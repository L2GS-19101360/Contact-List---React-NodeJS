import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navbar, Container } from 'react-bootstrap';
import weblogo from '../src/assets/weblogo.jpg';
import ClockComponent from "./ClockComponent";

class NavbarComponent extends Component {

    constructor() {
        super();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>
                            <img
                                alt=""
                                src={weblogo}
                                width="55"
                                height="55"
                                className="d-inline-block"
                            /> &nbsp;
                            React Bootstrap &nbsp;
                            <ClockComponent/> 
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
        );
    }

}

export default NavbarComponent;
