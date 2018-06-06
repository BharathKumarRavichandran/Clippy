var k=0;
var notes=0;
var currentNotes=0;

document.getElementById("notesInput").addEventListener("keyup",function(event){

	if(event.keyCode==13){
		newNote();
	}

},false);

function newNote(){
	notes++;
	currentNotes++;
	createNoteBox();
}

function createNoteBox(){

	var noteBoxDiv = document.createElement("div"); 
	var titleDiv = document.createElement("div");
	var noteTextDiv = document.createElement("div");
	var buttonsDiv = document.createElement("div");
	var editSpan = document.createElement("span");
	var delSpan = document.createElement("span");

	//create text nodes for the above elements
	var titleText = document.createTextNode(document.getElementById("titleInput").value);
	var noteAreaText = document.createTextNode(document.getElementById("noteAreaInput").value); 

	//Appending textnodes
	titleDiv.appendChild(titleText);
	noteTextDiv.appendChild(noteAreaText);

	//Appending childnodes
	noteBoxDiv.appendChild(titleDiv);
	noteBoxDiv.appendChild(noteTextDiv);
	buttonsDiv.appendChild(editSpan);
	buttonsDiv.appendChild(delSpan);
	noteBoxDiv.appendChild(buttonsDiv);
	document.getElementById("notesRegion").appendChild(noteBoxDiv);

	//Setting id for elements
	noteBoxDiv.setAttribute("id","noteBox"+notes);
	titleDiv.setAttribute("id","title"+notes);
	noteTextDiv.setAttribute("id","noteTextArea"+notes);
	buttonsDiv.setAttribute("id","buttons"+notes);
	editSpan.setAttribute("id","edit"+notes);
	delSpan.setAttribute("id","del"+notes);

	//Setting classes for elements
	editSpan.setAttribute("class","fa fa-edit");
	delSpan.setAttribute("class","fa fa-trash-o");

	//Setting other attributes
	editSpan.setAttribute("onclick","editClick(this)");
	delSpan.setAttribute("onclick","delClick(this)");

	addNoteDb();

	document.getElementById("titleInput").value="";
	document.getElementById("noteAreaInput").value="";
	document.getElementById("titleInput").setAttribute("placeholder","Title");
	document.getElementById("noteAreaInput").setAttribute("placeholder","Notes");
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
	var purpose = "edit";
	var params = "noteNumber="+noteNumber+"&titleText="+titleText+"&noteText="+noteText+"&purpose="+purpose;
		
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

	var url="notes.php";
	var noteNumber = notes;
	var titleText = document.getElementById("titleInput").value;
	var noteText = document.getElementById("noteAreaInput").value;
	var purpose = "add";
	var params = "noteNumber="+noteNumber+"&titleText="+titleText+"&noteText="+noteText+"&purpose="+purpose;
	
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}