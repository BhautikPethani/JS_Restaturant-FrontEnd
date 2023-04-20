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
  })
  .catch((error) => console.error(error));

document.getElementById("btnSignOut").addEventListener("click", async (e) => {
  console.log("Signout");
  deleteFromLocal("restaurantId");
  window.location.href = "login.html";
});
// document.getElementById("ordersTab").addEventListener("click", function () {
//   showTab("ordersTab", "ordersContent");
// });

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

const fileInput = document.getElementById("foodImage");

const previewImage = document.getElementById("previewImage");

fileInput.addEventListener("select", async (e) => {
  console.log("DONE");
  previewImage.src = fileInput.baseURI;
});

// const submit = document.getElementById("submit");
// submit.addEventListener("click", async (e) => {
//   // create a new FormData object
//   var formdata = new FormData();
//   formdata.append("file", fileInput.files[0]);

//   var requestOptions = {
//     method: "POST",
//     body: formdata,
//     redirect: "follow",
//   };

//   fetch("http://localhost:8081/upload", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// });
