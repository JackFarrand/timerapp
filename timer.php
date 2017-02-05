<?php

function setTimer() 
{
	echo "Timer Successfully Set";
}

if($_GET['functioncall'] === "setTimer") {setTimer();}
else {

echo "Hello World\n";

echo date('m/d/Y h:i:s a', time());
}
?>