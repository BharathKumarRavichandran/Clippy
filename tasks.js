var k=0;
var task=0;

document.getElementById("taskInput").addEventListener("keyup",function(event){

	if(event.keyCode==13){
		newTask();
	}


},false);

function newTask(){
	task++;
	createBox();
}

function createBox(){

	var divBox = document.createElement("div");
	var checkboxSpan = document.createElement("span");
	var checkbox = document.createElement("input");
	var taskSpan = document.createElement("span");
	var starSpan = document.createElement("span");

	//create text nodes if there are any
	var taskText = document.createTextNode(document.getElementById("taskInput").value);

	//Appending textnodes
	taskSpan.appendChild(taskText);

	//Appending childnodes
	checkboxSpan.appendChild(checkbox);
	divBox.appendChild(checkboxSpan);
	divBox.appendChild(taskSpan);
	divBox.appendChild(starSpan);
	document.getElementById("taskRegion").appendChild(divBox);

	//Setting id's for elements
	divBox.setAttribute("id","taskBox"+task);
	checkbox.setAttribute("id","taskStatus"+task);
	taskSpan.setAttribute("id","taskText"+task);
	starSpan.setAttribute("id","star"+task);

	//Setting classes for elements
	starSpan.setAttribute("class","fa fa-star");

	//Setting other attributes
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("name","taskStatus");
	checkbox.setAttribute("onclick","checkboxClick(this)");
	starSpan.setAttribute("onclick","starClick(this)");

	document.getElementById("taskInput").value="";

}

function checkboxClick(button){
	
	k=button.getAttribute("id")[10];

	if(button.checked==true){
		document.getElementById("taskBox"+k).style.textDecoration ="line-through";
	}
	else{
		document.getElementById("taskBox"+k).style.textDecoration ="none";
	}
}

function starClick(taskStar){

	if(taskStar.classList.contains("checked")){
		taskStar.classList.remove("checked");
	}
	else{
		taskStar.classList.add("checked");
	}

}