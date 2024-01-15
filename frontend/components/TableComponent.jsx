import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Table, Button, Form, InputGroup, Toast, Modal } from 'react-bootstrap'
import { PersonBadgeFill, ImageFill, PersonFill, EnvelopeFill, PhoneFill, PencilSquare, TrashFill, Search } from 'react-bootstrap-icons';
import LetteredAvatar from "./LetterAvatar";
import CreateContactModal from '../components/CreateContactModal';
import axios from 'axios';

class TableComponent extends Component {
    constructor() {
        super();
        this.state = {
            contactArray: [],
            searchContacts: [],

            showToast1: false,
            showToast2: false,

            showModal: false,

            selectedContactId: "",
            selectedContactImage: "",
            selectedContactfirstname: "",
            selectedContactlastname: "",
            selectedContactemail: "",
            selectedContactnumber: "",

            searchInput: "",
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
                this.setState({ showToast1: true }, () => {
                    // Autohide the toast after 3 seconds
                    setTimeout(() => {
                        this.setState({ showToast1: false });
                    }, 2000);
                });

                this.fetchContacts();
            }
        };
    }

    handleModalOpen = (contactid, firstname, lastname, email, contactnumber) => {
        this.setState({
            showModal: true,
            selectedContactId: contactid,
            selectedContactfirstname: firstname,
            selectedContactlastname: lastname,
            selectedContactemail: email,
            selectedContactnumber: contactnumber,
        });
    }

    handleUpdateContact = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', this.state.selectedContactImage);

        axios.post('http://localhost:3000/uploadfile', formData)
            .then((res) => {
                // Handle success if needed
            })
            .catch((err) => {
                console.log(err);
            });

        const updateContact = {
            id: this.state.selectedContactId,
            image: this.state.selectedContactImage ? this.state.selectedContactImage.name : "#%&{}>",
            firstname: this.state.selectedContactfirstname,
            lastname: this.state.selectedContactlastname,
            email: this.state.selectedContactemail,
            contactnumber: this.state.selectedContactnumber
        };

        console.log(updateContact.image);

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `http://localhost:3000/backend/contacts/${updateContact.id}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    this.setState({
                        showModal: false,
                        showToast2: true
                    }, () => {
                        // Autohide the toast after 2 seconds
                        setTimeout(() => {
                            this.setState({ showToast2: false });

                            // Reload the page after 2 seconds
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        }, 2000);
                    });

                    this.fetchContacts();
                } else {
                    // Handle error here
                    console.error(`Error updating contact: ${xhttp.status}`);
                }
            }
        };

        xhttp.send(JSON.stringify(updateContact));
    };

    handleImageChange = (event) => {
        const file = event.target.files[0];
        this.setState({
            selectedContactImage: file,
        });
    }

    handleModalClose = () => {
        this.setState({ showModal: false, selectedContactId: null });
    }

    handleSearchContact = (event) => {
        event.preventDefault();

        const { searchInput } = this.state;

        if (searchInput.trim() === "") {
            // If searchInput is empty, fetch all contacts
            window.location.reload();
        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", `http://localhost:3000/backend/contacts/search/${searchInput}`, true);
            xhttp.send();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    var response = JSON.parse(xhttp.responseText);
                    this.setState({ searchContacts: response.data }, () => {
                        console.log(this.state.searchContacts);
                    });
                }
            };
        }
    }

    componentWillUnmount() { }

    render() {
        const { contactArray, showToast1, showToast2, showModal, searchContacts } = this.state;

        const searchEmpty = this.state.searchContacts.length != 0;

        { console.log(searchEmpty) }

        return (
            <div>
                <div style={{ marginTop: "10px", marginBottom: "10px", display: "inline-flex", width: "90%" }}>
                    {/* Pass the handleCreateContact function to CreateContactModal */}
                    <CreateContactModal onCreateContact={this.handleCreateContact} /> &nbsp; &nbsp; &nbsp;
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Enter Contact"
                            aria-label="Enter Contact"
                            aria-describedby="basic-addon2"
                            value={this.state.searchInput}
                            onChange={(e) => this.setState({ searchInput: e.target.value })}
                        />
                        <Button
                            variant="primary"
                            id="button-addon2"
                            type="submit"
                            onClick={(event) => this.handleSearchContact(event)}
                        >
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
                    {searchEmpty ? <tbody>
                        {searchContacts.map((contact, index) => (
                            <tr key={index}>
                                <td>
                                    {contact.image === "#%&{}>" ?
                                        <LetteredAvatar name={`${contact.firstname} ${contact.lastname}`} size={50} /> :
                                        <img src={`../src/assets/contactimage/${contact.image}`} height={50} width={50} />}
                                </td>
                                <td>{contact.firstname}</td>
                                <td>{contact.lastname}</td>
                                <td>{contact.email}</td>
                                <td>{contact.contactnumber}</td>
                                <td><Button variant="warning" onClick={(event) => this.handleModalOpen(contact.id, contact.firstname, contact.lastname, contact.email, contact.contactnumber)}><PencilSquare /></Button>{' '}</td>
                                <td><Button variant="danger" onClick={() => this.handleDeleteContact(contact.id)}><TrashFill /></Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody> : <tbody>
                        {contactArray.map((contact, index) => (
                            <tr key={index}>
                                <td>
                                    {contact.image === "#%&{}>" ?
                                        <LetteredAvatar name={`${contact.firstname} ${contact.lastname}`} size={50} /> :
                                        <img src={`../src/assets/contactimage/${contact.image}`} height={50} width={50} />}
                                </td>
                                <td>{contact.firstname}</td>
                                <td>{contact.lastname}</td>
                                <td>{contact.email}</td>
                                <td>{contact.contactnumber}</td>
                                <td><Button variant="warning" onClick={(event) => this.handleModalOpen(contact.id, contact.firstname, contact.lastname, contact.email, contact.contactnumber)}><PencilSquare /></Button>{' '}</td>
                                <td><Button variant="danger" onClick={() => this.handleDeleteContact(contact.id)}><TrashFill /></Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>}

                </Table>

                <Toast onClose={() => this.setState({ showToast1: false })} show={showToast1} delay={2000} autohide className="position-absolute top-0 start-50 translate-middle-x bg-danger text-black">
                    <Toast.Header>

                    </Toast.Header>
                    <Toast.Body>Contact Successfully Deleted!</Toast.Body>
                </Toast>

                <Toast onClose={() => this.setState({ showToast2: false })} show={showToast2} delay={2000} autohide className="position-absolute top-0 start-50 translate-middle-x bg-warning text-black">
                    <Toast.Header>

                    </Toast.Header>
                    <Toast.Body>Contact Successfully Updated!</Toast.Body>
                </Toast>

                <Modal show={showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><PencilSquare /> Update Contact {this.state.selectedContactId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={(e) => e.preventDefault()}>
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
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>User Image</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageChange} ref={(input) => (this.fileInput = input)} />
                            </Form.Group><br />
                            <Button variant="warning" type="submit" onClick={this.handleUpdateContact}>
                                <PencilSquare /> &nbsp; Update Contact
                            </Button>{' '}
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
