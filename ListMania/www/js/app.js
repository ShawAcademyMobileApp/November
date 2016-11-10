/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */


// For improved debugging and maintenance of your app, it is highly
// recommended that you separate your JavaScript from your HTML files.
// Use the addEventListener() method to associate events with DOM elements.

// For example:

// var el ;
// el = document.getElementById("id_myButton") ;
// el.addEventListener("click", myEventHandler, false) ;



// The function below is an example of the best way to "start" your app.
// This example is calling the standard Cordova "hide splashscreen" function.
// You can add other code to it or add additional functions that are triggered
// by the same event or other events.

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
}
document.addEventListener("app.Ready", onAppReady, false) ;
// document.addEventListener("deviceready", onAppReady, false) ;
// document.addEventListener("onload", onAppReady, false) ;

// The app.Ready event shown above is generated by the init-dev.js file; it
// unifies a variety of common "ready" events. See the init-dev.js file for
// more details. You can use a different event to start your app, instead of
// this event. A few examples are shown in the sample code above. If you are
// using Cordova plugins you need to either use this app.Ready event or the
// standard Crordova deviceready event. Others will either not work or will
// work poorly.

// NOTE: change "dev.LOG" in "init-dev.js" to "true" to enable some console.log
// messages that can help you debug Cordova app initialization issues.
var count = 0;

function getArray()
{
    var taskList = [];
    var tasks = localStorage.getItem('itemList');
    if(tasks != null)
        {
            //Code Runs if the Condition is met
            taskList  =JSON.parse(tasks);
        }
    return taskList;
}

//Display Dynamic HTML Lists
//UL & LI Tags
//Remove Button Displays
function displayList()
{
    var taskList = getArray();
    //Variable for creating & storing dynamic HTML Elements
    var taskListContent = "<ul>";

    //Create LI Tags and Loop through the Array
    for(var i=0; i < taskList.length; i++)
    {
        taskListContent += "<li>"+taskList[i]+"<button class='remove' id='"+i+"'>Remove</button></li>";
    }
    taskListContent += "</ul>";
    //Replace the HTML Elements inside of the id="TaskListValue"
    document.getElementById("TaskListValue").innerHTML = taskListContent;

    var btnArray = document.getElementsByClassName("remove");
    for(i =0; i < btnArray.length; i++)
    {
        btnArray[i].addEventListener('click', removeTask);
    }


}

//Add in the Tasks from the input field in our HTML File
function addTask() 
{
    var taskList = getArray();
    //Create a Variable to hold the Input Value
    var task = document.getElementById("inputValue").value;
    //Clear off the Input Value after saving it in the task variable
    document.getElementById("inputValue").value = "";
    //Add the task into our Array
    taskList.push(task);
    localStorage.setItem('itemList', JSON.stringify(taskList));
    //Display the latest list of tasks
    displayList();
}
function removeTask()
{
    //Remove Tasks from the Array
    var rID = this.getAttribute("id");
    var taskList = getArray();
    navigator.notification.confirm("You're Awesome!", beep,taskList[rID],'Complete');
    taskList.splice(rID, 1);
    localStorage.setItem('itemList', JSON.stringify(taskList));
    
    displayList();              

}
function beep()
{
    count++;
    var array = getArray();
    if(array.length < 1)
        {
            navigator.notification.alert("All Tasks Completed",null, count+" Tasks Completed", "Do More!");
        }
}


displayList();
document.getElementById("Add").addEventListener("click", addTask);
