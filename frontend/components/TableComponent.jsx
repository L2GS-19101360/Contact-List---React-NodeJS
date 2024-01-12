import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Table, Button } from 'react-bootstrap'
import { PersonBadgeFill, ImageFill, PersonFill, EnvelopeFill, PhoneFill, PencilSquare, TrashFill } from 'react-bootstrap-icons'
import LetteredAvatar from "./LetterAvatar";

class TableComponent extends Component {

    constructor() {
        super();
        this.state = {
            contactArray: [],
        }
    }

    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:3000/backend/contacts/", true);
        xhttp.send();

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                this.setState({ contactArray: response.data }, () => {
                    console.log(this.state.contactArray);
                });
            }
        };
    }

    componentWillUnmount() {

    }

    render() {
        const { contactArray } = this.state;

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th> <ImageFill /> Image</th>
                            <th> <PersonFill /> First Name</th>
                            <th> <PersonFill /> Last Name</th>
                            <th> <EnvelopeFill /> Email</th>
                            <th> <PhoneFill /> Contact Number</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactArray.map((contact, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <LetteredAvatar name={`${contact.firstname} ${contact.lastname}`} size={50} />
                                </td>
                                <td>{contact.firstname}</td>
                                <td>{contact.lastname}</td>
                                <td>{contact.email}</td>
                                <td>{contact.contactnumber}</td>
                                <td><Button variant="warning"><PencilSquare /></Button>{' '}</td>
                                <td><Button variant="danger"><TrashFill /></Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default TableComponent