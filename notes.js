var k=0;
var notes=0;
var currentNotes=0;
var noteData;

document.getElementById("notesInput").addEventListener("keyup",function(event){

	if(event.keyCode==13){
		newNote();
	}

},false);

function newNote(){
	notes++;
	currentNotes++;
	createNoteBox(notes);
	addNoteDb();

	document.getElementById("titleInput").value="";
	document.getElementById("noteAreaInput").value="";
	document.getElementById("titleInput").setAttribute("placeholder","Title");
	document.getElementById("noteAreaInput").setAttribute("placeholder","Notes");
}

function createNoteBox(k){

	var d = new Date();

	var noteBoxDiv = document.createElement("div"); 
	var titleDiv = document.createElement("div");
	var noteTextDiv = document.createElement("div");
	var buttonsDiv = document.createElement("div");
	var editSpan = document.createElement("span");
	var delSpan = document.createElement("span");
	var editTimeDiv = document.createElement("div");
	var createTimeDiv = document.createElement("div"); 

	//create text nodes for the above elements
	var titleText = document.createTextNode(document.getElementById("titleInput").value);
	var noteAreaText = document.createTextNode(document.getElementById("noteAreaInput").value); 
	var editTimeText = document.createTextNode("Edited: "+d);
	var createTimeText = document.createTextNode("Created :"+d);

	//Appending textnodes
	titleDiv.appendChild(titleText);
	noteTextDiv.appendChild(noteAreaText);
	editTimeDiv.appendChild(editTimeText);
	createTimeDiv.appendChild(createTimeText);

	//Appending childnodes
	noteBoxDiv.appendChild(titleDiv);
	noteBoxDiv.appendChild(noteTextDiv);
	buttonsDiv.appendChild(editSpan);
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
	delSpan.setAttribute("id","del"+k);
	editTimeDiv.setAttribute("id","editTime"+k);
	createTimeDiv.setAttribute("id","createTime"+k);


	//Setting classes for elements
	editSpan.setAttribute("class","fa fa-edit");
	delSpan.setAttribute("class","fa fa-trash-o");

	//Setting other attributes
	editSpan.setAttribute("onclick","editClick(this)");
	delSpan.setAttribute("onclick","delClick(this)");

}

function editClick(edit){

	k=edit.getAttribute("id")[4];

	if(document.getElementById("edit"+k).getAttribute("class")=="fa fa-edit"){
		document.getElementById("title"+k).setAttribute("contentEditable",true);
		document.getElementById("noteTextArea"+k).setAttribute("contentEditable",true);
		document.getElementById("edit"+k).setAttribute("class","fa fa-check-circle");
	}
	else{
		document.getElementById("title"+k).setAttribute("contentEditable",false);
		document.getElementById("noteTextArea"+k).setAttribute("contentEditable",false);
		document.getElementById("edit"+k).setAttribute("class","fa fa-edit");
		editNoteDb(k);
	}	

}

function editNoteDb(k){

	var d = new Date();
	document.getElementById("editTime"+k).innerHTML ="Edited: "+d;	

	if (window.XMLHttpRequest) {
  			xmlhttp = new XMLHttpRequest();
	 } 
	else{
	   	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

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

function delClick(del){

	k=del.getAttribute("id")[3];

	if (window.XMLHttpRequest) {
  		xmlhttp = new XMLHttpRequest();
	} 
	else{
	   	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var url="notes.php";
	var noteNumber = k;
	var purpose = "delete";
	var params = "noteNumber="+noteNumber+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

	document.getElementById("noteBox"+k).remove();
	currentNotes--;

}

function addNoteDb(){

	if (window.XMLHttpRequest) {
  		xmlhttp = new XMLHttpRequest();
 	} 
 	else{
    	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var d = new Date();
	var url="notes.php";
	var noteNumber = notes;
	var titleText = document.getElementById("titleInput").value;
	var noteText = document.getElementById("noteAreaInput").value;
	var editTime = "Edited: "+d;
	var createTime = "Created: "+d;
	var purpose = "add";
	var params = "noteNumber="+noteNumber+"&titleText="+titleText+"&noteText="+noteText+"&editTime="+editTime+"&createTime="+createTime+"&purpose="+purpose;
	
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

getData();