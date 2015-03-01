// Random Functions //
function toggle(boxid){
	if(document.getElementById(boxid).style.display == "block") {
		document.getElementById(boxid).style.display = "none";
	}
	else {
		if(boxid == 'lyricsBoxForm'){
			document.getElementById('lyricsBox').value = "Paste Lyrics Here";				
		}
		document.getElementById(boxid).style.display = "block";
	}
}
function show(boxid){
   document.getElementById(boxid).style.display ="block";
}

function hide(boxid){
   document.getElementById(boxid).style.display="none";
}

// YouTube Videos
// Make Entry a global element
var entry;
var videoId;
var lyrics; 
var lyricsObj;
var lyrCount;

getResultsCallback = function(root) { // Get Results and show 5 Thumbnails
	var feed = root.feed;
	entry = feed.entry || [];
	var html = [];
	html.push('<ul>');
	for(var i = 0; i < entry.length; ++i) {
		var result = entry[i];
		var result_thumbnail = result.media$group.media$thumbnail[0].url || []; // get first thumbnail
		var img = '<img src=' + result_thumbnail + ' width=120 height=90 border=0>';
		var link = '<li><a href="javascript: selectFromResult(' + i + ')">' + img + '</a></li>';
		html.push(link);
	}
	html.push('</ul>');
	
	// Update Current Option DIV
	document.getElementById("currentOption").innerHTML = html.join("");
}
		
createYouTubeGet = function(searchQuery) {
  // Remove any old existance of a script tag by the same name
  var oldScriptTag = document.getElementById("sQuery");
  if (oldScriptTag) {
    oldScriptTag.parentNode.removeChild(oldScriptTag);
  }

  // Create new script tag
  var script = document.createElement('script');
  script.setAttribute('src',
		'http://gdata.youtube.com/feeds/api/videos?q=' 
		+ searchQuery 
		+ '&orderby=relevance&max-results=5&alt=json-in-script&callback=getResultsCallback');
  script.setAttribute('id', "sQuery");
  script.setAttribute('type', 'text/javascript');

  // Append the script tag to the head to retrieve a JSON feed of videos
  // NOTE: This requires that a head tag already exists in the DOM at the
  // time this function is executed.
  document.getElementsByTagName('head')[0].appendChild(script);

	// Update History Path DIV
	var historyPathHTML = document.getElementById("historyPath").innerHTML;
	document.getElementById("historyPath").innerHTML 
		= historyPathHTML + " >> " + '"' + searchQuery + '"' + " Results";				
};
		
selectFromVideoId = function(vId) {

	videoId = vId;

	// hide lyricsBoxForm
	hide('lyricsBoxForm');
	
  	//Load video into the player
  	ytplayer.cueVideoById(videoId);	
		
	// show videoInfoWrapper Div
	hide("introduction");
	show("videoInfo");
	
	// update video information
	document.getElementById('videoName').innerHTML 
		= "<strong>Title</strong>: [MV] Jay Chou - Qing Tian";
	document.getElementById('videoElapsed').innerHTML 
			= "<strong>Time</strong>: 0 / ";
	document.getElementById('videoDuration').innerHTML 
			= "316 seconds";

			
	// This causes the updatePlayerInfo function to be called every 250ms to
	// get fresh data from the player
	setInterval(updateVideoTime, 250);
	updateVideoTime();
		
	// Check if lyrics exists 
	checkFileExist();
}
		
selectFromResult = function(count) {
	
	// hide lyricsBoxForm
	hide('lyricsBoxForm');
	
	// define variables
	var selectedVideo = entry[count];
	var videoUrl = selectedVideo.id.$t;
	var videoUrlSplit = videoUrl.split("/");
	videoId = videoUrlSplit.pop();
	
  	//Load video into the player
  	ytplayer.cueVideoById(videoId);	
		
	// show videoInfoWrapper Div
	hide("introduction");
	show("videoInfo");
	
	// update video information
	document.getElementById('videoName').innerHTML 
		= "<strong>Title</strong>: " + selectedVideo.title.$t;
	document.getElementById('videoElapsed').innerHTML 
			= "<strong>Time</strong>: 0 / ";
	document.getElementById('videoDuration').innerHTML 
			= selectedVideo.media$group.media$content[0].duration + " seconds";

			
	// This causes the updatePlayerInfo function to be called every 250ms to
	// get fresh data from the player
	setInterval(updateVideoTime, 250);
	updateVideoTime();
		
	// Check if lyrics exists 
	checkFileExist();
};
				
updateVideoTime = function(){
	if(ytplayer.getPlayerState() == 0){
		clearInterval(updateVideoTime);
	}
	else {
		document.getElementById('videoElapsed').innerHTML 
			= "<strong>Time</strong>: "
			+ ytplayer.getCurrentTime() + " / ";
	}
}

// This function is automatically called by the player once it loads
onYouTubePlayerReady = function(playerId) {
  ytplayer = document.getElementById("ytPlayer");
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  //ytplayer.cueVideoByUrl(videoUrl);
};

function init(){
	
	$(function() {
		$( "#karaokeWraper" ).draggable();
	});
	
	loadPlayer();
	
}
// The "main method" of this sample. Called when someone clicks "Run".
loadPlayer = function() {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                     "&enablejsapi=1&playerapiid=ytp", 
                     "videoBox", "480", "295", "8", null, null, params, atts);
}

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

function createFileHandleResponse(response)
{
	document.getElementById('karaokeOption').innerHTML = "";
  	document.getElementById('karaokeBox').innerHTML = response;
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

function readFileHandleResponse(response)
{
	// parse JSON
	lyricsObj = JSON.parse(response);

  	//Load video into the player
  	ytplayer.cueVideoById(videoId);

	// play lyrics
	lyrCount = 0;
	setInterval(playLyrics, 100);			
	playLyrics();
	
	// play video
    ytplayer.playVideo();

}
	
playLyrics = function(){
	if(!(lyrCount < lyricsObj.lyrics.length)) {
		clearInterval(playLyrics);
	}
	else {
		var lyr = lyricsObj.lyrics[lyrCount];
		if(lyr.time < ytplayer.getCurrentTime()){
		
			// display current line
			document.getElementById('karaokeBox').innerHTML = 
				"<p>" + lyr.text + "</p>";
		
				// move on to the next line
				lyrCount = lyrCount + 1;
			}				
	}
}
// create lyrics
createLyrics = function(){
	// Put lyrics in an array
	var lyrArray = "Start\n";
	lyrArray = lyrArray + document.getElementById('lyricsBox').value;
	lyrArray = lyrArray + "\nFinished";
	lyrics = lyrArray.split("\n");
	scrollLyrics(0);
    ytplayer.playVideo();
}
scrollLyrics = function(i){
	
	// update karaokeBox
	if(i < lyrics.length){
		// Display lyrics
 			document.getElementById('karaokeBox').innerHTML = "<p>" + lyrics[i] + "</p>";
			
		// Timestamp Lyrics and add the time to the front of the lyrics
		var timeStamp = ytplayer.getCurrentTime();
		var lyrLine = lyrics[i];
		// Create lyrics in JSON format
		lyrics[i] = '{"time":"' + timeStamp + '","text":"' + lyrLine + '"}';
	}
	
	// update karaokOption
	if((i+1) < lyrics.length){
 			document.getElementById('karaokeOption').innerHTML 
			= "<p><a href=\"javascript:scrollLyrics(" + (i+1) + ")\">Next</a></p>";
	}
	else {
 			document.getElementById('karaokeOption').innerHTML = 
		"<p><a href=\"javascript:saveLyrics()\">Save Lyrics</a></p>";				
	}			
}

clearTextArea = function(){
	var value = document.getElementById('lyricsBox').value; 
	if(value == "Paste Lyrics Here"){
		document.getElementById('lyricsBox').value = "";
	}
}
