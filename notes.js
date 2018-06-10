var i=0;
var j=0;
var t=0;
var k=0;
var notes=0;
var data;
var exist;
var allowed=false;
var labelTextInit ="";

var labels = new Array();
var labelArrayInit = new Array();
var labelArray = new Array();
var imgArray = new Array();

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
	    	data = JSON.parse(this.responseText);			
	    	for(i=0;i<data.length;i++){
	    		notes++;
	    		labelArray[data[i].NoteNumber]=0;
	    		imgArray[data[i].NoteNumber]=0;
	    		createNoteBox(data[i].NoteNumber,data[i].Title,data[i].NoteText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
	    		labelInit(data[i].NoteNumber,data[i].Labels);
	    		imgsInit(data[i].NoteNumber,data[i].ImgPath);
	    	}	
	    	labelNavbarAppend();
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
		createNoteBox(notes,document.getElementById("titleInput").value,document.getElementById("noteAreaInput").value,"no",editTime,createTime);
		addNoteDb(notes,document.getElementById("titleInput").value,document.getElementById("noteAreaInput").value,"no",editTime,createTime);

		document.getElementById("titleInput").value="";
		document.getElementById("noteAreaInput").value="";
		document.getElementById("titleInput").setAttribute("placeholder","Title");
		document.getElementById("noteAreaInput").setAttribute("placeholder","Notes");
	}
}

function createNoteBox(k,nTitle,nText,nStarred,nEditTime,nCreateTime){//Function to create all nodes and to add note box

	labelArray[k]=0;

	var noteBoxDiv = document.createElement("div"); 
	var titleDiv = document.createElement("div");
	var noteTextDiv = document.createElement("div");
	var buttonsDiv = document.createElement("div");
	var starSpan = document.createElement("span"); 
	var editSpan = document.createElement("span");
	var form = document.createElement("form");
	var imgSpan = document.createElement("span");
	var fileUploadInput = document.createElement("input");
	var submitInput = document.createElement("input");
	var delSpan = document.createElement("span");
	var labAddDiv = document.createElement("div");
	var labIn = document.createElement("input");
	var addLabSpan = document.createElement("span");
	var labelDiv = document.createElement("div");
	var imgDiv = document.createElement("div");
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
	buttonsDiv.appendChild(starSpan);
	buttonsDiv.appendChild(editSpan);
	buttonsDiv.appendChild(delSpan);
	form.appendChild(imgSpan);
	form.appendChild(fileUploadInput);
	form.appendChild(submitInput);
	buttonsDiv.appendChild(form);
	noteBoxDiv.appendChild(buttonsDiv);
	noteBoxDiv.appendChild(imgDiv);
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
	starSpan.setAttribute("id","star"+k);
	editSpan.setAttribute("id","edit"+k);
	form.setAttribute("id","form"+k);
	imgSpan.setAttribute("id","imgUpload"+k);
	fileUploadInput.setAttribute("id","fileToUpload"+k);
	submitInput.setAttribute("id","submitInput"+k);
	delSpan.setAttribute("id","del"+k);
	labIn.setAttribute("id","labIn"+k);
	addLabSpan.setAttribute("id","addLabel"+k);
	labelDiv.setAttribute("id","labelDiv"+k);
	imgDiv.setAttribute("id","imgDiv"+k);
	editTimeDiv.setAttribute("id","editTime"+k);
	createTimeDiv.setAttribute("id","createTime"+k);


	//Setting classes for elements
	noteBoxDiv.setAttribute("class","noteBoxClass");
	titleDiv.setAttribute("class","titleClass");
	noteTextDiv.setAttribute("class","noteAreaClass");
	buttonsDiv.setAttribute("class","faButtons");
	starSpan.setAttribute("class","fa fa-star fa-2x");
	editSpan.setAttribute("class","fa fa-edit fa-2x");
	imgSpan.setAttribute("class","fa fa-image fa-2x");
	delSpan.setAttribute("class","fa fa-trash-o fa-2x");
	labAddDiv.setAttribute("class","labAddClass");
	labIn.setAttribute("class","labInClass");
	addLabSpan.setAttribute("class","fa fa-plus-square fa-1x");
	labelDiv.setAttribute("class","labelDivClass");
	imgDiv.setAttribute("class","imgDivClass");
	editTimeDiv.setAttribute("class","editTimeClass");
	createTimeDiv.setAttribute("class","createTimeClass");

	//Setting other attributes
	starSpan.setAttribute("onclick","starClick(this)");
	editSpan.setAttribute("onclick","editClick(this)");
	form.setAttribute("action","notes.php");
	form.setAttribute("method","post");
	form.setAttribute("enctype","multipart/form-data");
	imgSpan.setAttribute("onclick","imgUploadClick(this)");
	fileUploadInput.setAttribute("type","file");
	fileUploadInput.setAttribute("name","fileToUpload");
	fileUploadInput.setAttribute("accept","image/*");
	fileUploadInput.setAttribute("style","display:none");
	submitInput.setAttribute("type","submit");
	submitInput.setAttribute("value","Upload"+k);
	submitInput.setAttribute("name","submit");
	submitInput.setAttribute("style","display:none");
	delSpan.setAttribute("onclick","delClick(this)");
	labIn.setAttribute("type","text");
	labIn.setAttribute("name","label");
	labIn.setAttribute("placeholder","New Label");
	labIn.setAttribute("onkeyup","newLabel(this,event,5)");
	addLabSpan.setAttribute("onclick","newLabel(this,event,8)");

	if(nStarred=="yes"){
		starSpan.classList.add("checked");
		document.getElementById("noteBox"+k).style.background = "#01FF70";
	}

}

function starClick(y){

	var noteStar;
	k=y.getAttribute("id")[4];

	if(y.classList.contains("checked")){
		y.classList.remove("checked");
		document.getElementById("noteBox"+k).style.background = "orange";
		noteStar="no";
	}
	else{
		y.classList.add("checked");
		document.getElementById("noteBox"+k).style.background = "#01FF70";
		noteStar="yes";
	}

	var d = new Date();
	document.getElementById("editTime"+k).innerHTML ="Edited: "+d;	

	var url="notes.php";
	var noteNumber = k;
	var editTime = document.getElementById("editTime"+k).innerHTML;
	var purpose = "starEdit";
	var params = "noteNumber="+noteNumber+"&noteStar="+noteStar+"&editTime="+editTime+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

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
	document.getElementById("fileToUpload"+k).click();

	document.getElementById("submitInput"+k).setAttribute("style","display:inline");

	document.getElementById("fileToUpload"+k).onchange = function() {
    	document.getElementById("form"+k).submit();
	};


}

function delClick(del){//Function to delete a note

	k=del.getAttribute("id")[3];

	delete labels[k];

	var url="notes.php";
	var noteNumber = k;
	var purpose = "delete";
	var params = "noteNumber="+noteNumber+"&purpose="+purpose;
		
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

	document.getElementById("noteBox"+k).remove();

}

function addNoteDb(noteNumber,titleText,noteText,noteStar,editTime,createTime){//Function to store user's newly created note data in database

	var url="notes.php";
	var purpose = "add";
	var params = "noteNumber="+noteNumber+"&titleText="+titleText+"&noteText="+noteText+"&noteStar="+noteStar+"&editTime="+editTime+"&createTime="+createTime+"&purpose="+purpose;
	
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function labelInit(k,labelTextFull){

	labelTextInit+=labelTextFull;//Adding labels of all the notes for appending labels to navbar 
	
	labels[k] = new Array();
	var labelTextArr = new Array();
	labelTextArr = labelTextFull.split(" ");

	for(j=0;j<labelTextArr.length-1;j++){

		labelText = labelTextArr[j];
		labels[k].push(labelText);

		labelArray[k]++;
		var labSpan = document.createElement("span");
		var labelText = document.createTextNode(labelText);

		labSpan.appendChild(labelText);
		document.getElementById("labelDiv"+k).appendChild(labSpan);

		labSpan.setAttribute("id",k+"label"+labelArray[k]);
		labSpan.setAttribute("class","labSpanClass");	

	}

}

function newLabel(y,event,l){

	k = y.getAttribute("id")[l];
	var text = document.getElementById("labIn"+k).value;
	var exists = /*labelAlreadyExistsNote(k,text)*/false;

	if(((event.keyCode==13&&l==5)||l==8)&&(text!="")&&(exists==false)){ //enter keyCode=13

		labels[k] = ( typeof labels[k] != 'undefined' && labels[k] instanceof Array ) ? labels[k] : [];
		labels[k].push(text);
		labelArray[k]++;

		var labSpan = document.createElement("span");	
		var labelText = document.createTextNode(document.getElementById("labIn"+k).value);

		labSpan.appendChild(labelText);
		document.getElementById("labelDiv"+k).appendChild(labSpan);

		labSpan.setAttribute("id",k+"label"+labelArray[k]);
		labSpan.setAttribute("class","labSpanClass");

		var labelLink = document.createElement("a");
		var labelLinkText = document.createTextNode(document.getElementById("labIn"+k).value);

		labelLink.appendChild(labelLinkText);
		document.getElementById("sidenav").appendChild(labelLink);

		labelLink.setAttribute("class","sidenavlinks labelLinks");
		
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

function labelAlreadyExistsNote(k,text){

	var labelTextArray = new Array();
	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	var data = JSON.parse(this.responseText);

	    	for(i=0;i<data.length;i++){

	    		if(data[i].NoteNumber==k){

	    			labelTextFull = data[i].Labels;
	    			labelTextArray = labelTextFull.split(" ");

	    			for(j=0;j<labelTextArray.length-1;j++){

	    				if(text==labelTextArray[j]){
	    					return true;
	    				}
	    			}
	    		}
	    		return false;
	    	}	
	    }
	};
	xmlhttp.open("POST","getNoteData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);
}

function labelNavbarAppend(){

	labelArrayInit = labelTextInit.split(" ");
	var labLinkText; 

	for(i=0;i<labelArrayInit.length-1;i++){

		labLinkText = labelArrayInit[i];

		if(labLinkText!=""){

			var labelLink = document.createElement("a");
			var labelLinkText = document.createTextNode(labLinkText);

			labelLink.appendChild(labelLinkText);
			document.getElementById("sidenav").appendChild(labelLink);

			labelLink.setAttribute("class","sidenavlinks labelLinks");
			labelLink.setAttribute("onclick","labelView(this)");
		}	
	}
}

function labelView(y){
	
	if(document.getElementById("noteLinkId").classList.contains("active")){
		document.getElementById("noteLinkId").classList.remove("active");
		document.getElementById("noteLinkId").setAttribute("onclick","note()");
	}

	var children = document.getElementById("sidenav").children;
	for(t=0;t<children.length;t++){
		if(children[t].classList.contains("active")){
			children[t].classList.remove("active");
		}
	} 

	y.classList.add("active");

	while(notesRegion.firstChild){ //To remove the childs of notesRegion
    	notesRegion.removeChild(notesRegion.firstChild);
	}

	var labelLinkText = y.innerHTML;

	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(this.readyState==4&&this.status==200){
		    data = JSON.parse(this.responseText);	
		    for(t=1;t<=notes;t++){
		
				if(typeof(labels[t])!=='undefined'&&labels[t].length>0){
					exist = true;
				}
				else{
					exist = false;
				}

				if(exist==true){
					for(j=0;j<labels[t].length;j++){
						if(labelLinkText==labels[t][j]){
							allowed = true;
						}
						if(allowed==true){
							createNoteBox(data[t-1].NoteNumber,data[t-1].Title,data[t-1].NoteText,data[t-1].Starred,data[t-1].EditTime,data[t-1].CreateTime);
				    		labelInit(data[t-1].NoteNumber,data[t-1].Labels);
			    			imgsInit(data[t-1].NoteNumber,data[t-1].ImgPath);
			    		}	
					}
				}
			}
		}	
	};
	xmlhttp.open("POST","getNoteData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function imgsInit(k,filePathFull){//Function that attachs images to notebox

	var filePathArray = new Array();
	filePathArray = filePathFull.split(" ");

	for(t=0;t<filePathArray.length-1;t++){
		
		imgArray[k]++;

		filePath = filePathArray[t];

		if(filePath.width!=0){

			var img = document.createElement("img");
			document.getElementById("imgDiv"+k).appendChild(img);

			img.setAttribute("src",filePath);
			img.setAttribute("id",k+"img"+imgArray[k]);
			img.setAttribute("class","imgClass");	
			img.setAttribute("alt","note");

		}	
		
	}
}

function sortClick(y){

	while(notesRegion.firstChild) { //To remove the childs of notesRegion
    	notesRegion.removeChild(notesRegion.firstChild);
	}

	if(document.getElementById(y.getAttribute("id")).value=="importance"){
		sortBoxImp();
	}

	else if(document.getElementById(y.getAttribute("id")).value=="time"){
		sortBoxTime();
	}
}

function sortBoxImp(){

	var params="";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	var data = JSON.parse(this.responseText);			
	    	
	    	for(i=0;i<data.length;i++){
	    		if(data[i].Starred=="yes"){
		    		createNoteBox(data[i].NoteNumber,data[i].Title,data[i].NoteText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
		    		labelInit(data[i].NoteNumber,data[i].Labels);
		    	}	
	    	}	

	    	for(i=0;i<data.length;i++){
	    		if(data[i].Starred=="no"){
		    		createNoteBox(data[i].NoteNumber,data[i].Title,data[i].NoteText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
		    		labelInit(data[i].NoteNumber,data[i].Labels);
		    	}	
	    	}	
	    }
	};
	xmlhttp.open("POST","getNoteData.php",true);
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
		    	createNoteBox(data[i].NoteNumber,data[i].Title,data[i].NoteText,data[i].Starred,data[i].EditTime,data[i].CreateTime);
		    	labelInit(data[i].NoteNumber,data[i].Labels);	
	    	}		
	    }
	};
	xmlhttp.open("POST","getNoteData.php",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

initialise();