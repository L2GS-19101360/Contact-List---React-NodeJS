'use strict'

var dbConn = require('../../config/db.config');

var Contacts = function (contact) {

    this.image = contact.image;
    this.firstname = contact.firstname;
    this.lastname = contact.lastname;
    this.email = contact.email;
    this.contactnumber = contact.contactnumber;
    this.registered = new Date();
    this.updated = null;

};

Contacts.update = function (id, contact, result) {
    console.log("Updating contact with ID:", id);
    console.log("Contact data:", contact);

    dbConn.query("UPDATE contacts SET image=?, firstname=?, lastname=?, email=?, contactnumber=?, updated=? WHERE id=?", [contact.image, contact.firstname, contact.lastname, contact.email, contact.contactnumber, new Date(), id], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        } else {
            console.log("Update result:", res);
            result(null, res);
        }
    });
};

Contacts.findByInput = function (searchInput, result) {
    dbConn.query("SELECT * FROM contacts WHERE firstname=? OR lastname=? OR email=? OR contactnumber=?", [searchInput, searchInput, searchInput, searchInput], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            console.log("Contacts: ", res);
            result(null, res);
        }
    });
}

Contacts.findAll = function (result) {
    dbConn.query("SELECT * FROM contacts ORDER BY lastname", function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            console.log("Contacts: ", res);
            result(null, res);
        }
    });
};

Contacts.create = function (newContact, result) {
    dbConn.query("INSERT INTO contacts set ?", newContact, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            console.log(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Contacts.delete = function (id, result) {
    dbConn.query("DELETE FROM contacts WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Contacts