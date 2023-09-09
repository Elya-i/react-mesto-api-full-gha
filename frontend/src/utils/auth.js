export const BASE_URL = 'https://elya-i.students.nomoredomainsicu.ru'

const checkServerResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(`Ошибка: ${response.status}`)
  }
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkServerResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkServerResponse)
}