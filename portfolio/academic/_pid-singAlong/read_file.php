<?php

// Setup Filename
$filename = $_GET['videoId'].'.txt';

// Open File to Read
$fh = fopen($filename, 'r');
$theData = fread($fh, filesize($filename));

// Close File
fclose($fh);
 
echo stripslashes($theData);

?>