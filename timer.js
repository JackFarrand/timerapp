function loadTimers() 
{
	setTalkName();
	window.setInterval(updateTimers, 1000);
	
}

function updateTimers() 
{
	updateCountDownTimer();
	updateCountUpTimer();
	updateTalkName();
	getMessages();
}

function updateTalkName() 
{
	xmlHttpRequest = new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xmlHttpRequest == null) return;															//NOPE

	var params = "functioncall=getTalkName" 													//set the function the server is supposed to execute by setting this variable's value
   xmlHttpRequest.open("GET", "timer.php"+"?"+params, false);							//Initiate the XMLHttpRequest object - Doing this synchronously is a bad idea but fast and easy for now.
   xmlHttpRequest.send();     																	//Send the Ajax request to the server with the GET data
   
	document.getElementById("talkName").innerHTML = xmlHttpRequest.responseText;	//set the response text to display in the relevant element.
}

function setTalkName() 
{
	xmlHttpRequest = new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xmlHttpRequest == null) return;															//NOPE

	var params = "functioncall=setTalkName&talkName=Dynamic%20Talk%20Name" 													//set the function the server is supposed to execute by setting this variable's value
   xmlHttpRequest.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object - Doing this synchronously is a bad idea but fast and easy for now.
	xmlHttpRequest.send();     																	//Send the Ajax request to the server with the GET data
 
}

function updateCountDownTimer() 
{
	var d = new Date();
   document.getElementById("timer_down").innerHTML = d.toLocaleTimeString();
}

function updateCountUpTimer() 
{
	var d = new Date();
   document.getElementById("timer_up").innerHTML = d.toLocaleTimeString();
}

function getMessages() 
{
	//Todo, display messages from host.
	
	xmlHttpRequest = new XMLHttpRequest(); //Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xmlHttpRequest == null) return;		//NOPE

	var params = "functioncall=setTimer"
	//Initiate the XMLHttpRequest object
    xmlHttpRequest.open("GET", "timer.php"+"?"+params, true);

    //Setup the callback function
    xmlHttpRequest.onreadystatechange = StateChange;

    //Send the Ajax request to the server with the GET data
    xmlHttpRequest.send(null);
	
}

function StateChange()
{
    if(xmlHttpRequest.readyState == 4) //4== response complete apparently
    {
		document.getElementById('messageOutput').innerHTML = xmlHttpRequest.responseText;
    }
}

