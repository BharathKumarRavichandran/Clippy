var k=0;
var task=0;
var currentTasks=0;

document.getElementById("taskInput").addEventListener("keyup",function(event){

	if(event.keyCode==13){
		newTask();
	}


},false);

function newTask(){
	task++;
	currentTasks++;
	createBox();
}

function createBox(){

	var divBox = document.createElement("div");
	var checkboxSpan = document.createElement("span");
	var checkbox = document.createElement("input");
	var taskSpan = document.createElement("span");
	var starSpan = document.createElement("span");
	var editSpan = document.createElement("span");
	var delSpan = document.createElement("span");

	//create text nodes if there are any
	var taskText = document.createTextNode(document.getElementById("taskInput").value);

	//Appending textnodes
	taskSpan.appendChild(taskText);

	//Appending childnodes
	checkboxSpan.appendChild(checkbox);
	divBox.appendChild(checkboxSpan);
	divBox.appendChild(taskSpan);
	divBox.appendChild(starSpan);
	divBox.appendChild(editSpan);
	divBox.appendChild(delSpan);
	document.getElementById("taskRegion").appendChild(divBox);

	//Setting id's for elements
	divBox.setAttribute("id","taskBox"+task);
	checkbox.setAttribute("id","taskStatus"+task);
	taskSpan.setAttribute("id","taskText"+task);
	starSpan.setAttribute("id","star"+task);
	editSpan.setAttribute("id","edit"+task);
	delSpan.setAttribute("id","del"+task);

	//Setting classes for elements
	starSpan.setAttribute("class","fa fa-star");
	editSpan.setAttribute("class","fa fa-edit");
	delSpan.setAttribute("class","fa fa-trash-o");

	//Setting other attributes
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("name","taskStatus");
	checkbox.setAttribute("onclick","checkboxClick(this)");
	starSpan.setAttribute("onclick","starClick(this)");
	editSpan.setAttribute("onclick","editClick(this)");
	delSpan.setAttribute("onclick","delClick(this)");

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

function editClick(edit){

	k=edit.getAttribute("id")[4];

	if(document.getElementById("edit"+k).getAttribute("class")=="fa fa-edit"){
		document.getElementById("taskText"+k).setAttribute("contentEditable",true);
		document.getElementById("edit"+k).setAttribute("class","fa fa-check-circle");
	}
	else{
		document.getElementById("taskText"+k).setAttribute("contentEditable",false);
		document.getElementById("edit"+k).setAttribute("class","fa fa-edit");
	}	

}

function delClick(del){

	k=del.getAttribute("id")[3];
	document.getElementById("taskBox"+k).remove();
	currentTasks--;

}