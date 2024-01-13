import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Table, Button, Form, InputGroup, Toast, Modal } from 'react-bootstrap'
import { PersonBadgeFill, ImageFill, PersonFill, EnvelopeFill, PhoneFill, PencilSquare, TrashFill, Search } from 'react-bootstrap-icons';
import LetteredAvatar from "./LetterAvatar";
import CreateContactModal from '../components/CreateContactModal';

class TableComponent extends Component {
    constructor() {
        super();
        this.state = {
            contactArray: [],
            showToast: false,
            showModal: false,
            selectedContactId: null,
            selectedContactfirstname: "",
            selectedContactlastname: "",
            selectedContactemail: "",
            selectedContactnumber: null,
        };
    }

    componentDidMount() {
        this.fetchContacts();
    }

    fetchContacts = () => {
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
    };

    handleCreateContact = () => {
        this.fetchContacts();
    };

    handleDeleteContact = (contactid) => {
        console.log(contactid);

        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", `http://localhost:3000/backend/contacts/${contactid}`, true);
        xhttp.send();

        xhttp.onreadystatechange = () => {
            if (xhttp.status == 200) {
                this.setState({ showToast: true }, () => {
                    // Autohide the toast after 3 seconds
                    setTimeout(() => {
                        this.setState({ showToast: false });
                    }, 2000);
                });

                this.fetchContacts();
            }
        };
    }

    handleUpdateContact = (contactid) => {
        console.log(contactid);

        const index = this.state.contactArray.findIndex(contact => contact.id === contactid);

        if (index !== -1) {
            this.setState({
                selectedContactId: contactid,
                showModal: true,
                selectedContactfirstname: this.state.contactArray[index].firstname,
                selectedContactlastname: this.state.contactArray[index].lastname,
                selectedContactemail: this.state.contactArray[index].email,
                selectedContactnumber: this.state.contactArray[index].contactnumber,
            });
        }
    }

    handleModalClose = () => {
        this.setState({ showModal: false, selectedContactId: null });
    }

    componentWillUnmount() { }

    render() {
        const { contactArray, showToast, showModal, selectedContactId } = this.state;

        return (
            <div>
                <div style={{ marginTop: "10px", marginBottom: "10px", display: "inline-flex", width: "90%" }}>
                    {/* Pass the handleCreateContact function to CreateContactModal */}
                    <CreateContactModal onCreateContact={this.handleCreateContact} /> &nbsp; &nbsp; &nbsp;
                    <InputGroup>
                        <Form.Control placeholder="Enter Contact" aria-label="Enter Contact" aria-describedby="basic-addon2" />
                        <Button variant="primary" id="button-addon2">
                            <Search />
                        </Button>
                    </InputGroup>
                </div>

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
                                <td>
                                    <LetteredAvatar name={`${contact.firstname} ${contact.lastname}`} size={50} />
                                </td>
                                <td>{contact.firstname}</td>
                                <td>{contact.lastname}</td>
                                <td>{contact.email}</td>
                                <td>{contact.contactnumber}</td>
                                <td><Button variant="warning" onClick={() => this.handleUpdateContact(contact.id)}><PencilSquare /></Button>{' '}</td>
                                <td><Button variant="danger" onClick={() => this.handleDeleteContact(contact.id)}><TrashFill /></Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Toast onClose={() => this.setState({ showToast: false })} show={showToast} delay={2000} autohide className="position-absolute top-25 start-50 translate-middle-x bg-danger text-black">
                    <Toast.Header>

                    </Toast.Header>
                    <Toast.Body>Contact Successfully Deleted!</Toast.Body>
                </Toast>

                <Modal show={showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><PencilSquare /> Update Contact {this.state.selectedContactId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.selectedContactfirstname}
                                onChange={(e) => this.setState({ selectedContactfirstname: e.target.value })}
                            /> <br />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.selectedContactlastname}
                                onChange={(e) => this.setState({ selectedContactlastname: e.target.value })}
                            /> <br />
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.selectedContactemail}
                                onChange={(e) => this.setState({ selectedContactemail: e.target.value })}
                            /> <br />
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.selectedContactnumber}
                                onChange={(e) => this.setState({ selectedContactnumber: e.target.value })}
                            /> <br />
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default TableComponent;
