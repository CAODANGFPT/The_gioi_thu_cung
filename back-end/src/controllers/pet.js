import jwt from "jsonwebtoken";
import Pet from "../models/pet";
import User from "../models/user";
import { petSchema } from "../schemas/pet";

export const listPet = async (req, res) => {
  try {
    const pets = await Pet.getAllPet();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listUserPet = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Bạn chưa đăng nhập");
    }
    const decoded = jwt.verify(token, "duantotnghiep");
    const user = await User.getUser(decoded.id);
    if (!user) {
      res.status(404).json({ error: "" });
    } else {
      try {
        const pets = await Pet.getAllUserPet(user.id);
        res.json(pets);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};

export const showPet = async (req, res) => {
  try {
    const pet = await Pet.getPetById(req.params.id);
    if (!pet) {
      res.status(404).json({ error: "Không tìm thấy thú cưng" });
    } else {
      res.json(pet);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createPet = async (req, res) => {
  try {
    const { img, name, age, gender, user_id, species_id, breed_id } = req.body;
    const { error } = petSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const pet = await Pet.addPet(
      img,
      name,
      age,
      gender,
      user_id,
      species_id,
      breed_id
    );
    console.log(pet);
    res.json({ id: pet.insertId, message: "thêm thông tin thú cưng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updatePet = async (req, res) => {
  try {
    const { img, name, age, gender, user_id, species_id, breed_id } = req.body;
    const { error } = petSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Pet.updatePet(
      req.params.id,
      img,
      name,
      age,
      gender,
      user_id,
      species_id,
      breed_id
    );
    res.json({ message: "Cập nhập thông tin thú cưng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    await Pet.deletePet(req.params.id);
    res.json({ message: "Xóa thông tin thú cưng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
