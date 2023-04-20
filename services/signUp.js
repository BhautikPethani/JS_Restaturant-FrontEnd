let auth = document.getElementById("auth");
let alertPlaceHolder = document.getElementById("alertPlaceHolder");
let loader = document.getElementById("loader");
let addressLineOne = document.getElementById("addressLineOne");

var lat, lng, address;

getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAV4hI7oKB7SIZZnU3TnV9RyDyw8WWiFLw`
  )
    .then((response) => response.json())
    .then((json) => {
      address = json.results[0].formatted_address;
      addressLineOne.value = address;
      console.log(address);
    })
    .catch((error) => console.error(error));
}

// <div class="loader-bg"><center><div class="loader"></div></center></div>

if (auth.value == "Create Account") {
  auth.addEventListener("click", async (e) => {
    let restaurantName = document.getElementById("restaurantName");
    let email = document.getElementById("email");
    let mobile = document.getElementById("mobile");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let openHour = document.getElementById("openHours");
    let addressLineOne = document.getElementById("addressLineOne");

    if (
      restaurantName.value != "" &&
      email.value != "" &&
      mobile.value != "" &&
      password.value != "" &&
      confirmPassword.value != "" &&
      openHour.value != "" &&
      addressLineOne.value != ""
    ) {
      if (password.value == confirmPassword.value) {
        loader.innerHTML =
          '<div class="loader-bg"><center><div class="loader"></div></center></div>';
        fetch("http://localhost:8081/restaurantSignUp", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            restaurantName: restaurantName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            mobile: mobile.value,
            openHours: openHour.value,
            addressLineOne: address,
            latitude: lat,
            longitude: lng,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            loader.innerHTML = "";
            alertPlaceHolder.innerHTML = alertBox(
              response.label,
              response.message
            );
          })
          .catch((err) => {
            loader.innerHTML = "";
            alertPlaceHolder.innerHTML = alertBox(
              "warning",
              "Restaurant already exists"
            );
          });
      } else {
        alertPlaceHolder.innerHTML = alertBox(
          "warning",
          "Password and Confirm password must be similar !!"
        );
      }
    } else {
      alertPlaceHolder.innerHTML = alertBox(
        "warning",
        "All fields are mandatory !!"
      );
    }
  });
} else if (auth.value == "Sign In") {
  auth.addEventListener("click", async (e) => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    if (email.value != "" && password.value != "") {
      loader.innerHTML =
        '<div class="loader-bg"><center><div class="loader"></div></center></div>';
      fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          loader.innerHTML = "";
          console.log(response);
          if (response._id) {
            console.log(response._id);

            createToLocal("restaurantId", response._id);
            window.location.href = "dashboard.html";
          } else {
            alertPlaceHolder.innerHTML = alertBox(
              "danger",
              "Invalid credentials !!"
            );
          }
        })
        .catch((err) => {
          loader.innerHTML = "";
          alertPlaceHolder.innerHTML = alertBox(
            "danger",
            "Something went wrong !!"
          );
        });
    } else {
      alertPlaceHolder.innerHTML = alertBox(
        "warning",
        "Invalid credentials !!"
      );
    }
  });
}
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
