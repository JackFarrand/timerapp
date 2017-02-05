<?php

$now = new DateTime();
echo $now->format('Y-m-d H:i:s');    // MySQL datetime format
echo $now->getTimestamp();           // Unix Timestamp -- Since PHP 5.3

?>