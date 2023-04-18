let restaurantId = readFromLocal("restaurantId");

document.getElementById("ordersTab").addEventListener("click", function () {
  showTab("ordersTab", "ordersContent");
});

document.getElementById("addFoodTab").addEventListener("click", function () {
  showTab("addFoodTab", "addFoodContent");
});

document
  .getElementById("addFoodForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const foodName = document.getElementById("foodName").value;
    const foodDescription = document.getElementById("foodDescription").value;
    const foodPrice = document.getElementById("foodPrice").value;
    const foodCategory = document.getElementById("foodCategory").value;

    // Make a POST request to add food to MongoDB
    fetch("http://localhost:8081/addFood", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        foodName: foodName,
        foodDescription: foodDescription,
        foodPrice: foodPrice,
        foodCategory: foodCategory,
        restaurantId: restaurantId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert(data.message);
        } else {
          alert("Failed to add food. Please try again.");
        }
      })
      .catch((error) => console.error(error));
  });

function showTab(tabId, contentId) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.style.display = "none";
  });
  document.getElementById(contentId).style.display = "block";
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
