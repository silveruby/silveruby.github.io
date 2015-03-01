<?php

	// // Setup Filename
	// $filename = $_GET['videoId'].'.txt';
	// 
	// // Open File to write
	// $fh = fopen($filename, 'w') or die("can't open file");
	// fwrite($fh, $_GET['lyrics']);
	// 
	// // Close file
	// fclose($fh);
	// 
	// echo "<p>File Saved - <a href=\"javascript:readLyrics()\">Play Video With Lyrics</a><p>";

	$con = mysql_connect("localhost","ictoan_saUser3","singAlong3");
	if(!$con){
		// Show error if we cannot connect.
		echo 'ERROR: Could not connect to the database.';
	}
	else{
	    mysql_select_db("ictoan_singAlong", $con) OR die("database error");

		/* Update videos table */
		$videoID = $_GET['videoId'];
		$ly = json_decode($_GET['lyrics']);
		//echo $lyrics;
		
		// check if video is already in table
		$query = "SELECT * FROM `lyrics` WHERE `videoID`= \"$videoID\"";
		$result = mysql_query($query) OR die("database error, please try again");
		$count = mysql_num_rows($result);	
		if($count > 0) { echo "lyrics for this video already exist"; return; }
		
		// if video id is new then do the following
		foreach($ly->lyrics as $l){
			//echo $l->time;
			//echo $l->text;
			$time = $l->time;
			$line = $l->text;
			
			$query = "INSERT INTO `lyrics` SET `videoID`=\"$videoID\", `time`=\"$time\", `line`=\"$line\"";
			
			//$query = "SELECT * FROM `lyrics` WHERE `videoID`=\"k2ImztgAti\"";
			
			$result = mysql_query($query) OR die("database error, please try again");	
			//$result = mysql_query($query);
			//echo $result;
			//echo $query;		
		}
		
		mysql_close($con);

		//return $data;	
	}
?>