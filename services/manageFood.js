let restaurantId = readFromLocal("restaurantId");
let uploadedFileURL = "";

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
    // console.log(data);
    if (data.label != "success") {
      window.location.href = "login.html";
    }
    loadRegisteredFoods();
  })
  .catch((error) => console.error(error));

function loadAllFoodInTables(data) {
  var btnList = [];
  html = "";
  data.forEach((food) => {
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
        '<p style="color: #7c993a">(' +
        food.foodCategory +
        ")</p>" +
        '<p class="card-text"><b>Description:</b> ' +
        food.foodDescription +
        "</p>" +
        '<button type="button" id="' +
        food._id +
        '" class="btn btn-success">Activate</button>' +
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
        '<p style="color: #7c993a">(' +
        food.foodCategory +
        ")</p>" +
        '<p class="card-text"><b>Description:</b> ' +
        food.foodDescription +
        "</p>" +
        '<button type="button" id="' +
        food._id +
        '" class="btn btn-danger">Deactivate</button>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    }
    btnList.push({ foodID: food._id, status: food.status });
  });

  document.getElementById("registeredFoods").innerHTML = html;
  btnList.forEach((food) => {
    document
      .getElementById(food.foodID)
      .addEventListener("click", async (e) => {
        activateOrDeactivateFood(food);
      });
  });
}

function activateOrDeactivateFood({ foodID, status }) {
  //   console.log(foodID);
  fetch("http://localhost:8081/updateFoodStatus", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      foodId: foodID,
      status: status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.label == "success") {
        document.getElementById("foodAlertPlaceHolder").innerHTML = alertBox(
          "success",
          data.message
        );
      } else {
        document.getElementById("foodAlertPlaceHolder").innerHTML = alertBox(
          "danger",
          data.message
        );
      }
      loadRegisteredFoods(data);
    })
    .catch((error) => console.error(error));
}

function loadRegisteredFoods() {
  fetch("http://localhost:8081/getFoods", {
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
      loadAllFoodInTables(data);
    })
    .catch((error) => console.error(error));
}

const fileInput = document.getElementById("foodImage");

const previewImage = document.getElementById("previewImage");

fileInput.addEventListener("change", async (e) => {
  console.log("DONE");
  var formdata = new FormData();
  formdata.append("file", fileInput.files[0]);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("http://localhost:8081/uploadFoodImage", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      //   console.log(result);
      uploadedFileURL = result.filePath;
      var tempURL = "http://localhost:8081/" + result.filePath;
      //   console.log(tempURL);
      previewImage.src = tempURL;
    })
    .catch((error) => console.log("error", error));
  //   previewImage.src = fileInput.files[0].baseURI;
});

let alertPlaceHolder = document.getElementById("alertPlaceHolder");

document.getElementById("btnAddFood").addEventListener("click", function () {
  const dishName = document.getElementById("txtDishName").value;
  const description = document.getElementById("txtDescription").value;
  const foodCategory = document.getElementById("selectCategory").value;
  const price = document.getElementById("txtFoodPrice").value;
  const imagePath = uploadedFileURL;

  if (imagePath != "") {
    if (
      dishName != "" &&
      description != "" &&
      foodCategory != "" &&
      price != ""
    ) {
      fetch("http://localhost:8081/addFood", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          foodName: dishName,
          foodDescription: description,
          foodPrice: price,
          foodCategory: foodCategory,
          imagePath: imagePath,
          restaurantId: restaurantId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.label == "success") {
            alert(data.message);
            window.location.href = "manageFood.html";
          } else {
            alertPlaceHolder.innerHTML = alertBox(
              "danger",
              "Opps! Something went wrong !!"
            );
          }
        })
        .catch((error) => console.error(error));
    } else {
      alertPlaceHolder.innerHTML = alertBox(
        "warning",
        "Opps! All fields are mendatory !!"
      );
    }
  } else {
    alertPlaceHolder.innerHTML = alertBox(
      "warning",
      "Opps! Please upload food image !!"
    );
  }
});

// document.getElementById("addFoodTab").addEventListener("click", function () {
//   showTab("addFoodTab", "addFoodContent");
// });

// document
//   .getElementById("addFoodForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Get form data
//     const foodName = document.getElementById("foodName").value;
//     const foodDescription = document.getElementById("foodDescription").value;
//     const foodPrice = document.getElementById("foodPrice").value;
//     const foodCategory = document.getElementById("foodCategory").value;

//     // Make a POST request to add food to MongoDB
//     fetch("http://localhost:8081/addFood", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         foodName: foodName,
//         foodDescription: foodDescription,
//         foodPrice: foodPrice,
//         foodCategory: foodCategory,
//         restaurantId: restaurantId,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           alert(data.message);
//         } else {
//           alert("Failed to add food. Please try again.");
//         }
//       })
//       .catch((error) => console.error(error));
//   });

// function showTab(tabId, contentId) {
//   document.querySelectorAll(".tab").forEach((tab) => {
//     tab.classList.remove("active");
//   });
//   document.getElementById(tabId).classList.add("active");
//   document.querySelectorAll(".tab-content").forEach((content) => {
//     content.style.display = "none";
//   });
//   document.getElementById(contentId).style.display = "block";
// }

function alertBox(type, msg) {
  var alertBox = "";

  if (type == "warning") {
    return '<div class="alert alert-warning" role="alert">' + msg + "</div>";
  } else if (type == "success") {
    return '<div class="alert alert-success" role="alert">' + msg + "</div>";
  } else if (type == "danger") {
    return '<div class="alert alert-danger" role="alert">' + msg + "</div>";
  }
}

document.getElementById("btnSignOut").addEventListener("click", async (e) => {
  console.log("Signout");
  deleteFromLocal("restaurantId");
  window.location.href = "login.html";
});

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
