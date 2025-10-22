/**
 * Mailchimp Subscription Helper
 * 
 * Standalone Node.js function to subscribe users to Mailchimp
 * Can be used independently or integrated into larger serverless functions
 * 
 * Required Environment Variables:
 * - MAILCHIMP_API_KEY: Your Mailchimp API key
 * - MAILCHIMP_LIST_ID: Target audience/list ID
 * - MAILCHIMP_SERVER_PREFIX: Server prefix (e.g., 'us1', 'us2', etc.)
 * 
 * Installation:
 * npm install node-fetch (if using Node < 18)
 * 
 * Usage:
 * const { subscribeToMailchimp } = require('./mailchimp_subscribe');
 * 
 * await subscribeToMailchimp({
 *   email: 'user@example.com',
 *   role: 'realtor',
 *   company: 'Acme Realty',
 *   monthly_listings: 25
 * });
 */

// For Node.js >= 18, fetch is built-in
// For Node.js < 18, uncomment the line below:
// const fetch = require('node-fetch');

/**
 * Subscribe a user to Mailchimp with custom merge fields
 * 
 * @param {Object} userData - User data to subscribe
 * @param {string} userData.email - User email (required)
 * @param {string} userData.role - User role
 * @param {string} userData.company - Company name
 * @param {number} userData.monthly_listings - Number of monthly listings
 * @returns {Promise<Object>} Mailchimp response object
 */
async function subscribeToMailchimp(userData) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';
  
  if (!MAILCHIMP_API_KEY) {
    throw new Error('MAILCHIMP_API_KEY environment variable is required');
  }
  
  if (!MAILCHIMP_LIST_ID) {
    throw new Error('MAILCHIMP_LIST_ID environment variable is required');
  }
  
  if (!userData.email) {
    throw new Error('Email is required');
  }
  
  // Construct API URL
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
  
  // Prepare request payload
  const payload = {
    email_address: userData.email.toLowerCase().trim(),
    status: 'subscribed', // or 'pending' for double opt-in
    merge_fields: {
      ROLE: userData.role || '',
      COMPANY: userData.company || '',
      LISTINGS: userData.monthly_listings || 0,
    },
    tags: ['waitlist', 'vistaforge', 'early-access'],
  };
  
  // Add optional fields if provided
  if (userData.firstName) {
    payload.merge_fields.FNAME = userData.firstName;
  }
  if (userData.lastName) {
    payload.merge_fields.LNAME = userData.lastName;
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Handle specific Mailchimp errors
      if (data.title === 'Member Exists') {
        console.log('User already subscribed:', userData.email);
        return { success: true, message: 'Already subscribed', existing: true };
      }
      
      console.error('Mailchimp API error:', data);
      throw new Error(data.detail || data.title || 'Mailchimp subscription failed');
    }
    
    console.log('Successfully subscribed to Mailchimp:', userData.email);
    return { success: true, data };
    
  } catch (error) {
    console.error('Error subscribing to Mailchimp:', error);
    throw error;
  }
}

/**
 * Update existing subscriber's merge fields
 * 
 * @param {string} email - Subscriber email
 * @param {Object} mergeFields - Fields to update
 * @returns {Promise<Object>} Mailchimp response object
 */
async function updateSubscriber(email, mergeFields) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';
  
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
    throw new Error('Mailchimp credentials not configured');
  }
  
  // Create MD5 hash of lowercase email
  const crypto = require('crypto');
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');
  
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`;
  
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merge_fields: mergeFields,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update subscriber');
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error updating Mailchimp subscriber:', error);
    throw error;
  }
}

/**
 * Add tags to a subscriber
 * 
 * @param {string} email - Subscriber email
 * @param {string[]} tags - Array of tag names
 * @returns {Promise<Object>} Mailchimp response object
 */
async function addTagsToSubscriber(email, tags) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';
  
  const crypto = require('crypto');
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');
  
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}/tags`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: tags.map(tag => ({ name: tag, status: 'active' })),
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to add tags');
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Error adding tags to Mailchimp subscriber:', error);
    throw error;
  }
}

module.exports = {
  subscribeToMailchimp,
  updateSubscriber,
  addTagsToSubscriber,
};

// Example usage (uncomment to test):
// (async () => {
//   try {
//     const result = await subscribeToMailchimp({
//       email: 'test@example.com',
//       role: 'realtor',
//       company: 'Test Realty',
//       monthly_listings: 30,
//     });
//     console.log('Subscription result:', result);
//   } catch (error) {
//     console.error('Subscription error:', error);
//   }
// })();
