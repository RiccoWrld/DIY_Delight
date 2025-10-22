import { pool } from "./database.js";
import "./dotenv.js";
import carData from "../data/cars.js";

const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(260) NOT NULL,
        color VARCHAR(260) NOT NULL,
        wheel_type VARCHAR(260) NOT NULL,
        usage_type VARCHAR(260) NOT NULL,
        price DECIMAL NOT NULL
    );`;

  console.log("Creating cars table...");

  try {
    const res = await pool.query(createTableQuery);
    console.log("Cars table created or already exists.");
  } catch (error) {
    console.error("Error creating cars table:", error);
  }
};

const seedTable = async () => {
  await createTable();

  carData.forEach((car) => {
    const insertQuery = {
      text: "INSERT INTO cars (name, color, wheel_type, usage_type, price) VALUES ($1, $2, $3, $4, $5)",
    };
    const values = [
      car.name,
      car.color,
      car.wheel_type,
      car.usage_type,
      car.price,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("Error inserting location", err);
        return;
      }
      console.log(`✅ ${car.name} added successfully`);
    });
  });
};

seedTable();
