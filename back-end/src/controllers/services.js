import Services from "../models/services";
import { servicesSchema } from "../schemas/services";

export const list = async (req, res) => {
  try {
    const services = await Services.getAllServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const showById = async (req, res) => {
  try {
    const services = await Services.getServicesById(req.params.id);
    if (!services) {
      res.status(404).json({ error: "Dịch vụ không tồn tại" });
    } else {
      res.json(services);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, image, description, price } = req.body;
    const { error } = servicesSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const servicesId = await Services.createServices(
      name,
      description,
      image,
      price
    );
    res.json({ id: servicesId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const { error } = servicesSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const serviceId = req.params.id;

    // Check if the service exists before attempting to update
    const existingService = await Services.getServicesById(serviceId);
    if (!existingService) {
      return res.status(404).json({ error: "Service không tồn tại" });
    }

    await Services.updateServices(serviceId, name, description, price);
    res.json({ message: "Dịch vụ đã được cập nhật thành công" });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateIsDelete = async (req, res) => {
  try {
    const { id, is_delete } = req.body;
    await Services.updateBlockService(id, is_delete);
    res.json({ message: "Khóa tài dịch vụ thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
