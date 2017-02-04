function loadTimers() 
{
	window.setInterval(updateTimers, 1000);
}

function updateTimers() 
{
	updateCountDownTimer();
	updateCountUpTimer();
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
}

