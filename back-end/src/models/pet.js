import connection from "./../db";

export default class Pet {
  static getAllPets() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM Pets", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getPetById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM Pets WHERE id = ?",
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
        "INSERT INTO Pets (img, name, age, gender, user_id, species_id, breed_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [img, name, age, gender, user_id, species_id, breed_id],
        (err) => {
          if (err) {
            console.error("Error inserting pet:", err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
  static updatePet(id, img, name, age, gender, user_id, species_id, breed_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE Pets SET img = ?,name = ?,age = ?,gender = ?,user_id = ?,species_id = ?,breed_id = ? WHERE id = ?",
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
        "DELETE FROM Pets WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
