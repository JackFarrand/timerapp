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
	xhr_talkName= new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr_talkName== null) return;															//NOPE

	var params = "functioncall=getTalkName" 													//set the function the server is supposed to execute by setting this variable's value
   xhr_talkName.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object 
   xhr_talkName.onreadystatechange = function (e) 														//Create an asynchronous callback to deal with the request when it comes back.
   					{
  							if (xhr_talkName.readyState === 4) 
  							{
    							if (xhr_talkName.status === 200) 
    							{
      							document.getElementById("talkName").innerHTML = xhr_talkName.responseText;	//set the response text to display in the relevant element.
      							console.log(xhr_talkName.statusText);
    							}
    						else 
    							{
      							console.error(xhr_talkName.statusText);
    							}
  							}

						};;
   xhr_talkName.send();     																	//Send the Ajax request to the server with the GET data
   

}

function setTalkName() 
{
	xhr_talkName= new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr_talkName== null) return;															//NOPE

	var talkSelect = document.getElementById("talkSelect");
	
	var params = "functioncall=setTalkName&talkName=" + talkSelect.options[talkSelect.selectedIndex].value;	//set the function the server is supposed to execute by setting this variable's value
   xhr_talkName.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object - Doing this synchronously is a bad idea but fast and easy for now.
	xhr_talkName.send();     																	//Send the Ajax request to the server with the GET data
 
}

function updateCountDownTimer() 
{
	var d = new Date();
   document.getElementById("timer_down").innerHTML = d.toLocaleTimeString();
}
/*
function updateCountUpTimer() 
{
	var d = new Date();
   document.getElementById("timer_up").innerHTML = d.toLocaleTimeString();
}
*/
function getMessages() 
{
	//Todo, display messages from host.
	
	xhr_messages = new XMLHttpRequest(); //Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr_messages == null) return;		//NOPE

	var params = "functioncall=getMessages"
	//Initiate the XMLHttpRequest object
    xhr_messages.open("GET", "timer.php"+"?"+params, true);

    //Setup the callback function
    xhr_messages.onreadystatechange = function (e) 														//Create an asynchronous callback to deal with the request when it comes back.
   					{
  							if (xhr_messages.readyState === 4) 
  							{
    							if (xhr_messages.status === 200) 
    							{
									document.getElementById('messageOutput').innerHTML = xhr_messages.responseText;
    							}
    						else 
    							{
      							console.error(xhr_messages.statusText);
    							}
  							}
						};;

    //Send the Ajax request to the server with the GET data
    xhr_messages.send(null);
	
}

function sendMessage() 
{
	xhr_Messages= new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr_Messages== null) return;															//NOPE

	var messageInput = document.getElementById("messageSendInput");
	
	var params = "functioncall=sendMessage&message=" + messageInput.value;	//set the function the server is supposed to execute by setting this variable's value
   xhr_Messages.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object - Doing this synchronously is a bad idea but fast and easy for now.
	xhr_Messages.send();     	
}