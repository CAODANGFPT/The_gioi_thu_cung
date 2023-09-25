import {
  getAllSpecies,
  getSpeciesById,
  addSpecies,
  updateSpecies,
  deleteSpecies,
} from '../models/species';

const getAllSpeciesController = async (req, res, next) => {
  try {
    const species = await getAllSpecies();
    res.status(200).json(species);
  } catch (error) {
    next(error);
  }
};

const getSpeciesByIdController = async (req, res, next) => {
  const speciesId = req.params.id;

  try {
    const species = await getSpeciesById(speciesId);

    if (!species) {
      return res.status(404).json({ message: 'Không tìm thấy loài' });
    }

    res.status(200).json(species);
  } catch (error) {
    next(error);
  }
};

const addSpeciesController = async (req, res, next) => {
  const { name, description } = req.body;

  try {
    const newSpecies = await addSpecies(name, description);
    res.status(201).json(newSpecies);
  } catch (error) {
    next(error);
  }
};

const updateSpeciesController = async (req, res, next) => {
  const speciesId = req.params.id;
  const { name } = req.body;

  try {
    const updatedSpecies = await updateSpecies(speciesId, name);

    if (!updatedSpecies) {
      return res.status(404).json({ message: 'Không tìm thấy loài' });
    }

    res.status(200).json(updatedSpecies);
  } catch (error) {
    next(error);
  }
};

const deleteSpeciesController = async (req, res, next) => {
  const speciesId = req.params.id;

  try {
    const deletedSpecies = await deleteSpecies(speciesId);

    if (!deletedSpecies) {
      return res.status(404).json({ message: 'Không tìm thấy loài' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  getAllSpeciesController,
  getSpeciesByIdController,
  addSpeciesController,
  updateSpeciesController,
  deleteSpeciesController,
};
