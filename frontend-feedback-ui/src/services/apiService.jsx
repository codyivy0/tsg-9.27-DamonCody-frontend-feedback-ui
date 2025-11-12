const API_BASE_URL = 'http://localhost:8080/api/v1';
 
/**

* Submit feedback to the API

* @param {Object} feedbackData - The feedback data to submit

* @param {string} feedbackData.memberId - Member ID

* @param {string} feedbackData.providerName - Provider name

* @param {number} feedbackData.rating - Rating (1-5)

* @param {string} feedbackData.comment - Optional comment

* @returns {Promise<Object>} The created feedback with id and timestamp

*/

export const submitFeedback = async (feedbackData) => {

  try {

    const response = await fetch(`${API_BASE_URL}/feedback`, {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify(feedbackData),

    });
 
    // If response is not ok (status 4xx or 5xx), throw error

    if (!response.ok) {

      // Try to parse error message from response

      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);

    }
 
    // Parse and return the successful response

    const data = await response.json();

    return data;

  } catch (error) {

    // Re-throw error to be handled by the caller

    console.error('Error submitting feedback:', error);

    throw error;

  }

};
 
/**

* Get feedback by ID

* @param {string} id - The feedback ID

* @returns {Promise<Object>} The feedback object

*/

export const getFeedbackById = async (id) => {

  try {

    const response = await fetch(`${API_BASE_URL}/feedback/${id}`);

    if (!response.ok) {

      throw new Error(`HTTP error! status: ${response.status}`);

    }

    return await response.json();

  } catch (error) {

    console.error('Error fetching feedback:', error);

    throw error;

  }

};
 
/**

* Get all feedback for a member

* @param {string} memberId - The member ID

* @returns {Promise<Array>} Array of feedback objects

*/

export const getFeedbackByMemberId = async (memberId) => {

  try {

    const response = await fetch(`${API_BASE_URL}/feedback?memberId=${memberId}`);

    if (!response.ok) {

      throw new Error(`HTTP error! status: ${response.status}`);

    }

    return await response.json();

  } catch (error) {

    console.error('Error fetching feedback by member:', error);

    throw error;

  }

};
 