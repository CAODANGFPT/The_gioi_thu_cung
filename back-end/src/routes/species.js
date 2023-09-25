import express from 'express';

import {
  getAllSpeciesController,
  getSpeciesByIdController,
  addSpeciesController,
  updateSpeciesController,
  deleteSpeciesController,
} from '../controllers/species';
const router = express.Router();

router.get('/species', getAllSpeciesController);
router.get('/species/:id', getSpeciesByIdController);
router.post('/species/', addSpeciesController);
router.put('/species/:id', updateSpeciesController);
router.delete('/species/:id', deleteSpeciesController);

export default router;
