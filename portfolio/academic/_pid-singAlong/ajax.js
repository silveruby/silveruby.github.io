function getXMLHttp()
{
  var xmlHttp

  try
  {
    //Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
    //Internet Explorer
    try
    {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e)
    {
      try
      {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e)
      {
        alert("Your browser does not support AJAX!")
        return false;
      }
    }
  }
  return xmlHttp;
}

// AJAX: checkFileExist
function checkFileExist()
{
  var xmlHttp = getXMLHttp();

  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
      checkFileExistHandleResponse(xmlHttp.responseText);
    }
  }

  xmlHttp.open("GET", "file_exist.php?videoId=" + videoId, true);
  xmlHttp.send(null);
}

function checkFileExistHandleResponse(response)
{
  document.getElementById('lyricsExist').innerHTML = response;
}

// AJAX: saveLyrics
function saveLyrics()
{
  var xmlHttp = getXMLHttp();

  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
      createFileHandleResponse(xmlHttp.responseText);
    }
  }

	// Create Lyrics in JSON format
	var lyrJSON = '{"lyrics": [';
	for(i=0; i < lyrics.length; i++){
		lyrJSON = lyrJSON + lyrics[i];
		if((i+1) < lyrics.length) {
			lyrJSON = lyrJSON + ',';
		}
	}
	lyrJSON = lyrJSON + ']}';
  	xmlHttp.open("GET", "create_file.php?lyrics=" + lyrJSON + "&videoId=" + videoId, true);
  	xmlHttp.send(null);
}

// AJAX: readLyrics
readLyrics =function()
{
  var xmlHttp = getXMLHttp();

  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
      	readFileHandleResponse(xmlHttp.responseText);
    }
  }
  	xmlHttp.open("GET", "read_file.php?videoId=" + videoId, true);
  	xmlHttp.send(null);
}
