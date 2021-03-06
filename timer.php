<?php
//copyright jack farrand 2017 
ini_set('display_errors', 'On');  //enable error reporting while I'm debugging the code.
error_reporting(E_ALL);

function sanitize($input) 
{
 
  $search = array(
    '@<script[^>]*?>.*?</script>@si',   // Strip out javascript
    '@<[\/\!]*?[^<>]*?>@si',            // Strip out HTML tags
    '@<style[^>]*?>.*?</style>@siU',    // Strip style tags properly
    '@<![\s\S]*?--[ \t\n\r]*>@'         // Strip multi-line comments
  );
 
    $output = preg_replace($search, '', $input);
    return $output;
}

function getMessages() 
{
	$messages = apc_fetch('messages');
	echo $messages;
}

function sendMessage() 
{
	$messages = apc_fetch('messages');
	$messages .= "<p class=\"message\" >"  . sanitize($_GET['message']) . "</p>";  //sanitize the input we receive from the client
	apc_store("messages", $messages);
}

function getTalkName() 
{
	$talkName = apc_fetch('talkName'); //retrieve this from the APC short term server cache, persistent between script calls.
	echo $talkName;
}

function setTalkName() 
{
	$talkName = sanitize($_GET['talkName']); //set the inputs, and sanitize them so no code injection can take place.
	$talkTime = sanitize($_GET['talkTime']);
	
//	$talkName .= " - " . $talkTime . " Minutes"; //debug code
	apc_store("talkName", $talkName); //store this in the APC cache, short term server-side storage so we can get at it later
	apc_store("talkTime", $talkTime);
	
	//as a side point, we now need to clear all messages for the previous talk, so now we do that.
	$messages = "";
	apc_store("messages", $messages);
	
	//set the started variable so the talk doesn't start automatically
	$started = false;
	apc_store("timerStarted", $started);
	
	$startTime = time();
	apc_store(startTime, $startTime);
}

function getTime()
{
	$talkTime = apc_fetch("talkTime");
	//echo $talkTime;
	date_default_timezone_set ("Europe/London");

	//echo date("i:s", time());	//debug code
	$started = apc_fetch("timerStarted");
	$startTime = apc_fetch("startTime");
	
	if($started) 
	{
		$remaining = ($startTime + $talkTime * 60) - time(); 
	}
	else 
	{
		$remaining = $talkTime * 60;
	}

	//echo date("i:s", $remaining);
	echo $remaining;	
}

function startTimer() 
{
	$startTime = time();
	apc_store("startTime", $startTime);
	
	$started = true;
	apc_store("timerStarted", $started);
}

function resetTimer() 
{
	$started = false;
	apc_store("timerStarted", $started);
	
	$startTime = time();
	apc_store("startTime", $startTime);
}

/*Check the http header for function calls and execute the relevant functions if required*/

if($_GET['functioncall'] === "getMessages") 
{
	getMessages();
}
elseif($_GET['functioncall'] === "sendMessage") 
{
	sendMessage();
}
elseif($_GET['functioncall'] === "getTalkName") 
{
	getTalkName();
}
elseif($_GET['functioncall'] === "setTalkName") 
{
	setTalkName();
}
elseif($_GET['functioncall'] === "getTime") 
{
	getTime();
}
elseif($_GET['functioncall'] === "startTimer") 
{
	startTimer();
}
elseif($_GET['functioncall'] === "resetTimer") 
{
	resetTimer();
}

/*if an invalid function call is sent, reply with a stupid message*/
else 
{
	echo "Hello World\n";
	echo date('m/d/Y h:i:s a', time());
	echo "pick a function call next time, dingus.";
}

?>