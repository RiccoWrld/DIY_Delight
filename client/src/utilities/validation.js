// src/utilities/validation.js

/**
 * Checks if a selected combination of options is invalid.
 * Returns true if the combo is not allowed.
 */
export const isInvalidCombo = (wheelType, usageType) => {
  // Example rule: Steel wheels cannot be selected for Personal cars
  if (wheelType === "Steel" && usageType === "Personal") {
    return true;
  }

  // Add more rules here if needed
  return false;
};
