Element.prototype.remove = function() {  //Function written to remove element easily using .remove()
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function home(){
	window.location = "menu.php";
}

function notes(){
	window.location = "notes.php";
}

function tasks(){
	window.location = "tasks.php";
}

function logout(){
	window.location = "logout.php";
}