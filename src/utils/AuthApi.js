const BASE_URL = "https://auth.nomoreparties.co";

function handleResponse(res) {
  // console.log('auth api', res);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error! : ${res.status}`);
  }
}

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ password, email }),
  }).then(handleResponse);
}

export function logIn(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ password, email }),
  }).then(handleResponse);
}

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(handleResponse);
}
