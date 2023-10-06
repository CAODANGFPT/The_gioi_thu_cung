import About from "../models/about";
import { aboutSchema } from "../schemas/about";

export const show = async (req, res) => {
  try {
    const about = await About.getAbout(req.params.id);
    if (!about) {
      res.status(404).json({ error: "không tìm thấy about" });
    } else {
      res.json(about);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { image, description } = req.body;
    const { error } = aboutSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await About.updateAbout(req.params.id, image, description);
    res.json({ message: "sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
