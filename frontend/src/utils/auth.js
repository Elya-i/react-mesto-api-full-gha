import { SERVER_URL } from '../constant'

const checkServerResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(`Ошибка: ${response.status}`)
  }
};

export const register = (email, password) => {
  return fetch(`${SERVER_URL}/signup`, {
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
  return fetch(`${SERVER_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(checkServerResponse)
}

export const logout = () => {
  return fetch(`${SERVER_URL}/signout`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkServerResponse)
}

export const checkToken = () => {
  return fetch(`${SERVER_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(checkServerResponse)
}