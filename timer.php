<?php

function setTimer() 
{
	echo "Timer Successfully Set";
}

function getTalkName() 
{
	$talkName = "Treasures from God's Word";
	echo $talkName;
}

if($_GET['functioncall'] === "setTimer") 
{
	setTimer();
}
elseif($_GET['functioncall'] === "getTalkName") 
{
	getTalkName();
}

else 
{
	echo "Hello World\n";
	echo date('m/d/Y h:i:s a', time());
	echo "pick a function call next time, dingus.";
}
?>