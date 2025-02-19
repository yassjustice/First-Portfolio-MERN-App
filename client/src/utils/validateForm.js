// utils/validateForm.js

/**
 * Validates if a string is a valid email.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
  /**
   * Checks if a field is empty.
   * @param {string} value - The field value to check.
   * @returns {boolean} - Returns true if the field is empty, false otherwise.
   */
  export const isFieldEmpty = (value) => {
    return value.trim() === '';
  };
  
  /**
   * Validates a form by checking if required fields are filled and if the email format is correct.
   * @param {object} formData - The form data object (e.g., { email: '', password: '' }).
   * @returns {object} - An object with valid (true/false) and errors (array of error messages).
   */
  export const validateForm = (formData) => {
    const errors = [];
  
    // Check if fields are empty
    for (const [field, value] of Object.entries(formData)) {
      if (isFieldEmpty(value)) {
        errors.push(`${field} is required`);
      }
    }
  
    // Check if email is valid
    if (formData.email && !validateEmail(formData.email)) {
      errors.push('Invalid email format');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  