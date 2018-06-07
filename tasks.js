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

	var d = new Date();

	var divBox = document.createElement("div");
	var checkboxSpan = document.createElement("span");
	var checkbox = document.createElement("input");
	var taskSpan = document.createElement("span");
	var starSpan = document.createElement("span");
	var editSpan = document.createElement("span");
	var delSpan = document.createElement("span");
	var editTimeDiv = document.createElement("div");
	var createTimeDiv = document.createElement("div"); 

	//create text nodes for the above elements
	var taskText = document.createTextNode(document.getElementById("taskInput").value);
	var editTimeText = document.createTextNode("Edited: "+d);
	var createTimeText = document.createTextNode("Created :"+d);

	//Appending textnodes
	taskSpan.appendChild(taskText);
	editTimeDiv.appendChild(editTimeText);
	createTimeDiv.appendChild(createTimeText);

	//Appending childnodes
	checkboxSpan.appendChild(checkbox);
	divBox.appendChild(checkboxSpan);
	divBox.appendChild(taskSpan);
	divBox.appendChild(starSpan);
	divBox.appendChild(editSpan);
	divBox.appendChild(delSpan);
	divBox.appendChild(editTimeDiv);
	divBox.appendChild(createTimeDiv);
	document.getElementById("taskRegion").appendChild(divBox);

	//Setting id for elements
	divBox.setAttribute("id","taskBox"+task);
	checkbox.setAttribute("id","taskStatus"+task);
	taskSpan.setAttribute("id","taskText"+task);
	starSpan.setAttribute("id","star"+task);
	editSpan.setAttribute("id","edit"+task);
	delSpan.setAttribute("id","del"+task);
	editTimeDiv.setAttribute("id","editTime"+task);
	createTimeDiv.setAttribute("id","createTime"+task);

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

	//Function call to save task data in database
	addTaskDb();

	document.getElementById("taskInput").value="";
	document.getElementById("taskInput").setAttribute("placeholder","Task");

}

function checkboxClick(button){
	
	k=button.getAttribute("id")[10];

	if(button.checked==true){
		document.getElementById("taskBox"+k).style.textDecoration ="line-through";
	}
	else{
		document.getElementById("taskBox"+k).style.textDecoration ="none";
	}

	editTaskDb(k);
}

function starClick(taskStar){

	k=taskStar.getAttribute("id")[4];

	if(taskStar.classList.contains("checked")){
		taskStar.classList.remove("checked");
	}
	else{
		taskStar.classList.add("checked");
	}

	editTaskDb(k);
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
		editTaskDb(k);
	}	

}

function editTaskDb(k){

	var d = new Date();
	document.getElementById("editTime"+k).innerHTML ="Edited: "+d;	

	if (window.XMLHttpRequest) {
  			xmlhttp = new XMLHttpRequest();
	 } 
	 else{
	   	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var url="tasks.php";
	var taskNumber = k;
	var checked;
	if(document.getElementById("taskStatus"+k).checked==true){
		checked = "yes";
	}
	else{
		checked = "no";
	}
	var taskText = document.getElementById("taskText"+k).innerHTML;
	var starred;
	if(document.getElementById("star"+k).classList.contains("checked")){
		starred = "yes";
	}
	else{
		starred = "no";
	}
	var editTime = document.getElementById("editTime"+k).innerHTML;
	var purpose = "edit";
	var params = "taskNumber="+taskNumber+"&checked="+checked+"&taskText="+taskText+"&starred="+starred+"&editTime="+editTime+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function delClick(del){

	k=del.getAttribute("id")[3];

	if (window.XMLHttpRequest) {
  		xmlhttp = new XMLHttpRequest();
	} 
	else{
	   	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var url="tasks.php";
	var taskNumber = k;
	var purpose = "delete";
	var params = "taskNumber="+taskNumber+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

	document.getElementById("taskBox"+k).remove();
	currentTasks--;


}

function addTaskDb(){

	if (window.XMLHttpRequest) {
  		xmlhttp = new XMLHttpRequest();
 	} 
 	else{
    	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var d = new Date();
	var url="tasks.php";
	var taskNumber = task;
	var checked = "no";
	var taskText = document.getElementById("taskInput").value;
	var starred = "no";
	var editTime = "Edited: "+d;
	var createTime = "Created: "+d;
	var purpose = "add";
	var params = "taskNumber="+taskNumber+"&checked="+checked+"&taskText="+taskText+"&starred="+starred+"&editTime="+editTime+"&createTime="+createTime+"&purpose="+purpose;
	
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}