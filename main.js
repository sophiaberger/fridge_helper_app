
// Create a "close" button and append it to each list item
/*

var myNodelist = document.getElementsByTagName("LI");
//myNodeList = document.getElementsByTagName("addBtn");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u2610");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}


// load everything from local storage
	var v = [];
	//if localStorage exists, parse data
	if (localStorage.foodList){
	v = JSON.parse(localStorage.foodList);
	}
	else{
		localStorage.foodList = JSON.stringify(v);
	}
	
	//output lisy
	var str = "";
	for (var i = 0; i < v.length; i++){
		str += ('<ul id = "myUL">');
		str += ('<li id = "close">');
		str += v[i].foodName + ": Expires on " + v[i].expirationDate ;
		str += ('<br />');
		str += ('</li>');
		str += ('</ul>');
		console.log(str);
	}
	$("#result").html(str);
	//$("#result").html('<br />');
	
	
	



*/

// Click on a close button to hide the current list item


// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
if (list != null){
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    //ev.target.classList.toggle("close");
    
  }
}, false);
}




var food;



// Create a new list item when clicking on the "Add" button
function newElement() {

	
  //var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var date = document.getElementById("date").value; //added by me 
  //console.log("THE SHIT IS "+date+" - "+inputValue);
  //var epoch = Date.now();
  
  
  //yada 
  
  console.log("clicked it");
  v = [];
  //if it doesn't exist yet 
  if (!localStorage.foodList){
  localStorage.foodList = JSON.stringify(v);
  }
  v = JSON.parse(localStorage.foodList);
  
  
    
// get the old list
// append the new shit
// save the new list
  
  //var t = document.createTextNode(inputValue);
  //var t3 = document.createTextNode(": Expires on "); //added by me
  //var t2 = document.createTextNode(date); //added by me
  //li.appendChild(t);
  //li.appendChild(t3); //added by me
  //li.appendChild(t2);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    //document.getElementById("myUL").appendChild(li);
    //var txt.attribute = "\u2610";
    //txt.id = "close";
    food = {
    "expirationDate": date,
     "foodName": inputValue,
      id: v.length};
      
    
  	v.push(food);
  	
  //v.push(span);
  	localStorage.foodList = JSON.stringify(v);
  	loadFoods();
  }
  //document.getElementById("myInput").value = "";
  //document.getElementById("date").value = ""; //added by me

  //var span = document.createElement("SPAN");
  
  //txt.setAttribute("close", "\u2610");
  //span.className = "close";
  //span.appendChild(txt);
  //li.appendChild(span);
  
  
  
   //(putting the close button on)
  //listContents.push(li); //added by me
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() { //when closed
      var div = this.parentElement;
      div.style.display = "none";
    }
    
  }

  
  // Check browser support
	

	
	
  sortListDir();
}



$(document).ready(function() {

console.log("LOADED");
	//var list = $("#myUL");
	//var listContents = [];

   loadFoods(); 
});

function loadFoods(){
	
// load everything from local storage
	var v = [];
	//if localStorage exists, parse data
	if (localStorage.foodList){
	v = JSON.parse(localStorage.foodList);
	}
	else{
		localStorage.foodList = JSON.stringify(v);
	}
	
	//output lisy
	var str = "";
	for (var i = 0; i < v.length; i++){
		str += ('<ul id = "myUL">');
		str += ('<li>');
		str += v[i].foodName + ": Expires on " + v[i].expirationDate ;
		str += ('<br />');
		str += ('</li>');
		str += ('</ul>');
		console.log(str);
	}
	$("#result").html(str);
	//$("#result").html('<br />');
	
	
	
	
	
}


/*
if (typeof(Storage) !== "undefined") {
	var b, list, i = 0;
    // Store
    list = document.getElementById("myUL");
    b = list.getElementsById("LI");
    for (i = 0; i < (b.length - 1); i++) {
    localStorage.setItem("food", b[i]);
    }
    //localStorage.setItem("food", list.getElementById("keep"));
    // Retrieve
    
    
    document.getElementById("result").innerHTML = localStorage.food;
    
    
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	*/
	
function menu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


function sortListDir() {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.getElementById("myUL");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  //Make a loop that will continue until no switching has been done:
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    b = $("#date");
    
    //Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc):*/
      if (dir == "asc") {
        if (b[i].innerHTML.getDate > b[i + 1].innerHTML.getDate()) {
          /*if next item is alphabetically lower than current item,
          mark as a switch and break the loop:*/
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.getDate() < b[i + 1].innerHTML.getDate()) {
          /*if next item is alphabetically higher than current item,
          mark as a switch and break the loop:*/
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      //Each time a switch is done, increase switchcount by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

