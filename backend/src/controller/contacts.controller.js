'use strict';

const Contacts = require('../model/contacts.model');

exports.findAll = function (req, res) {
    Contacts.findAll(function (err, contact) {
        if (err) {
            res.send(err);
        }
        console.log('res', contact);
        res.send({
            status: 200,
            data: contact
        });
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    }
    else {
        // Pass the id parameter when creating a new Contacts object
        const updatedContact = new Contacts({ id: req.params.id, ...req.body });

        Contacts.update(req.params.id, updatedContact, function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                status: 200,
                message: "Contact Updated Successfully!",
            });
        });
    }
};

exports.create = function (req, res) {
    const new_contact = new Contacts(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    }
    else {
        Contacts.create(new_contact, function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                status: 200,
                message: "Contact Created Successfully!",
                data: contact
            });
        });
    }
};

exports.delete = function (req, res) {
    Contacts.delete(req.params.id, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            status: 200,
            message: "Contact Deleted Successfully!",
        });
    });
}