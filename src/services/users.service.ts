import api from './api';

interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = (data: RegisterData) => {
  api.post('/auth/register', data);
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await api.post('/auth/login', data);

    const { access_token } = response.data;

    localStorage.setItem('access_token', access_token);

    return access_token;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => {
  localStorage.removeItem('access_token');
};

export const getProfile = async () => {
  const access_token = localStorage.getItem('access_token');

  const response = await api.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${access_token} `,
    },
  });

  return response?.data;
};

export const getUserInfo = async () => {
  const access_token = localStorage.getItem('access_token');

  const profile = await getProfile();

  const response = await api.get(`/users/${profile._id}`, {
    headers: {
      Authorization: `Bearer ${access_token} `,
    },
  });

  return response.data;
};

export const getUserBets = async () => {
  const access_token = localStorage.getItem('access_token');

  const profile = await getProfile();

  const response = await api.get(`/users/${profile._id}/bets`, {
    headers: {
      Authorization: `Bearer ${access_token} `,
    },
  });

  return response.data;
};

export const getRanking = async () => {
  const access_token = localStorage.getItem('access_token');

  const response = await api.get('users/ranking', {
    headers: {
      Authorization: `Bearer ${access_token} `,
    },
  });

  return response.data;
};

export const editUserProfile = async (
  userId: string,
  data: Partial<{ firstname: string; lastname: string; avatar: string }>
) => {
  const access_token = localStorage.getItem('access_token');

  const response = await api.patch(`users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${access_token} `,
    },
  });

  return response.data;
};
