import { baseUrl } from "./constants";
import api from "./api.js";
const TOKEN_KEY = "token";

function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then(api._checkResponse)
    .then((data) => {
      localStorage.setItem("token", data.token);
      return data;
    });
}

function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(api._checkResponse)
    .then((data) => {
      localStorage.setItem("token", data.token);
      return data;
    });
}

const updateProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

function getToken() {
  return localStorage.getItem("token");
}

function isLoggedIn() {
  return !!getToken();
}

function saveToken(token) {
  localStorage.setItem("token", token);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

const auth = {
  signup,
  signin,
  getToken,
  saveToken,
  removeToken,
  isLoggedIn,
  checkToken,
  updateProfile,
};

export default auth;
