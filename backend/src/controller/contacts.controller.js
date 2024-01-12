'use strict';

const Contacts = require('../model/contacts.model');

exports.findAll = function(req, res){
    Contacts.findAll(function(err, contact){
        if (err){
            res.send(err);
        }
        console.log('res', contact);
        res.send({
            status: 200,
            data: contact
        });
    });
};

exports.create = function(req, res){
    const new_contact = new Contacts(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    }
    else{
        Contacts.create(new_contact, function(err, contact){
            if (err){
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