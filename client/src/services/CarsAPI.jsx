import carData from "../../../server/data/cars";

const API_URL = "/api/cars";

export const getCars = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching car with ID ${id}:`, error);
    throw error;
  }
};

export const createCar = async (carData) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
};

export const updateCar = async (id, carData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update car with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating car with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete car with ID ${id}`);
    }

    return true; // no need to parse JSON
  } catch (error) {
    console.error(`Error deleting car with ID ${id}:`, error);
    throw error;
  }
};
