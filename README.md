# Clippy

Clippy is a simple web app to store notes and ToDo-lists.
This project uses PHP, Javascript, HTML, CSS and AJAX requests.

## Features 

* App with secure login and sign up options.
* Users can create to-do lists and check out items they have completed, and uncheck them too.
* Feature to create notes with a title,description and images for each note.
* Feature to record time of creation and last edit time of the notes and lists.
* Sorting features based on time, level of importance, yet to do tasks of the note and lists.
* Users can add labels and view based on labels.
* Feature to allow multiple collaborators for a list, users can add other users, delete them as per their wish.

----

**Framework used : PHP on Apache**  
**Database 	 : MySQL**  
**Server	 : Apache** 

----

**Connections to database**
* Enter your username and password of mySQL database in connect.php
```html
define ('DB_USER','Your-Username');
```
```html
define ('DB_PASSWORD','Your-Password');
```
replace the string "Your-Username" and "Your-Password" with your own username and password of mySQL database.

----

**Photo Uploading Directory**

* Create a folder "uploads" in folder Clippy to upload pictures and photos in notes.
* All the pictures uploaded will be uploaded in the uploads folder.s

----

#### How to run :

* Clone/download this repository.
* Copy the folder Clippy to your localhost directory.
* Start your XAMPP/WAMP or any apache distribution software.
* Start your apache server and mySQL modules.
* Open up your browser. Type http://localhost/Clippy/ as the URL.
* Click on *welcome.html*

----

## Built With

* [PHP](http://php.net/)
* [Vanilla JS](http://vanilla-js.com/)
* [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)
* [HTML](https://www.w3.org/html/)
* [CSS](https://www.w3.org/Style/CSS/)