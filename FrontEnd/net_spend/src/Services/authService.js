const API_BASE_URL = 'http://localhost:8082/api/auth';

// Function to log in a user
export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        console.log('Login response data:', data); // Debug statement

        if (!data.token) {
            throw new Error('Invalid response data');
        }

        // Assuming the user object is retrieved elsewhere after logging in
        saveUserDetails({}, data.token, ""); // Save token, assume no refresh token for now
        return data; // Returns the data object containing token
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Save user details and tokens in localStorage
export function saveUserDetails(user, accessToken, refreshToken) {
    console.log('Saving user details:', user, accessToken, refreshToken); // Debug statement
    localStorage.setItem('userDetails', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

// Function to get the current user's details
export async function getCurrentUser() {
    try {
        const token = localStorage.getItem('accessToken');
        console.log('Retrieved token:', token); // Debug statement
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(`${API_BASE_URL}/current_user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        const user = await response.json();
        return user; // Returns the current user details
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error(error.message); // Serialize the error message
    }
}

// Function to update high security settings
export async function updateSecuritySettings(securitySettings) {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Authentication token not found');
        }
        const response = await fetch(`${API_BASE_URL}/update-security-settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(securitySettings),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update security settings');
        }
        const data = await response.json();
        alert("High security options updated successfully.");
        return data; // Optionally return data if needed for further processing
    } catch (error) {
        console.error('Error updating high security settings:', error);
        alert("Failed to update high security options. Please try again.");
        throw new Error(error.message); // Serialize the error message
    }
}

// Retrieve user details from localStorage
export function getUserDetails() {
    const userDetails = localStorage.getItem('userDetails');
    return userDetails ? JSON.parse(userDetails) : null;
}

// Check if the user is logged in
export function isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    return !!token; // Converts to boolean - true if token exists, false otherwise
}

// Logout the user
export function logoutUser() {
    localStorage.clear(); // Clear all local storage items
    // Optionally redirect the user to the login page
    // window.location.href = '/login';
}

// Function to refresh the access token
export async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }
    const response = await fetch(`${API_BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
    });
    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
}

// Conceptual method for automatic token refresh and retry on API calls
export async function autoRefreshTokenAndRetry(originalRequest) {
    try {
        const newToken = await refreshToken(); // Assumes refreshToken() is implemented
        if (newToken) {
            // Update the original request with new token and retry
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return fetch(originalRequest.url, originalRequest);
        }
    } catch (error) {
        console.error('Auto-refresh token and retry error:', error);
        throw new Error(error.message); // Serialize the error message
    }
}
