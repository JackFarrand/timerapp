//copyright Jack Farrand 2017
/*TODO:
	Add bell to final timer as an option
	Add flashing text to last minute/30 seconds
	*/

var talkLengths = 
[3, 10, 8, 4, 2, 4, 6, 15, 5, 10, 30, 3];
/*
<select id="talkSelect" onchange="setTalkName()">
  		<option>Opening Comments</option>
  		
  		<option>Treasures from God's Word</option>
  		<option>Digging for Spiritual Gems</option>
  		
  		<option>Bible Reading</option>
  		<option>Initial Call</option>
  		<option>Return Visit</option>
  		<option>Bible Study</option>
  		<option>This Month's Presentations</option>
  		
  		<option>Living as Christians Talk 1</option>
  		<option>Living as Christians Talk 2</option>
  		<option>Congregation Bible Study</option>
  		<option>Closing Review & Preview</option>
  	</select> */

function loadTimers() 
{
	window.setInterval(updateTimers, 1000);	
}

function updateTimers() 
{
	updateCountDownTimer();
//	updateCountUpTimer();
	updateTalkName();
	getMessages();
}

function updateTalkName() 
{
	xhr_talkName= new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr_talkName== null) return;															//NOPE

	var params = "functioncall=getTalkName" 													//set the function the server is supposed to execute by setting this variable's value
   xhr_talkName.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object 
   xhr_talkName.onreadystatechange = 
   					function (e) 														//Create an asynchronous callback to deal with the request when it comes back.
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
	var talkTime = talkLengths[talkSelect.selectedIndex];
	
	var params = "functioncall=setTalkName&talkTime="+ talkTime +"&talkName=" + talkSelect.options[talkSelect.selectedIndex].value;	//set the function the server is supposed to execute by setting this variable's value
   xhr_talkName.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object - Doing this synchronously is a bad idea but fast and easy for now.
	xhr_talkName.send();     																	//Send the Ajax request to the server with the GET data
}

function startTimer() 
{
	xhr_control= new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr_control== null) return;															//NOPE

	var params = "functioncall=startTimer";
   xhr_control.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object - Doing this synchronously is a bad idea but fast and easy for now.
	xhr_control.send();     																	//Send the Ajax request to the server with the GET data
}

function resetTimer()
{
	xhr_control= new XMLHttpRequest(); 													//Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr_control== null) return;															//NOPE

	var params = "functioncall=resetTimer";
   xhr_control.open("GET", "timer.php"+"?"+params, true);							//Initiate the XMLHttpRequest object - Doing this synchronously is a bad idea but fast and easy for now.
	xhr_control.send();    																	//Send the Ajax request to the server with the GET data
}

function updateCountDownTimer() 
{
		
	xhr_time = new XMLHttpRequest(); //Don't support internet explorer, it's garbage and activeX is full of bugs, why waste the time?
	if (xhr_time == null) return;		//NOPE

	var params = "functioncall=getTime"
	//Initiate the XMLHttpRequest object
    xhr_time.open("GET", "timer.php"+"?"+params, true);

    //Setup the callback function
    xhr_time.onreadystatechange = function (e) 														//Create an asynchronous callback to deal with the request when it comes back.
   					{
  							if (xhr_time.readyState === 4) 
  							{
    							if (xhr_time.status === 200) 
    							{
    								var seconds = xhr_time.responseText;
    								var date = new Date(null);
									date.setSeconds(abs(seconds)); // specify value for SECONDS here
    								
									document.getElementById('timer_down').innerHTML = date.toISOString().substr(14,5);
    							}
    						else 
    							{
      							console.error(xhr_time.statusText);
    							}
  							}
						};;

    //Send the Ajax request to the server with the GET data
    xhr_time.send(null);
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