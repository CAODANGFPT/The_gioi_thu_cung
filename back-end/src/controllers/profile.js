import Profile from "../models/profile";
import { profileSchema } from "../schemas/profile";

export const list = async (req, res) => {
    try {
        const profile = await Profile.getAllProfile();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const show = async (req, res) => {
    try {
        const profileItem = await Profile.getProfileById(req.params.id);
        if (!profileItem) {
            res.status(404).json({ error: "Profile not found" });
        } else {
            res.json(profileItem);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const create = async (req, res) => {
    try {
        const { logo, email, phone, fb } = req.body;
        const { error } = profileSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const profileId = await Profile.createProfile(logo, email, phone, fb);
        res.json({ id: profileId, message: "Gửi thành công rồi !" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const { logo, email, phone, fb } = req.body;
        const { error } = profileSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }
        await Profile.updateProfile(req.params.id, logo, email, phone, fb);
        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const destroy = async (req, res) => {
    try {
        await Profile.deleteProfile(req.params.id);
        res.json({ message: "Profile deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
