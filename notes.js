var i=0;
var k=0;
var notes=0;

if (window.XMLHttpRequest) {
  		xmlhttp = new XMLHttpRequest();
} 
 else{
  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

document.getElementById("notesInput").addEventListener("keyup",function(event){//Function to listen for enter keyup at noteInput

	if(event.keyCode==13){//enter keyCode
		newNote();
	}

},false);

function initialise(){//Function to get stored note data in database and to create note boxes

	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	var data = JSON.parse(this.responseText);			
	    	for(i=0;i<data.length;i++){
	    		notes++;
	    		createNoteBox(data[i].NoteNumber,data[i].Title,data[i].NoteText,data[i].EditTime,data[i].CreateTime);
	    	}
	    }
	};
	xmlhttp.open("POST","getNoteData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);
}

function newNote(){//Function to collect current note data to call box creating and data storing function

	var d = new Date();
	var editTime = "Edited: "+d;
	var createTime = "Created: "+d;
	notes++;
	createNoteBox(notes,document.getElementById("titleInput").value,document.getElementById("noteAreaInput").value,editTime,createTime);
	addNoteDb(notes,document.getElementById("titleInput").value,document.getElementById("noteAreaInput").value,editTime,createTime);

	document.getElementById("titleInput").value="";
	document.getElementById("noteAreaInput").value="";
	document.getElementById("titleInput").setAttribute("placeholder","Title");
	document.getElementById("noteAreaInput").setAttribute("placeholder","Notes");
}

function createNoteBox(k,nTitle,nText,nEditTime,nCreateTime){//Function to create all nodes and to add note box

	var noteBoxDiv = document.createElement("div"); 
	var titleDiv = document.createElement("div");
	var noteTextDiv = document.createElement("div");
	var buttonsDiv = document.createElement("div");
	var editSpan = document.createElement("span");
	var imgSpan = document.createElement("span");
	var fileUploadInput = document.createElement("input");
	var delSpan = document.createElement("span");
	var editTimeDiv = document.createElement("div");
	var createTimeDiv = document.createElement("div"); 

	//create text nodes for the above elements
	var titleText = document.createTextNode(nTitle);
	var noteAreaText = document.createTextNode(nText); 
	var editTimeText = document.createTextNode(nEditTime);
	var createTimeText = document.createTextNode(nCreateTime);

	//Appending textnodes
	titleDiv.appendChild(titleText);
	noteTextDiv.appendChild(noteAreaText);
	editTimeDiv.appendChild(editTimeText);
	createTimeDiv.appendChild(createTimeText);

	//Appending childnodes
	noteBoxDiv.appendChild(titleDiv);
	noteBoxDiv.appendChild(noteTextDiv);
	buttonsDiv.appendChild(editSpan);
	buttonsDiv.appendChild(imgSpan);
	buttonsDiv.appendChild(fileUploadInput);
	buttonsDiv.appendChild(delSpan);
	noteBoxDiv.appendChild(buttonsDiv);
	noteBoxDiv.appendChild(editTimeDiv);
	noteBoxDiv.appendChild(createTimeDiv);
	document.getElementById("notesRegion").appendChild(noteBoxDiv);

	//Setting id for elements
	noteBoxDiv.setAttribute("id","noteBox"+k);
	titleDiv.setAttribute("id","title"+k);
	noteTextDiv.setAttribute("id","noteTextArea"+k);
	buttonsDiv.setAttribute("id","buttons"+k);
	editSpan.setAttribute("id","edit"+k);
	imgSpan.setAttribute("id","imgUpload"+k);
	fileUploadInput.setAttribute("id","fileUpload"+k);
	delSpan.setAttribute("id","del"+k);
	editTimeDiv.setAttribute("id","editTime"+k);
	createTimeDiv.setAttribute("id","createTime"+k);


	//Setting classes for elements
	noteBoxDiv.setAttribute("class","noteBoxClass");
	titleDiv.setAttribute("class","titleClass");
	noteTextDiv.setAttribute("class","noteAreaClass");
	buttonsDiv.setAttribute("class","faButtons");
	editSpan.setAttribute("class","fa fa-edit fa-2x");
	imgSpan.setAttribute("class","fa fa-image fa-2x");
	delSpan.setAttribute("class","fa fa-trash-o fa-2x");
	editTimeDiv.setAttribute("class","editTimeClass");
	createTimeDiv.setAttribute("class","createTimeClass");

	//Setting other attributes
	editSpan.setAttribute("onclick","editClick(this)");
	imgSpan.setAttribute("onclick","imgUploadClick(this)");
	fileUploadInput.setAttribute("type","file");
	fileUploadInput.setAttribute("accept","image/*");
	fileUploadInput.setAttribute("style","display:none");
	delSpan.setAttribute("onclick","delClick(this)");

}

function editClick(edit){//Function that allows user to edit the contents of the note

	k=edit.getAttribute("id")[4];

	if(document.getElementById("edit"+k).getAttribute("class")=="fa fa-edit fa-2x"){
		document.getElementById("title"+k).setAttribute("contentEditable",true);
		document.getElementById("noteTextArea"+k).setAttribute("contentEditable",true);
		document.getElementById("edit"+k).setAttribute("class","fa fa-check-circle fa-2x");
	}
	else{
		document.getElementById("title"+k).setAttribute("contentEditable",false);
		document.getElementById("noteTextArea"+k).setAttribute("contentEditable",false);
		document.getElementById("edit"+k).setAttribute("class","fa fa-edit fa-2x");
		editNoteDb(k);
	}	

}

function editNoteDb(k){//Function to update edited note data in database 

	var d = new Date();
	document.getElementById("editTime"+k).innerHTML ="Edited: "+d;	

	var url="notes.php";
	var noteNumber = k;
	var titleText = document.getElementById("title"+k).innerHTML;
	var noteText = document.getElementById("noteTextArea"+k).innerHTML;
	var editTime = document.getElementById("editTime"+k).innerHTML;
	var purpose = "edit";
	var params = "noteNumber="+noteNumber+"&titleText="+titleText+"&noteText="+noteText+"&editTime="+editTime+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function imgUploadClick(imgUp){

	k=imgUp.getAttribute("id")[9];
	document.getElementById("fileUpload"+k).click();

}

function delClick(del){//Function to delete a note

	k=del.getAttribute("id")[3];

	var url="notes.php";
	var noteNumber = k;
	var purpose = "delete";
	var params = "noteNumber="+noteNumber+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

	document.getElementById("noteBox"+k).remove();

}

function addNoteDb(noteNumber,titleText,noteText,editTime,createTime){//Function to store user's newly created note data in database

	var url="notes.php";
	var purpose = "add";
	var params = "noteNumber="+noteNumber+"&titleText="+titleText+"&noteText="+noteText+"&editTime="+editTime+"&createTime="+createTime+"&purpose="+purpose;
	
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

initialise();