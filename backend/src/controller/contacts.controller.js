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