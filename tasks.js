var i=0;
var k=0;
var task=0;
var b=0;
var colArray = new Array();

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
	    	getAdminCollabsData();
	    }
	};
	xmlhttp.open("POST","getTaskData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

	getOtherCollabsData();
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

	colArray[k]=0;

	var divBox = document.createElement("div");
	var checkboxSpan = document.createElement("span");
	var checkbox = document.createElement("input");
	var taskSpan = document.createElement("span");
	var starSpan = document.createElement("span");
	var editSpan = document.createElement("span");
	var delSpan = document.createElement("span");
	var colDiv = document.createElement("div");
	var colInput = document.createElement("input");
	var colButton = document.createElement("button");
	var colDivUsers = document.createElement("div"); 
	var editTimeDiv = document.createElement("div");
	var createTimeDiv = document.createElement("div"); 

	//create text nodes for the above elements
	var taskText = document.createTextNode(tText);
	var btnText = document.createTextNode("Add Collaborators");
	var colDivUsersText = document.createTextNode("Collaborators :");
	var editTimeText = document.createTextNode(tEditTime);
	var createTimeText = document.createTextNode(tCreateTime);

	//Appending textnodes
	taskSpan.appendChild(taskText);
	colButton.appendChild(btnText);
	colDivUsers.appendChild(colDivUsersText);
	editTimeDiv.appendChild(editTimeText);
	createTimeDiv.appendChild(createTimeText);

	//Appending childnodes
	checkboxSpan.appendChild(checkbox);
	divBox.appendChild(checkboxSpan);
	divBox.appendChild(taskSpan);
	divBox.appendChild(delSpan);
	divBox.appendChild(editSpan);
	divBox.appendChild(starSpan);
	colDiv.appendChild(colInput);
	colDiv.appendChild(colButton);
	divBox.appendChild(colDiv);
	divBox.appendChild(colDivUsers);
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
	colDiv.setAttribute("id","colDiv"+k);
	colInput.setAttribute("id","colInput"+k);
	colButton.setAttribute("id","colButton"+k);
	colDivUsers.setAttribute("id","colDivUsers"+k);
	editTimeDiv.setAttribute("id","editTime"+k);
	createTimeDiv.setAttribute("id","createTime"+k);

	//Setting classes for elements
	divBox.setAttribute("class", "taskBoxClass");
	checkbox.setAttribute("class","checkboxClass");
	taskSpan.setAttribute("class", "taskClass");
	starSpan.setAttribute("class", "fa fa-star fa-2x");
	editSpan.setAttribute("class", "fa fa-edit fa-2x");
	delSpan.setAttribute("class", "fa fa-trash-o fa-2x");
	colDivUsers.setAttribute("class","colDivUsersClass");
	editTimeDiv.setAttribute("class", "editTimeClass");
	createTimeDiv.setAttribute("class", "createTimeClass");

	//Striking out if the checkbox is checked
	if(tChecked=="yes"){
		taskSpan.style.textDecoration ="line-through";
		document.getElementById("taskStatus"+k).checked = true;
	}
	else{
		taskSpan.style.textDecoration ="none";
	}

	divBox.style.background = "orange";
	//Adding stars if it is starred
	if(tStarred=="yes"){
		starSpan.classList.add("checked");
		document.getElementById("taskBox"+k).style.background = "#01FF70";
	}

	//Setting other attributes
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("name","taskStatus");
	checkbox.setAttribute("onclick","checkboxClick(this)");
	starSpan.setAttribute("onclick","starClick(this)");
	editSpan.setAttribute("onclick","editClick(this)");
	delSpan.setAttribute("onclick","delClick(this)");
	colButton.setAttribute("onclick","createCollaborators(this)");

	colInput.setAttribute("placeholder","Username");

	colInput.addEventListener("keyup",function(event){
		if(event.keyCode==13){//enter keyCode
			createCollaborators(this);
		}
	},false);

}

function createCollaborators(z){

	k=z.getAttribute("id")[8];
	var uname = document.getElementById("colInput"+k).value;

	addCollaborators(k,uname);	
	addCollabsDb(k,uname);

	document.getElementById("colInput"+k).value="";
	document.getElementById("colInput"+k).setAttribute("placeholder","Username");
}

function addCollaborators(k,uname){

	colArray[k]++;

	var colSpan = document.createElement("span");	
	var colNameText = document.createTextNode(uname);

	colSpan.appendChild(colNameText);
	document.getElementById("colDivUsers"+k).appendChild(colSpan);

	colSpan.setAttribute("id",k+"collab"+colArray[k]);
	colSpan.setAttribute("class","colSpanClass"); 

}

function addCollabsDb(taskNumber,uname){

	var url="tasks.php";
	var purpose = "addCollabs";
	var params = "taskNumber="+taskNumber+"&uname="+uname+"&purpose="+purpose;
	
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function getAdminCollabsData(){

	var p=0;
	var q=0;
	var collabsData;
	var userNameArr = new Array();
	var permission = "admin";
	var params = "permission="+permission;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){	
	    	collabsData = JSON.parse(this.responseText);
	    			
	    	for(p=0;p<collabsData.length;p++){
				userNameArr = collabsData[p].CollabsUsername;
				addCollaborators(collabsData[p].TaskNumber,userNameArr);
	    	}
	    }
	};
	xmlhttp.open("POST","getAdminCollabsData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);
}

function getOtherCollabsData(){

	var p=0;
	var q=0;
	var collabsData;
	var userName;
	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){	
	    	collabsData = JSON.parse(this.responseText);
	    	for(p=0;p<collabsData.length;p++){
				userName = collabsData[p].username;
				getCollabsData(userName,collabsData[p].TaskNumber);
	    	}
	    }
	};
	xmlhttp.open("POST","getOtherCollabsData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);
}

function getCollabsData(userName,taskNumber){
	
	var collabsData;
	var url="getCollabsData.php";
	var purpose = "getCollabsData";
	var params = "userName="+userName+"&taskNumber="+taskNumber+"&purpose="+purpose;

	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	collabsData = JSON.parse(this.responseText);
	    	for(i=0;i<collabsData.length;i++){
	    		b--;
	    		createBox(b,collabsData[i].Checked,collabsData[i].TaskText,collabsData[i].Starred,collabsData[i].EditTime,collabsData[i].CreateTime);
	    	}		
	    	 getCollabsUserData(userName);
	    }	    				
	};

	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);		

}

function getCollabsUserData(userName){

	var p=0;
	var q=0;
	var collabsData;
	var userNameGet;
	var permission = "others";
	var params = "permission="+permission+"&userName="+userName;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){	
	    	collabsData = JSON.parse(this.responseText);
	    	for(p=0;p<collabsData.length;p++){
				userNameGet = collabsData[p].CollabsUsername;
				addCollaborators(b,userNameGet);
	    	}
	    }
	};
	xmlhttp.open("POST","getAdminCollabsData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function checkboxClick(button){//Function to respond to user's checkbox click
	
	k=button.getAttribute("id")[10];

	if(button.checked==true){
		document.getElementById("taskText"+k).style.textDecoration ="line-through";
	}

	else{
		document.getElementById("taskText"+k).style.textDecoration ="none";
	}

	editTaskDb(k);

	if(document.getElementById("selectId").value=="remaining"){

		while(taskRegion.firstChild) { //To remove the childs of tasksRegion
	    	taskRegion.removeChild(taskRegion.firstChild);
		}

		sortBoxCheck();

		document.getElementById("selectId").value = "remaining";
	}	

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

	if(document.getElementById("selectId").value=="importance"){

		while(taskRegion.firstChild) { //To remove the childs of tasksRegion
	    	taskRegion.removeChild(taskRegion.firstChild);
		}

		sortBoxImp();

		document.getElementById("selectId").value = "importance";
	}	
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

function sortClick(y){

	while(taskRegion.firstChild) { //To remove the childs of tasksRegion
    	taskRegion.removeChild(taskRegion.firstChild);
	}

	if(document.getElementById(y.getAttribute("id")).value=="importance"){
		sortBoxImp();
	}

	else if(document.getElementById(y.getAttribute("id")).value=="time"){
		sortBoxTime();
	}

	else if(document.getElementById(y.getAttribute("id")).value=="remaining"){
		sortBoxCheck();
	}
}

function sortBoxCheck(){

	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	var data = JSON.parse(this.responseText);			
	    	for(i=0;i<data.length;i++){
	    		if(data[i].Checked=="no"){
	    			createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
	    		}
	    	}
	    	for(i=0;i<data.length;i++){
	    		if(data[i].Checked=="yes"){
	    			createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
	    		}
	    	}
	    }
	};
	xmlhttp.open("POST","getTaskData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function sortBoxImp(){

	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	var data = JSON.parse(this.responseText);			
	    	for(i=0;i<data.length;i++){
	    		if(data[i].Starred=="yes"){
	    			createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
	    		}
	    	}
	    	for(i=0;i<data.length;i++){
	    		if(data[i].Starred=="no"){
	    			createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
	    		}
	    	}
	    }
	};
	xmlhttp.open("POST","getTaskData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function sortBoxTime(){

	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	var data = JSON.parse(this.responseText);			
	    	for(i=0;i<data.length;i++){
	    		createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
	    	}
	    }
	};
	xmlhttp.open("POST","getTaskData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

initialise();