var modal = document.getElementById("showTaskDetailsModal");

var addTaskModal = document.getElementById("addTaskModal");
var showTaskBudgetModal = document.getElementById("showTaskBudgetModal");

var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];
// When the user clicks the button, open the modal 


function showAddTaskModal() {
  addTaskModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

span1.onclick = function() {
  addTaskModal.style.display = "none";
}

span3.onclick = function() {
  showTaskBudgetModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }else if (event.target == addTaskModal) {
    addTaskModal.style.display = "none";
  }
}