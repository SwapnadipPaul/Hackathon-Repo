const API_BASE_URL = 'http://localhost:5000/api';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const authAPI = {
  login: async (email, password, role) => {
    try {
      console.log('Making login request to:', `${API_BASE_URL}/auth/login`);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
          const error = await response.json();
          errorMessage = error.error || errorMessage;
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          errorMessage = `Server error (${response.status}): ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log('Login successful, received:', result);
      return result;
    } catch (error) {
      console.error('Login API error:', error);
      if (error.message) {
        throw error;
      }
      throw new Error('Network error - please check if the server is running');
    }
  },

  registerStudent: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  },

  registerTeacher: async (teacherData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/teacher`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  }
};

export const leaderboardAPI = {
  getTopStudents: async (limit = 20) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/leaderboard/students?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch student leaderboard');
    }

    return response.json();
  },

  getTopSchools: async (limit = 10) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/leaderboard/schools?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch school leaderboard');
    }

    return response.json();
  }
};

export const getUserRole = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
