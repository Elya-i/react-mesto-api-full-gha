export const BASE_URL = 'https://api.elya-i.mesto.nomoredomainsicu.ru'

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

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkServerResponse)
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token)
      return data.token
    }
  })
}

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const checkToken = (token )=> {
  return fetch(`${BASE_URL}/`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(checkServerResponse)
}