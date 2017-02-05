<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

function setTimer() 
{
	echo "Timer Successfully Set";
}

function getTalkName() 
{
	//$talkName = "Treasures from God's Word";
	$talkName = apc_fetch('talkName');
	echo $talkName;
}

function setTalkName() 
{
	$talkName = $_GET['talkName'];
	apc_store("talkName", "This is a talk name");
}

if($_GET['functioncall'] === "setTimer") 
{
	setTimer();
}
elseif($_GET['functioncall'] === "getTalkName") 
{
	setTalkName();
	getTalkName();
}

else 
{
	echo "Hello World\n";
	echo date('m/d/Y h:i:s a', time());
	echo "pick a function call next time, dingus.";
}
?>