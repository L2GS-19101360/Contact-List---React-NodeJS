'use strict'

var dbConn = require('../../config/db.config');

var Contacts = function(contact){

    this.image = contact.image;
    this.firstname = contact.firstname;
    this.lastname = contact.lastname;
    this.email = contact.email;
    this.contactnumber = contact.contactnumber;
    this.registered = new Date();
    this.updated = null;

};

Contacts.findAll = function(result){
    dbConn.query("SELECT * FROM contacts ORDER BY lastname", function(err, res){
        if (err){
            console.log("Error: ", err);
            result(null, err);
        }
        else{
            console.log("Contacts: ", res);
            result(null, res);
        }
    });
};

Contacts.create = function(newContact, result) {
    dbConn.query("INSERT INTO contacts set ?", newContact, function(err, res){
        if (err){
            console.log("Error: ", err);
            console.log(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Contacts.delete = function(id, result){
    dbConn.query("DELETE FROM contacts WHERE id = ?", [id], function(err, res){
        if (err){
            console.log("Error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Contacts