	
function Todo(id, food, expirDate){
	this.id = id;
	this.food = food;
	this.expirDate = expirDate;
	this.done = false;
	}
	
var todos = [];

window.onload = init;

function init(){
	var addButton = document.getElementById("submit");
	var allergies = document.getElementById("allergies");
	if (addButton != null){
	addButton.onclick = getFormData;
	todos.sort(function(a,b){
		var c = new Date(a.expirDate);
		var d = new Date(b.expirDate);
		var cTime = c.getTime();
		var dTime = d.getTime();
		return cTime - dTime;
		
		});
	getTodoItems();
	}
	else if (addButton == null && allergies != null){
	getTodoItems();
	}
	updateOutput();
	/*getTodoData();*/
	}
	
	/*
	
function getTodoData() {
    var request = new XMLHttpRequest();
    request.open("GET", "todo.json");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) { 
                parseTodoItems(this.responseText);
                addTodosToPage();
            }
            else {
                console.log("Error: Data is empty");
            }
        }
    };
    request.send();
}

*/

function getTodoItems(){
	if (localStorage){ //check if localstorage exists
		for (var i = 0; i < localStorage.length; i++){ //loop
		var key = localStorage.key(i);
		if (key.substring(0,4) == "todo"){ //only add items with string "food" in key
			var item = localStorage.getItem(key);
			var todoItem = JSON.parse(item);
			todos.push(todoItem);
			}
		
		}
		todos.sort(function(a,b){
		var c = new Date(a.expirDate);
		var d = new Date(b.expirDate);
		var cTime = c.getTime();
		var dTime = d.getTime();
		return cTime - dTime;
		
		});
		addTodosToPage();
	}
	else {
        console.log("Error: you don't have localStorage!");
    }
}

	
function parseTodoItems(todoJSON){
	if (todoJSON == null || todoJSON.trim == ""){
	return;
		}
	var todoArray = JSON.parse(todoJSON);
	if (todoArray.length == 0) {
        console.log("Error: the to-do list array is empty!");
        return;
    	}
    for (var i = 0; i < todoArray.length; i++) {
        var todoItem = todoArray[i];
        todos.push(todoItem);
    	}
    todos.sort(function(a,b){
		var c = new Date(a.expirDate);
		var d = new Date(b.expirDate);
		var cTime = c.getTime();
		var dTime = d.getTime();
		return cTime - dTime;
		
		});
	}
	

/*
function addTodosToPage() {
    var ul = document.getElementById("todoList");
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = document.createElement("li");
        li.innerHTML =
            todoItem.food + ": Expires on " + todoItem.expirDate;
        ul.appendChild(li);
    }
}  
*/	

function addTodosToPage(){
	var ul = document.getElementById("todoList");
	var listFragment = document.createDocumentFragment();
	for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
        listFragment.appendChild(li);
        
    	}
    ul.appendChild(listFragment);
    todos.sort(function(a,b){
		var c = new Date(a.expirDate);
		var d = new Date(b.expirDate);
		var cTime = c.getTime();
		var dTime = d.getTime();
		return cTime - dTime;
		
		});
	}
	

	
function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = document.createElement("li");
    var spanTodo = document.createElement("span");
    var theDate = new Date();
    var currentTime = theDate.getTime();
    var str = "";
    var markRed = false;
    var markExpired = false;
    var itemDate = new Date(todoItem.expirDate);
    var itemExpires = itemDate.getTime();
     if ((itemExpires - currentTime >= 864000) && (itemExpires - currentTime < 1728000000)){
    markRed = true;
    }
    if (currentTime - itemExpires >= 0){
    markExpired = true;
    }
   

    str +=  todoItem.food + ":";
    if (markRed){
    str += '<expiring style = "color:red">';
    }
    else {
    str += '<expiring>';
    }
    if (markExpired){
    str += '<expiring2 style = "color:#8B0000">';
    str += ' THIS FOOD HAS EXPIRED';
    }
    else {
     str += '<expiring2>';
     str +=  " Expire on " + todoItem.expirDate;
     }
     str += '</expiring2>';
     str += '</expiring>';
    spanTodo.innerHTML = str;
        
  
    var spanDone = document.createElement("span");
    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&#9744;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#9745;&nbsp;";
    }

	var spanDelete = document.createElement("span");
    spanDelete.setAttribute("id", todoItem.id);
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#215;&nbsp;";

    spanDelete.onclick = deleteItem;
    
    //li.appendChild(spanDone);    
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);
    ul.appendChild(li);
    
    todos.sort(function(a,b){
		var c = new Date(a.expirDate);
		var d = new Date(b.expirDate);
		var cTime = c.getTime();
		var dTime = d.getTime();
		return cTime - dTime;
		
		});
    
    
}

function createNewTodo(todoItem) {
    var li = document.createElement("li");
    var spanTodo = document.createElement("span");
    var theDate = new Date();
    var currentTime = theDate.getTime();
    var str = "";
    var markRed = false;
    var markExpired = false;
    var itemDate = new Date(todoItem.expirDate);
    var itemExpires = itemDate.getTime();
    if ((itemExpires - currentTime >= 864000) && (itemExpires - currentTime < 1728000000)){
    markRed = true;
    }
    if (currentTime - itemExpires >= 0){
    markExpired = true;
    }
   

    str +=  todoItem.food + ":";
    if (markRed){
    str += '<expiring style = "color:red">';
    }
    else {
    str += '<expiring>';
    }
    if (markExpired){
    str += '<expiring2 style = "color:#8B0000">';
    str += ' THIS FOOD HAS EXPIRED';
    }
    else {
     str += '<expiring2>';
     str +=  " Expire on " + todoItem.expirDate;
     }
     str += '</expiring2>';
     str += '</expiring>';
    spanTodo.innerHTML = str;
        

    var spanDone = document.createElement("span");
    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&#9744;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#9745;&nbsp;";
    }

	var spanDelete = document.createElement("span");
    spanDelete.setAttribute("id", todoItem.id);
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#215;&nbsp;";

    spanDelete.onclick = deleteItem;
    


    
    //li.appendChild(spanDone);
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);
    
    return li;
}

/*
function saveTodoData() {
    var todoJSON = JSON.stringify(todos);
    var request = new XMLHttpRequest();
    var URL = "save.php?data=" + encodeURI(todoJSON);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type",
                             "text/plain;charset=UTF-8");
    request.send();
}
	
	*/
	
function getFormData() {
    var food = document.getElementById("food").value;
    if (checkInputText(food, "Please enter a food")) return;

    var expirDate = document.getElementById("expirDate").value;
    if (checkInputText(expirDate, "Please enter an expiration date")) return;
    
    var id = (new Date()).getTime();
    var todoItem = new Todo(id, food, expirDate);
    todos.push(todoItem);
    
    todos.sort(function(a,b){
		var c = new Date(a.expirDate);
		var d = new Date(b.expirDate);
		var cTime = c.getTime();
		var dTime = d.getTime();
		return cTime - dTime;
		
		});
    
    addTodoToPage(todoItem);
    saveTodoItem(todoItem);
    
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    	}
    return false;
	}

function saveTodoItem(todoItem) {
    if (localStorage) { //if localStorage exists
    
    	todos.sort(function(a,b){
		var c = new Date(a.expirDate);
		var d = new Date(b.expirDate);
		var cTime = c.getTime();
		var dTime = d.getTime();
		return cTime - dTime;
		
		});
		
        var key = "todo" + todoItem.id; //create key 
        var item = JSON.stringify(todoItem); //convert to string
        localStorage.setItem(key, item); //add to localStorage
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
	
	
}

/*

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    //ev.target.classList.toggle("close");
    
  }
}, false);

*/





function deleteItem(e) {

   
    var span = e.target;
    console.log("target" + e.target);
    var id = span.id;
    console.log("delete an item: " + id);

    // find and remove the item in localStorage
    var key = "todo" + id;
    localStorage.removeItem(key);

    // find and remove the item in the array
    for (var i = 0; i < todos.length; i++) { //loop through looking for matching id
        if (todos[i].id == id) { //if we find that id
            todos.splice(i, 1); //remove using splice
            break;
        }
    }
     // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);

}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function adding() {
    alert("The following items have been added to your list: \n1. Coffee \n2. Tea \n3. Milk ");
}
	     function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result)
                        .width(250)
                        .height(300);

                };

                reader.readAsDataURL(input.files[0]);
            }
        }
        
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
		//v = JSON.parse(localStorage).food;
		localStorage.food = JSON.stringify(v);
    } else {
      v = JSON.parse(localStorage).food;
      //localStorage.food = JSON.stringify(v);
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
			
    
    