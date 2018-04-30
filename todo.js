	
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
	getTodoItems();
	}
	else if (allergies != null){
	getTodoItems();
	}
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
	}
	

	
function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = document.createElement("li");
    var spanTodo = document.createElement("span");
     spanTodo.innerHTML =
        todoItem.food + ": Expires on " + todoItem.expirDate;  
        
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
    
}

function createNewTodo(todoItem) {
    var li = document.createElement("li");
    var spanTodo = document.createElement("span");
    spanTodo.innerHTML =
        todoItem.food + ": Expires on " + todoItem.expirDate;

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
    var id = span.parentElement.id;
    console.log("delete an item: " + id);

    // find and remove the item in localStorage
    var key = "todo" + id;
    localStorage.removeItem('key');

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