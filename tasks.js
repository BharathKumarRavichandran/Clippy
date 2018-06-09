var i=0;
var k=0;
var task=0;

if (window.XMLHttpRequest) {
  	xmlhttp = new XMLHttpRequest();
} 
else{
  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

document.getElementById("taskInput").addEventListener("keyup",function(event){//Function to listen for enter keyup at taskInput

	if(event.keyCode==13){//enter keyCode
		newTask();
	}

},false);

function initialise(){//Function to get stored task data in database and to create task boxes
	
	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	var data = JSON.parse(this.responseText);			
	    	for(i=0;i<data.length;i++){
	    		task++;
	    		createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
	    	}
	    }
	};
	xmlhttp.open("POST","getTaskData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function newTask(){//Function to collect current task data to call box creating and data storing function

	if(document.getElementById("taskInput").value!==""){
		
		task++;

		var d = new Date();
		var taskNumber = task;
		var checked = "no";
		var taskText = document.getElementById("taskInput").value;
		var starred = "no";
		var editTime = "Edited: "+d;
		var createTime = "Created: "+d;

		createBox(taskNumber,checked,taskText,starred,editTime,createTime);
		
		//Function call to save task data in database
		addTaskDb(taskNumber,checked,taskText,starred,editTime,createTime);

		document.getElementById("taskInput").value="";
		document.getElementById("taskInput").setAttribute("placeholder","Task");

	}	

}

function createBox(k,tChecked,tText,tStarred,tEditTime,tCreateTime){//Function to create all nodes and to add task box

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
	var taskText = document.createTextNode(tText);
	var editTimeText = document.createTextNode(tEditTime);
	var createTimeText = document.createTextNode(tCreateTime);

	//Appending textnodes
	taskSpan.appendChild(taskText);
	editTimeDiv.appendChild(editTimeText);
	createTimeDiv.appendChild(createTimeText);

	//Appending childnodes
	checkboxSpan.appendChild(checkbox);
	divBox.appendChild(checkboxSpan);
	divBox.appendChild(taskSpan);
	divBox.appendChild(delSpan);
	divBox.appendChild(editSpan);
	divBox.appendChild(starSpan);
	divBox.appendChild(editTimeDiv);
	divBox.appendChild(createTimeDiv);
	document.getElementById("taskRegion").appendChild(divBox);

	//Setting id for elements
	divBox.setAttribute("id","taskBox"+k);
	checkbox.setAttribute("id","taskStatus"+k);
	taskSpan.setAttribute("id","taskText"+k);
	starSpan.setAttribute("id","star"+k);
	editSpan.setAttribute("id","edit"+k);
	delSpan.setAttribute("id","del"+k);
	editTimeDiv.setAttribute("id","editTime"+k);
	createTimeDiv.setAttribute("id","createTime"+k);

	//Setting classes for elements
	divBox.setAttribute("class", "taskBoxClass");
	checkbox.setAttribute("class","checkboxClass");
	taskSpan.setAttribute("class", "taskClass");
	starSpan.setAttribute("class", "fa fa-star fa-2x");
	editSpan.setAttribute("class", "fa fa-edit fa-2x");
	delSpan.setAttribute("class", "fa fa-trash-o fa-2x");
	editTimeDiv.setAttribute("class", "editTimeClass");
	createTimeDiv.setAttribute("class", "createTimeClass");

	//Striking out if the checkbox is checked
	if(tChecked=="yes"){
		divBox.style.textDecoration ="line-through";
	}
	else{
		divBox.style.textDecoration ="none";
	}

	divBox..style.background = "orange";
	//Adding stars if it is starred
	if(tStarred=="yes"){
		starSpan.classList.add("checked");
		divBox.style.background = "#01FF70";
	}

	//Setting other attributes
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("name","taskStatus");
	checkbox.setAttribute("onclick","checkboxClick(this)");
	starSpan.setAttribute("onclick","starClick(this)");
	editSpan.setAttribute("onclick","editClick(this)");
	delSpan.setAttribute("onclick","delClick(this)");

}

function checkboxClick(button){//Function to respond to user's checkbox click
	
	k=button.getAttribute("id")[10];

	if(button.checked==true){
		document.getElementById("taskBox"+k).style.textDecoration ="line-through";
	}
	else{
		document.getElementById("taskBox"+k).style.textDecoration ="none";
	}

	editTaskDb(k);
}

function starClick(taskStar){//Function to respond to user's star click

	k=taskStar.getAttribute("id")[4];

	if(taskStar.classList.contains("checked")){
		taskStar.classList.remove("checked");
		document.getElementById("taskBox"+k).style.background = "orange";
	}
	else{
		taskStar.classList.add("checked");
		document.getElementById("taskBox"+k).style.background = "#01FF70";
	}

	editTaskDb(k);
}

function editClick(edit){//Function that allows user to edit the contents of the task

	k=edit.getAttribute("id")[4];

	if(document.getElementById("edit"+k).getAttribute("class")=="fa fa-edit fa-2x"){
		document.getElementById("taskText"+k).setAttribute("contentEditable",true);
		document.getElementById("edit"+k).setAttribute("class","fa fa-check-circle fa-2x");	
	}
	else{
		document.getElementById("taskText"+k).setAttribute("contentEditable",false);
		document.getElementById("edit"+k).setAttribute("class","fa fa-edit fa-2x");
		editTaskDb(k);
	}	

}

function editTaskDb(k){//Function to update edited task data in database

	var d = new Date();
	document.getElementById("editTime"+k).innerHTML ="Edited: "+d;	

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

function delClick(del){//Function to delete a task

	k=del.getAttribute("id")[3];

	var url="tasks.php";
	var taskNumber = k;
	var purpose = "delete";
	var params = "taskNumber="+taskNumber+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

	document.getElementById("taskBox"+k).remove();

}

function addTaskDb(taskNumber,checked,taskText,starred,editTime,createTime){//Function to store user's newly created task data in database

	var url="tasks.php";
	var purpose = "add";
	var params = "taskNumber="+taskNumber+"&checked="+checked+"&taskText="+taskText+"&starred="+starred+"&editTime="+editTime+"&createTime="+createTime+"&purpose="+purpose;
	
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

initialise();