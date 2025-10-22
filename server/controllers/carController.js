import { pool } from "../config/database.js";

export const getAllCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Failed to retrieve locations" });
  }
};

export const getCar = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM cars WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(`⚠️ Error retrieving car with ID ${id}`, error);
    res.status(500).json({ error: "Failed to retrieve car" });
  }
};

export const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM cars WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json({
      message: `Car with ID ${id} deleted successfully`,
      car: result.rows[0],
    });
  } catch (error) {
    console.error(`⚠️ Error deleting car with ID ${id}`, error);
    res.status(500).json({ error: "Failed to delete car" });
  }
};

export const editCar = async (req, res) => {
  const { id } = req.params;
  const { name, color, wheel_type, usage_type, price } = req.body;

  try {
    const result = await pool.query(
      "UPDATE cars SET name = $1, color = $2, wheel_type = $3, usage_type = $4, price = $5 WHERE id = $6 RETURNING *",
      [name, color, wheel_type, usage_type, price, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json({
      message: `Car with ID ${id} updated successfully`,
      car: result.rows[0],
    });
  } catch (error) {
    console.error(`⚠️ Error updating car with ID ${id}`, error);
    res.status(500).json({ error: "Failed to update car" });
  }
};

export const addCar = async (req, res) => {
  const { name, color, wheel_type, usage_type, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cars (name, color, wheel_type, usage_type, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, color, wheel_type, usage_type, price]
    );
    res.status(201).json({
      message: "Car added successfully",
      car: result.rows[0],
    });
  } catch (error) {
    console.error("⚠️ Error adding new car", error);
    res.status(500).json({ error: "Failed to add car" });
  }
};
