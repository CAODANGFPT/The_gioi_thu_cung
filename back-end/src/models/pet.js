import connection from "../db";

export default class Pet {
  static getAllPet() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT pets.id, pets.img, pets.name, pets.age, pets.gender, pets.user_id, users.name AS nameUser, pets.species_id, species.name AS nameSpecies, pets.breed_id, breed.name AS nameBreed FROM pets JOIN users ON pets.user_id = users.id JOIN species ON pets.species_id = species.id JOIN breed ON pets.breed_id = breed.id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getPetById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pets WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addPet(img, name, age, gender, user_id, species_id, breed_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO pets (img, name, age, gender, user_id, species_id, breed_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [img, name, age, gender, user_id, species_id, breed_id],
        (err, result) => {
          if (err) {
            console.error("Error inserting pet:", err);
            reject(err);
          } else {
            // Sử dụng result.insertId để lấy ID của bản ghi vừa thêm
            resolve(result.insertId);
          }
        }
      );
    });
  }
  static updatePet(id, img, name, age, gender, user_id, species_id, breed_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE pets SET img = ?,name = ?,age = ?,gender = ?,user_id = ?,species_id = ?,breed_id = ? WHERE id = ?",
        [img, name, age, gender, user_id, species_id, breed_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deletePet(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM pets WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
