const baseUrl = "http://localhost:3001";

function _checkResponse(res) {
  // console.log("12345");
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return _checkResponse(res);
  });
}

function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item),
  }).then((res) => {
    return _checkResponse(res);
  });
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return _checkResponse(res);
  });
}

const api = { getItems, addItem, deleteItem, _checkResponse };

export default api;
