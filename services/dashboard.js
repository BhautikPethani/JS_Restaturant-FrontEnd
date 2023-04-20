let restaurantId = readFromLocal("restaurantId");

fetch("http://localhost:8081/checkRestaurantIsRegisteredOrNot", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify({
    restaurantId: restaurantId,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.label != "success") {
      window.location.href = "login.html";
    }
    getOrders();
  })
  .catch((error) => console.error(error));

document.getElementById("btnSignOut").addEventListener("click", async (e) => {
  console.log("Signout");
  deleteFromLocal("restaurantId");
  window.location.href = "login.html";
});

function loadAllOrdersInTables(data) {
  var btnList = [];
  html = "";
  data.forEach((food) => {
    console.log(food);
    if (food.status == "0") {
      html +=
        '<div class="card">' +
        '<div class="row">' +
        '<div class="col-3">' +
        '<img src="http://localhost:8081/' +
        food.imagePath +
        '"' +
        'class="card-img-top" alt="...">' +
        "</div>" +
        '<div class="col-9">' +
        '<div class="card-body">' +
        '<h4 class="card-title"><b>' +
        food.foodName +
        "</b></h4>" +
        '<h5 style="color: red"><b>Notes:</b>' +
        food.Notes +
        "</h5>" +
        '<p class="card-text"><b>Quantity:</b> ' +
        food.quantity +
        "</p>" +
        '<h4 class="card-text"><b>Accepted</b> ' +
        "</h4>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    } else {
      html +=
        '<div class="card">' +
        '<div class="row">' +
        '<div class="col-3">' +
        '<img src="http://localhost:8081/' +
        food.imagePath +
        '"' +
        'class="card-img-top" alt="...">' +
        "</div>" +
        '<div class="col-9">' +
        '<div class="card-body">' +
        '<h4 class="card-title"><b>' +
        food.foodName +
        "</b></h4>" +
        '<h5 style="color: red"><b>Notes:</b>' +
        food.Notes +
        "</h5>" +
        '<p class="card-text"><b>Quantity:</b> ' +
        food.quantity +
        "</p>" +
        '<button type="button" id="' +
        food._id +
        '" class="btn btn-success">Accept</button>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
      btnList.push({ orderId: food._id });
    }
  });

  document.getElementById("pendingOrders").innerHTML = html;
  btnList.forEach((food) => {
    document
      .getElementById(food.orderId)
      .addEventListener("click", async (e) => {
        AcceptTheOrder(food);
      });
  });
}

function AcceptTheOrder(food) {
  console.log(food);
  fetch("http://localhost:8081/acceptTheOrder", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      orderId: food.orderId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.label == "success") {
        alert(data.message);
        window.location.href = "dashboard.html";
      } else {
        alert(data.message);
        window.location.href = "dashboard.html";
      }
      loadRegisteredFoods(data);
    })
    .catch((error) => console.error(error));
}

function getOrders() {
  fetch("http://localhost:8081/getRestaurantsOrder", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      restaurantId: restaurantId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      loadAllOrdersInTables(data);
    })
    .catch((error) => console.error(error));
}

function createToLocal(key, value) {
  const toJson = JSON.stringify(value);
  localStorage.setItem(key, toJson);
}

function readFromLocal(key) {
  const getJson = localStorage.getItem(key);
  const fromJson = JSON.parse(getJson);
  return fromJson;
}

function deleteFromLocal(key) {
  localStorage.removeItem(key);
}
