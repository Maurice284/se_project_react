import { baseUrl } from "./constants";

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => {
    console.log("Error response:", text);
    return Promise.reject(`Error: ${res.status} - ${text}`);
  });
}

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return _checkResponse(res);
  });
}

function addItem({ name, imageUrl, weather }, token) {
  console.log("Token:", token);
  console.log("Request body:", JSON.stringify({ name, imageUrl, weather }));
  return fetch(`${baseUrl}/items`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => {
    return _checkResponse(res);
  });
}

function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  }).then((res) => {
    return _checkResponse(res);
  });
}

function updateProfile(profileData, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(profileData),
  }).then((res) => {
    return _checkResponse(res);
  });
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  }).then(_checkResponse);
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  }).then(_checkResponse);
}

const api = {
  getItems,
  addItem,
  deleteItem,
  _checkResponse,
  updateProfile,
  addCardLike,
  removeCardLike,
  baseUrl,
};

export default api;
