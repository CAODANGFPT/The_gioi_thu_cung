import connection from '../db';

export const getAllSpecies = async () => {
  const query = 'SELECT * FROM species';
  try {
    const [results] = await connection.promise().query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getSpeciesById = async (speciesId) => {
  const query = 'SELECT * FROM species WHERE id = ?';
  try {
    const [results] = await connection.promise().query(query, [speciesId]);
    if (results.length === 0) {
      return null;
    }
    return results[0];
  } catch (error) {
    throw error;
  }
};

export const addSpecies = async (name, description) => {
  const query = 'INSERT INTO species (name) VALUES (?)';
  try {
    const [result] = await connection.promise().query(query, [name]);
    return { id: result.insertId, name };
  } catch (error) {
    throw error;
  }
};

export const updateSpecies = async (speciesId, name) => {
  const query = 'UPDATE species SET name = ? WHERE id = ?';
  try {
    const [result] = await connection.promise().query(query, [name, speciesId]);
    if (result.affectedRows === 0) {
      return null;
    }
    return { id: speciesId, name };
  } catch (error) {
    throw error;
  }
};

export const deleteSpecies = async (speciesId) => {
  const query = 'DELETE FROM species WHERE id = ?';
  try {
    const [result] = await connection.promise().query(query, [speciesId]);
    if (result.affectedRows === 0) {
      return null;
    }
    return { id: speciesId };
  } catch (error) {
    throw error;
  }
};
