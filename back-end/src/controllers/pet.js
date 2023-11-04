import Pet from "../models/pet";
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
    const pets = await Pet.getAllUserPet(req.params.id);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const petId = await Pet.addPet(
      img,
      name,
      age,
      gender,
      user_id,
      species_id,
      breed_id
    );
    res.json({ id: petId, message: "thêm thông tin thú cưng thành công" });
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
