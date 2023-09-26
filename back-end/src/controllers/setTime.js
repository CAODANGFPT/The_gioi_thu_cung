import SetTime from "../models/setTime";
import { setTimeSchema } from "../schemas/setTime";

export const list = async (req, res) => {
  try {
    const listSetTime = await SetTime.getListSetTime();
    res.json(listSetTime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const show = async (req, res) => {
  try {
    const setTime = await SetTime.getSetTime(req.params.id);
    if (!setTime) {
      res.status(404).json({ error: "không tìm thấy set time" });
    } else {
      res.json(setTime);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = setTimeSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setTimeId = await SetTime.createSetTime(name);
    res.json({ id: setTimeId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = setTimeSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await SetTime.updateSetTime(req.params.id, name);
    res.json({ message: "sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await SetTime.deleteSetTime(req.params.id);
    res.json({ message: "xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
