function loadTimers() 
{
	window.setInterval(updateTimers, 1000);
}

function updateTimers() 
{
	updateCountDownTimer();
	//updateCountUpTimer();
	getMessages();
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

	xmlHttpRequest.data = "functioncall=setTimer"
	//Initiate the XMLHttpRequest object
    xmlHttpRequest.open("GET", "timer.php", true);

    //Setup the callback function
    xmlHttpRequest.onreadystatechange = StateChange;

    //Send the Ajax request to the server with the GET data
    xmlHttpRequest.send(null);
	
}

function StateChange()
{
    if(xmlHttpRequest.readyState == 4) //4== response complete apparently
    {
		document.getElementById('timer_up').innerHTML = xmlHttpRequest.responseText;
    }
}

