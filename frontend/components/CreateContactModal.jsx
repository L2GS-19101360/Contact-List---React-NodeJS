import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import { Form } from 'react-bootstrap';
import { PersonFillAdd } from 'react-bootstrap-icons';

function CreateContactModal({ onCreateContact }) {
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const [newImage, setImage] = useState("#%&{}>");
    const [newFirstName, setFirstName] = useState('');
    const [newLastName, setLastName] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newNumber, setNumber] = useState('');

    const handleCreateContact = async (event) => {
        event.preventDefault();

        const contact = {
            image: newImage,
            firstname: newFirstName,
            lastname: newLastName,
            email: newEmail,
            contactnumber: newNumber,
        };

        try {
            const response = await fetch('http://localhost:3000/backend/contacts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                console.log('Contact created successfully');
                setShowToast(true);
                setShowModal(false);
                
                setFirstName('');
                setLastName('');
                setEmail('');
                setNumber('');
                // Trigger the callback to reload the table
                onCreateContact();
            } else {
                console.error('Error Creating Contact:', await response.text());
            }
        } catch (error) {
            console.error('Error Creating Contact:', error.message);
        }
    };

    const handleToastClose = () => setShowToast(false);

    return (
        <>
            <Button variant="success" onClick={handleShowModal}>
                <PersonFillAdd /> Create Contact
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <PersonFillAdd /> Create New Contact
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={newFirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <br />
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={newLastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <br />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={newEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Contact Number"
                            value={newNumber}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <br />
                        <Button variant="success" type="submit" onClick={handleCreateContact}>
                            <PersonFillAdd /> Create Contact
                        </Button>{' '}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast onClose={handleToastClose} show={showToast} delay={2000} autohide className="position-absolute top-0 start-50 translate-middle-x bg-success text-white">
                <Toast.Header>
                    {/* ... (rest of the Toast.Header if needed) */}
                </Toast.Header>
                <Toast.Body>Contact Successfully Created!</Toast.Body>
            </Toast>
        </>
    );
}

export default CreateContactModal;
