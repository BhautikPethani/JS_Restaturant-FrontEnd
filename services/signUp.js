let auth = document.getElementById("auth");
let alertPlaceHolder = document.getElementById("alertPlaceHolder");
let loader = document.getElementById("loader");
// <div class="loader-bg"><center><div class="loader"></div></center></div>

if (auth.value == "Create Account") {
  auth.addEventListener("click", async (e) => {
    let restaurantName = document.getElementById("restaurantName");
    let email = document.getElementById("email");
    let mobile = document.getElementById("mobile");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    if (
      restaurantName.value != "" &&
      email.value != "" &&
      mobile.value != "" &&
      password.value != "" &&
      confirmPassword.value != ""
    ) {
      if (password.value == confirmPassword.value) {
        loader.innerHTML =
          '<div class="loader-bg"><center><div class="loader"></div></center></div>';
        fetch("http://192.168.2.36:8081/restaurantSignUp", {
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
