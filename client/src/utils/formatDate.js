// utils/formatDate.js

/**
 * Formats a date into a readable string for display
 * @param {Date | string} date - The date to be formatted.
 * @param {string} format - The format string (e.g., 'YYYY-MM-DD', 'MM/DD/YYYY', 'long').
 * @returns {string} - The formatted date.
 */
export const formatDate = (date, format = 'MM/DD/YYYY') => {
    if (!date) return '';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
  
    // If the format is 'long', return the full date string (e.g., "January 1, 2025")
    if (format === 'long') {
      return new Date(date).toLocaleDateString(undefined, options);
    }
  
    // Default format as 'MM/DD/YYYY'
    const [month, day, year] = new Date(date)
      .toLocaleDateString()
      .split('/');
    
    return `${month}/${day}/${year}`;
  };
  
  /**
   * Format a date string for backend communication (e.g., 'YYYY-MM-DD')
   * @param {Date | string} date - The date to be formatted.
   * @returns {string} - The formatted date.
   */
  export const formatDateForBackend = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0]; // 'YYYY-MM-DD' format
  };
  