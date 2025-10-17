const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Auth API calls
export const authAPI = {
  login: async (email, password, role) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    return response.json();
  },

  registerStudent: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    return response.json();
  },

  registerTeacher: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/teacher`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    return response.json();
  }
};

// Leaderboard API calls
export const leaderboardAPI = {
  getTopStudents: async (limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/leaderboard/students?limit=${limit}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch students');
    }
    
    return response.json();
  },

  getTopSchools: async (limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/leaderboard/schools?limit=${limit}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch schools');
    }
    
    return response.json();
  }
};

// Quiz API calls
export const quizAPI = {
  getQuizzes: async () => {
    const response = await fetch(`${API_BASE_URL}/quizzes`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch quizzes');
    }
    
    return response.json();
  },

  getQuiz: async (id) => {
    const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch quiz');
    }
    
    return response.json();
  }
};

// Challenge API calls
export const challengeAPI = {
  getChallenges: async () => {
    const response = await fetch(`${API_BASE_URL}/challenges`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch challenges');
    }
    
    return response.json();
  }
};

// Utility functions
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
