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
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    return _checkResponse(res);
  });
}

export { getItems, addItem, deleteItem, _checkResponse };
