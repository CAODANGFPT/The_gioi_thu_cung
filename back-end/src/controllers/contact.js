import Contact from "../models/contact";
import { contactSchema } from "../schemas/contact";

export const list = async (req, res) => {
    try {
        const contact = await Contact.getAllContact();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const show = async (req, res) => {
    try {
        const contactsItem = await Contact.getContactById(req.params.id);
        if (!contactsItem) {
            res.status(404).json({ error: "ContactsItem not found" });
        } else {
            res.json(contactsItem);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const create = async (req, res) => {
    try {
        const { title, subject, user_id } = req.body;
        const { error } = contactSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const contactsId = await Contact.createContact(title, subject, user_id);
        res.json({ id: contactsId, message: "Gửi thành công rồi !" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const { title, subject, user_id } = req.body;
        const { error } = contactSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }
        await Contact.updateContact(req.params.id, title, subject, user_id);
        res.json({ message: "Contact updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const destroy = async (req, res) => {
    try {
        await Contact.deleteContact(req.params.id);
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};