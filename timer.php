<?php
//copyright jack farrand 2017 
ini_set('display_errors', 'On');  //enable error reporting while I'm debugging the code.
error_reporting(E_ALL);

function setTimer() 
{
	echo "Timer Successfully Set"; //Dummy code while I set it all up
}

function getTalkName() 
{
	$talkName = apc_fetch('talkName'); //retrieve this from the APC short term server cache, persistent between script calls.
	echo $talkName;
}

function setTalkName() 
{
	$talkName = $_GET['talkName'];
	apc_store("talkName", $talkName); //store this in the APC cache, short term server-side storage so we can get at it later
}

/*Check the http header for function calls and execute the relevant functions if required*/

if($_GET['functioncall'] === "setTimer") 
{
	setTimer();
}
elseif($_GET['functioncall'] === "getTalkName") 
{
	getTalkName();
}
elseif($_GET['functioncall'] === "setTalkName") 
{
	setTalkName();
}

/*if an invalid function call is sent, reply with a stupid message*/
else 
{
	echo "Hello World\n";
	echo date('m/d/Y h:i:s a', time());
	echo "pick a function call next time, dingus.";
}

?>