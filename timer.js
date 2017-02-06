function loadTimers() 
{
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
	xhr = new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr == null) return;															//NOPE

	var params = "functioncall=getTalkName" 													//set the function the server is supposed to execute by setting this variable's value
   xhr.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object 
   xhr.onreadystatechange = function (e) 														//Create an asynchronous callback to deal with the request when it comes back.
   					{
  							if (xhr.readyState === 4) 
  							{
    							if (xhr.status === 200) 
    							{
      							document.getElementById("talkName").innerHTML = xhr.responseText;	//set the response text to display in the relevant element.
      							console.log(xhr.statusText);
    							}
    						else 
    							{
      							console.error(xhr.statusText);
    							}
  							}
  							//else {console.log(xhr.statusText);}
						};
	xhr.onerror = function (e) 
					{
  						console.error(xhr.statusText);
					};
   xhr.send();     																	//Send the Ajax request to the server with the GET data
   

}

function setTalkName() 
{
	xhr = new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr == null) return;															//NOPE

	var talkSelect = document.getElementById("talkSelect");
	
	var params = "functioncall=setTalkName&talkName=" + talkSelect.options[talkSelect.selectedIndex].value;	//set the function the server is supposed to execute by setting this variable's value
   xhr.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object - Doing this synchronously is a bad idea but fast and easy for now.
	xhr.send();     																	//Send the Ajax request to the server with the GET data
 
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
	
	xhr = new XMLHttpRequest(); //Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr == null) return;		//NOPE

	var params = "functioncall=setTimer"
	//Initiate the XMLHttpRequest object
    xhr.open("GET", "timer.php"+"?"+params, true);

    //Setup the callback function
    xhr.onreadystatechange = StateChange;

    //Send the Ajax request to the server with the GET data
    xhr.send(null);
	
}

function StateChange() //update messages from server
{
    if(xhr.readyState == 4) //4== response complete apparently
    {
		document.getElementById('messageOutput').innerHTML = xhr.responseText;
    }
}

