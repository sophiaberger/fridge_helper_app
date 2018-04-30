$("document").ready(function(f){
	console.log("loaded.");
	updateOutput();
});

function updateOutput() {
    // loads v from localStorage
      var v = [];
      
      if (localStorage.food) {
        for (var i = 0; i < localStorage.length; i++){ //loop
		var key = localStorage.key(i);
		if (key.substring(0,4) == "todo"){ //only add items with string "food" in key
			var item = localStorage.getItem(key);
			var todoItem = JSON.parse(item);
			v.push(todoItem);
			}
		}
	localStorage.food = JSON.stringify(v);
		
    } else {
      
      v = JSON.parse(localStorage).food;
    }
    // Output list
    var str = "";
    
    
    for (var i = 0; i < v.length; i++) {
			str += '<option value = "food">';
			str += v[i].food;
			str += '</option>';
			console.log(str);
			}
    $("#myFoodList").html(str);
}
			
    
    