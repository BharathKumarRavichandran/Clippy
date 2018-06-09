var i=0;
var k=0;
var notes=0;

var labelArray = new Array();

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
	    		labelArray[data[i].NoteNumber]=0;
	    		createNoteBox(data[i].NoteNumber,data[i].Title,data[i].NoteText,data[i].EditTime,data[i].CreateTime);
	    		labelInit(data[i].NoteNumber,data[i].Labels);
	    	}	
	    }
	};
	xmlhttp.open("POST","getNoteData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);
}

function newNote(){//Function to collect current note data to call box creating and data storing function

	if((document.getElementById("titleInput").value!="")&&(document.getElementById("noteAreaInput").value!="")){
		
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
}

function createNoteBox(k,nTitle,nText,nEditTime,nCreateTime){//Function to create all nodes and to add note box

	labelArray[k]=0;

	var noteBoxDiv = document.createElement("div"); 
	var titleDiv = document.createElement("div");
	var noteTextDiv = document.createElement("div");
	var buttonsDiv = document.createElement("div");
	var editSpan = document.createElement("span");
	var imgSpan = document.createElement("span");
	var fileUploadInput = document.createElement("input");
	var delSpan = document.createElement("span");
	var labAddDiv = document.createElement("div");
	var labIn = document.createElement("input");
	var addLabSpan = document.createElement("span");
	var labelDiv = document.createElement("div");
	var editTimeDiv = document.createElement("div");
	var createTimeDiv = document.createElement("div"); 

	//create text nodes for the above elements
	var titleText = document.createTextNode(nTitle);
	var noteAreaText = document.createTextNode(nText); 
	var labelText = document.createTextNode("Add a new label : ");
	var editTimeText = document.createTextNode(nEditTime);
	var createTimeText = document.createTextNode(nCreateTime);

	//Appending textnodes
	titleDiv.appendChild(titleText);
	noteTextDiv.appendChild(noteAreaText);
	labAddDiv.appendChild(labelText);
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
	labAddDiv.appendChild(labIn);
	labAddDiv.appendChild(addLabSpan);
	noteBoxDiv.appendChild(labAddDiv);
	noteBoxDiv.appendChild(labelDiv);
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
	labIn.setAttribute("id","labIn"+k);
	addLabSpan.setAttribute("id","addLabel"+k);
	labelDiv.setAttribute("id","labelDiv"+k);
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
	labAddDiv.setAttribute("class","labAddClass");
	labIn.setAttribute("class","labInClass");
	addLabSpan.setAttribute("class","fa fa-plus-square fa-1x");
	labelDiv.setAttribute("class","labelDivClass");
	editTimeDiv.setAttribute("class","editTimeClass");
	createTimeDiv.setAttribute("class","createTimeClass");

	//Setting other attributes
	editSpan.setAttribute("onclick","editClick(this)");
	imgSpan.setAttribute("onclick","imgUploadClick(this)");
	fileUploadInput.setAttribute("type","file");
	fileUploadInput.setAttribute("accept","image/*");
	fileUploadInput.setAttribute("style","display:none");
	delSpan.setAttribute("onclick","delClick(this)");
	labIn.setAttribute("type","text");
	labIn.setAttribute("name","label");
	labIn.setAttribute("placeholder","New Label");
	labIn.setAttribute("onkeyup","newLabel(this,event,5)");
	addLabSpan.setAttribute("onclick","newLabel(this,event,8)");

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

function labelInit(k,labelTextFull){
	
	

	var labelTextArray = labelTextFull.split(" ");

	for(i=0;i<labelTextArray.length-1;i++){
		
		labelText = labelTextArray[i];

		labelArray[k]++;
		var labSpan = document.createElement("span");
		var labelText = document.createTextNode(labelText);

		labSpan.appendChild(labelText);
		document.getElementById("labelDiv"+k).appendChild(labSpan);

		labSpan.setAttribute("id",k+"label"+labelArray[k]);
		labSpan.setAttribute("class","labSpanClass");	
		
	}


	document.getElementById("labIn"+k).value="";
	document.getElementById("labIn"+k).setAttribute("placeholder","New Label");

}

function newLabel(y,event,l){

	k = y.getAttribute("id")[l];

	if(((event.keyCode==13&&l==5)||l==8)&&(document.getElementById("labIn"+k).value!=="")){ //enter keyCode=13

		labelArray[k]++;

		var labSpan = document.createElement("span");
		var labelText = document.createTextNode(document.getElementById("labIn"+k).value);

		labSpan.appendChild(labelText);
		document.getElementById("labelDiv"+k).appendChild(labSpan);

		labSpan.setAttribute("id",k+"label"+labelArray[k]);
		labSpan.setAttribute("class","labSpanClass");
		
		addLabelDb(k);	

		document.getElementById("labIn"+k).value="";
		document.getElementById("labIn"+k).setAttribute("placeholder","New Label");

	}
	
}

function addLabelDb(k){

	var url="notes.php";
	var purpose = "labelAdd";
	var label = document.getElementById("labIn"+k).value+" ";
	var params = "noteNumber="+k+"&label="+label+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

initialise();