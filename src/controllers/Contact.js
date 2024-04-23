'use strict'

var Contact = require('../models/Contact');

var controller = {
    save: (req, res) => {
        var params = req.body;
        console.log(params);
        var contact = new Contact();

        contact.name = params.name;
        contact.phoneNumber = params.phoneNumber;
        contact.email = params.email;
        contact.address = params.address;
        contact.relationship = params.relationship;

        contact.save()
            .then(contactStored => {
                return res.status(200).send({
                    status: 'success',
                    contactStored
                });
            })
            .catch(err => {
                return res.status(404).send({
                    status: 'error',
                    message: 'El contacto no se ha guardado.'
                });
            });
    },

    getContacts: (req, res) => {
        var query = Contact.find({});

        query.sort('-name')
            .then(contacts => {
                if (!contacts || contacts.length === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No hay contactos."
                    });
                }
                return res.status(200).send({
                    status: "success",
                    contacts
                });
            })
            .catch(err => {
                return res.status(500).send({
                    status: "error",
                    message: "Error al obtener los datos."
                });
            });
    },

    delete: async (req, res) => {
        try {
            const contactId = req.params.id;

            const result = await Contact.deleteOne({ _id: contactId });

            if (result.deletedCount === 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No se ha encontrado el contacto a eliminar."
                });
            }

            return res.status(200).send({
                status: "success",
                message: "Contacto eliminado correctamente."
            });
        } catch (err) {
            return res.status(500).send({
                status: "error",
                message: "Error al eliminar el contacto."
            });
        }
    },

    update: async (req, res) => {
        try {
            const contactId = req.params.id;
            const { name, phoneNumber, email, address, relationship } = req.body;

            const contactUpdated = await Contact.updateOne({ _id: contactId }, { name, phoneNumber, email, address, relationship }, { new: true });

            if (contactUpdated.nModified === 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe el contacto."
                });
            }

            return res.status(200).send({
                status: "success",
                article: contactUpdated
            });
        } catch (err) {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar el contacto."
            });
        }
    }
};

module.exports = controller;