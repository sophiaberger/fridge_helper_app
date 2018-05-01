
$(document).ready(function() {
function newElement() {

	if (!localStorage.foodList){
  		localStorage.foodList = JSON.stringify(v);
  	}
  	foodItem = JSON.parse(localStorage.foodList);
  
  
	var date = document.getElementById("date").value;
	var input = var date = document.getElementById("myInput").value;
	
	var foodItem = {
		foodName: input;
		expirationDate: date;
		};
	var myFoodJSON = JSON.stringify(foodItem);
	localStorage.foodList = myFoodJSON;
	
	}
}

