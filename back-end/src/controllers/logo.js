import Logo from "../models/logo";

export const list = async (req, res) => {
  try {
    const logo = await Logo.getAllLogo();
    res.json(logo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showLogoById = async (req, res) => {
  try {
    const logo = await Logo.getLogoById(req.params.id);
    if (!logo) {
      res.status(404).json({ error: "Logo không tồn tại" });
    } else {
      res.json(logo);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { img } = req.body;
    const logoId = await Logo.createLogo(img);
    res.json({ id: logoId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id, img } = req.body;
    await Logo.updateLogo(id, img);
    res.json({ message: "Logo updated thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLogo = async (req, res) => {
  try {
    await Logo.deleteLogo(req.params.id);
    res.json({ message: "Xóa Logo thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
