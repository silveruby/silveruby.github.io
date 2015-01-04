<?php
	// $filename = $_GET['videoId'].'.txt';
	// 
	// if (file_exists($filename)) {
	// echo "<strong>Lyrics:</strong> Available - <input type='button' id='lyricsAdd' value='Play Video With Lyrics' onClick=\"readLyrics()\" />";
	// } else {
	// echo "<strong>Lyrics:</strong> Not Available - <input type='button' id='lyricsAdd' value='Add Lyrics' onClick=\"toggle('lyricsBoxForm')\" />";
	// }

	$con = mysql_connect("localhost","ictoan_saUser3","singAlong3");
	if(!$con){
		// Show error if we cannot connect.
		echo 'ERROR: Could not connect to the database.';
	}
	else{
	    mysql_select_db("ictoan_singAlong", $con) OR die("database error");

		/* Update videos table */
		$videoID = $_GET['videoId'];
		//$ly = json_decode($_GET['lyrics']);
		//echo $lyrics;
		
		// check if video is already in table
		$query = "SELECT * FROM `lyrics` WHERE `videoID`= \"$videoID\"";
		$result = mysql_query($query) OR die("database error, please try again");
		$count = mysql_num_rows($result);
		
		
		if($count > 0){
			echo "<strong>Lyrics:</strong> Available - <input type='button' id='lyricsAdd' value='Play Video With Lyrics' onClick=\"readLyrics()\" />";
		}
		else{
			echo "<strong>Lyrics:</strong> Not Available - <input type='button' id='lyricsAdd' value='Add Lyrics' onClick=\"toggle('lyricsBoxForm')\" />";			
		}		
		
		mysql_close($con);

		//return $data;	
	}	
?>