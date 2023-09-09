class Api {
  constructor(options) {
    this._url = options.url;
    this._header = options.hraders;
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    else {
      return Promise.reject(`Код ошибки: ${response.status}`)
    }
  };

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkServerResponse)
  }

  getCardList() {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
  }

  getUserData() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
  }

  sendUserData(userData) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name: userData.name, about: userData.about})
    })
  }

  postNewCard(cardData) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name: cardData.imageName, link: cardData.imageLink})
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
  }

  updateUserAvatar(userData) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar: userData.avatar })
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
    } else {
      return this._request(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers,
      })
    }
  }
}

const api = new Api({
  url: 'https://api.elya-i.mesto.nomoredomainsicu.ru',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;