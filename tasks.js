var i=0;
var k=0;
var l=0;
var task=0;
var b=0;
var permission;
var cusername="";
var ctasknumber=0;
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
	    		permission="admin";
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
		permission="admin";

		createBox(taskNumber,checked,taskText,starred,editTime,createTime);
		
		//Function call to save task data in database
		addTaskDb(taskNumber,checked,taskText,starred,editTime,createTime);

		document.getElementById("taskInput").value="";
		document.getElementById("taskInput").setAttribute("placeholder","Task");

	}	

}

function createBox(k,tChecked,tText,tStarred,tEditTime,tCreateTime){//Function to create all nodes and to add task box

	if(k>0&&document.getElementById("nothing1")){
		document.getElementById("nothing1").remove();
	}

	else if(k<0&&document.getElementById("nothing2")){
		document.getElementById("nothing2").remove();
	}

	colArray[k]=0;

	var divBox = document.createElement("div");
	var checkboxSpan = document.createElement("span");
	var checkbox = document.createElement("input");
	var taskSpan = document.createElement("span");
	var starSpan = document.createElement("span");
	var editSpan = document.createElement("span");
	var delSpan = document.createElement("span");
	var	colDiv = document.createElement("div");
	var	colInput = document.createElement("input");
	var	colButton = document.createElement("button");	
	var colDivUsers = document.createElement("div"); 
	var editTimeDiv = document.createElement("div");
	var createTimeDiv = document.createElement("div");

	var cDiv;
	var cUSpan;
	var cNSpan;
	if(k<0){
		cDiv = document.createElement("div");
		cUSpan = document.createElement("span");
		cNSpan = document.createElement("span");
	} 

	//create text nodes for the above elements
	var taskText = document.createTextNode(tText);
	var	btnText = document.createTextNode("Add Collaborators");	
	var colDivUsersText = document.createTextNode("Collaborators :");
	var editTimeText = document.createTextNode(tEditTime);
	var createTimeText = document.createTextNode(tCreateTime);

	var cDivText;
	var cUSpanText;
	var cNSpanText;
	if(k<0){
		cUSpanText = document.createTextNode(cusername);
		cNSpanText = document.createTextNode(ctasknumber);
	} 

	//Appending textnodes
	taskSpan.appendChild(taskText);
	colButton.appendChild(btnText);
	colDivUsers.appendChild(colDivUsersText);
	editTimeDiv.appendChild(editTimeText);
	createTimeDiv.appendChild(createTimeText);
	if(k<0){
		cUSpan.appendChild(cUSpanText);
		cNSpan.appendChild(cNSpanText);
	}

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
	if(k<0){
		cDiv.appendChild(cUSpan);
		cDiv.appendChild(cNSpan);
		divBox.appendChild(cDiv);
	}

	if(k>0){
		document.getElementById("taskRegion").appendChild(divBox);
	}
	else if(k<0){
		document.getElementById("taskRegion2").appendChild(divBox);
	}	

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
	if(k<0){
		cDiv.setAttribute("id","cDiv"+k);
		cUSpan.setAttribute("id","cUSpan"+k);
		cNSpan.setAttribute("id","cNSpan"+k);
	}

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

	if(k<0){
		cDiv.setAttribute("style","display:none;");
	}

}

function createCollaborators(z){

	k=z.getAttribute("id")[8];

	var uname = document.getElementById("colInput"+k).value;

	if(k!="-"){
		addCollabsDb(k,uname);
		addCollaborators(k,uname);	
	}
	else{
		k+=z.getAttribute("id")[9];
		addCollabsDb2(k,uname);
		addCollaborators(k,uname);	
	}
	
	document.getElementById("colInput"+k).value="";
	document.getElementById("colInput"+k).setAttribute("placeholder","Username");
}

function addCollaborators(k,uname){

	if(k<0){
		colArray[k]--;
	}
	else{
		colArray[k]++;
	}

	var colSpan = document.createElement("span");	
	var colNameText = document.createTextNode(uname);
	if(k>0){
		var colCloseSpan = document.createElement("span");
	}	

	colSpan.appendChild(colNameText);
	if(k>0){
		colSpan.appendChild(colCloseSpan);
	}
	document.getElementById("colDivUsers"+k).appendChild(colSpan);

	colSpan.setAttribute("id",k+"collab"+colArray[k]);
	colSpan.setAttribute("class","colSpanClass"); 
	if(k>0){
		colCloseSpan.setAttribute("id",k+"colClose"+colArray[k]);	
		colCloseSpan.setAttribute("class","fa fa-window-close");
		colCloseSpan.setAttribute("onclick","collaboratorDelete(this)");
	}

}

function collaboratorDelete(del){

	k=del.getAttribute("id")[0];
	l=del.getAttribute("id")[9];

	var taskNumber = k;
	var url="updateCollabData.php";
	var purpose = "delete";
	var un = document.getElementById(k+"collab"+l).textContent;
	var unum = k;
	var params = "un="+un+"&unum="+unum+"&taskNumber="+taskNumber+"&purpose="+purpose;	

	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

	document.getElementById(k+"collab"+l).remove();

}

function addCollabsDb(taskNumber,uname){

	k=taskNumber;
	var url="tasks.php";
	var purpose = "addCollabs";
	var params="";
	var un;
	var unum;
	
	params = "taskNumber="+taskNumber+"&uname="+uname+"&purpose="+purpose;

	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function addCollabsDb2(taskNumber,uname){

	k=taskNumber;

	var url="updateCollabData.php";
	var purpose = "addCollabs";
	var params="";
	var un;
	var unum;
	
	un = document.getElementById("cUSpan"+k).innerHTML;
	unum = document.getElementById("cNSpan"+k).innerHTML;
	params = "un="+un+"&unum="+unum+"&taskNumber="+taskNumber+"&checked="+checked+"&taskText="+taskText+"&starred="+starred+"&editTime="+editTime+"&purpose="+purpose;

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
	    	console.log("hey");
		    	collabsData = JSON.parse(this.responseText);
		    	console.log(collabsData);
		    	for(i=0;i<collabsData.length;i++){
		    		b--;
		    		permission="others";
		    		cusername=userName;
		    		ctasknumber=taskNumber;
		    		console.log(b);
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

	if(k!="-"){

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
	
	else{
		k="-";
		k+=button.getAttribute("id")[11];

		if(button.checked==true){
			document.getElementById("taskText"+k).style.textDecoration ="line-through";
		}

		else{
			document.getElementById("taskText"+k).style.textDecoration ="none";
		}

		editTaskDb2(k);
	}	

}

function starClick(taskStar){//Function to respond to user's star click

	k=taskStar.getAttribute("id")[4];

	if(k!="-"){

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

	else{
		k="-";
		k+=taskStar.getAttribute("id")[5];
		if(taskStar.classList.contains("checked")){
			taskStar.classList.remove("checked");
			document.getElementById("taskBox"+k).style.background = "orange";
		}
		else{
			taskStar.classList.add("checked");
			document.getElementById("taskBox"+k).style.background = "#01FF70";
		}

		editTaskDb2(k);
	}
}

function editClick(edit){//Function that allows user to edit the contents of the task

	k=edit.getAttribute("id")[4];
	if(k=="-"){
		k="-"+edit.getAttribute("id")[5];;
	}

	if(document.getElementById("edit"+k).getAttribute("class")=="fa fa-edit fa-2x"){
		document.getElementById("taskText"+k).setAttribute("contentEditable",true);
		document.getElementById("edit"+k).setAttribute("class","fa fa-check-circle fa-2x");	
	}
	else{
		document.getElementById("taskText"+k).setAttribute("contentEditable",false);
		document.getElementById("edit"+k).setAttribute("class","fa fa-edit fa-2x");

		if(edit.getAttribute("id")[4]!="-"){
			editTaskDb(k);
		}
		else{
			editTaskDb2(k);
		}
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

function editTaskDb2(k){//Function to update edited task data in database

	var d = new Date();
	document.getElementById("editTime"+k).innerHTML ="Edited: "+d;	

	var url="updateCollabData.php";
	var params="";
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

	un = document.getElementById("cUSpan"+k).innerHTML;
	unum = document.getElementById("cNSpan"+k).innerHTML;
	params = "un="+un+"&unum="+unum+"&taskNumber="+taskNumber+"&checked="+checked+"&taskText="+taskText+"&starred="+starred+"&editTime="+editTime+"&purpose="+purpose;

	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function delClick(del){//Function to delete a task

	k=del.getAttribute("id")[3];
	if(k=="-"){
		k="-"+del.getAttribute("id")[4];;
	}

	var url="tasks.php";
	var taskNumber = k;
	var purpose = "delete";
	var params = "taskNumber="+taskNumber+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

	document.getElementById("taskBox"+k).remove();

	if(taskRegion.hasChildNodes.length<=0&&(!document.getElementById("nothing1"))){ //To add "Nothing to show"

    	var nothDiv = document.createElement("div");
    	var nothDivText = document.createTextNode("Nothing to show");

    	nothDiv.appendChild(nothDivText);

    	nothDiv.setAttribute("id","nothing1");
    	nothDiv.setAttribute("class","main nothing");

    	document.getElementById("taskRegion").insertBefore(nothDiv,null);
	}

	if(taskRegion2.hasChildNodes.length<=0&&(!document.getElementById("nothing2"))){ //To add "Nothing to show"

    	var nothDiv = document.createElement("div");
    	var nothDivText = document.createTextNode("Nothing to show");

    	nothDiv.appendChild(nothDivText);

    	nothDiv.setAttribute("id","nothing2");
    	nothDiv.setAttribute("class","main nothing");

    	document.getElementById("taskRegion2").insertBefore(nothDiv,null);
	}	

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
	    			createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime,"admin");
	    		}
	    	}
	    	for(i=0;i<data.length;i++){
	    		if(data[i].Checked=="yes"){
	    			createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime,"admin");
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
	    			createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime,"admin");
	    		}
	    	}
	    	for(i=0;i<data.length;i++){
	    		if(data[i].Starred=="no"){
	    			createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime,"admin");
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
	    		createBox(data[i].TaskNumber,data[i].Checked,data[i].TaskText,data[i].Starred,data[i].EditTime,data[i].CreateTime,"admin");
	    	}
	    }
	};
	xmlhttp.open("POST","getTaskData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

initialise();