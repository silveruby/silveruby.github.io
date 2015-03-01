// YouTube Videos
// Make Entry a global element
var entry;
var videoId;
var lyrics; 
var lyricsObj;
var lyrCount;
//var ytplayer;

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
	document.getElementById("ResultsBar").innerHTML = html.join("");
};

selectFromResult = function(count) {
	
	// hide lyricsBoxForm
	//hide('lyricsBoxForm');
	// hide MainSearch
	//$("#MainSearch").hide();
	
	// define variables
	var selectedVideo = entry[count];
	var videoUrl = selectedVideo.id.$t;
	var videoUrlSplit = videoUrl.split("/");
	videoId = videoUrlSplit.pop();
	
  	//Load video into the player
  	ytplayer.cueVideoById(videoId);	
		
	// show videoInfoWrapper Div
	//hide("introduction");
	//show("videoInfo");
	
	// update video information
	document.getElementById('videoName').innerHTML 
		= "<strong>Title</strong>: " + selectedVideo.title.$t;
	document.getElementById('videoElapsed').innerHTML 
			= "<strong>Time</strong>: 0 / ";
	document.getElementById('videoDuration').innerHTML 
			= selectedVideo.media$group.media$content[0].duration + " seconds";

			
	// This causes the updatePlayerInfo function to be called every 250ms to
	// get fresh data from the player
	setInterval(updateVideoTime, 100);
	//updateVideoTime();
		
	// Check if lyrics exists 
	checkFileExist();
};

updateVideoTime = function(){
	if(ytplayer.getPlayerState() == 5){ // haven't started
		//clearInterval(updateVideoTime);
		return;
	}
	else {
		//console.log(ytplayer.getPlayerState());
		document.getElementById('videoElapsed').innerHTML 
			= "<strong>Time</strong>: "
			+ ytplayer.getCurrentTime() + " / ";
	}
}

// Search Results First Call
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
	// var historyPathHTML = document.getElementById("historyPath").innerHTML;
	// document.getElementById("historyPath").innerHTML 
	// 	= historyPathHTML + " >> " + '"' + searchQuery + '"' + " Results";	
	
	
	// hide MainSearch
	$("#MainSearch").hide();
	
	// show ResultsBar
	$("#ResultsBar").show();
	$("#VideoBar").show();	
	
	loadPlayer();				
};

// YOUTUBE VIDEO PLAYER

// This function is automatically called by the player once it loads
onYouTubePlayerReady = function(playerId) {
	console.log("glah");
  ytplayer = document.getElementById("ytPlayer");
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  //ytplayer.cueVideoByUrl(videoUrl);
};

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
};

$(document).ready(function () {
 
  	//loadPlayer();  

	// show mainsearch, hide all else
	$("#MainContainer > div").hide();
	$("#MainSearch").show();

	// hide show search value
	var searchBox = $("#MainFormSearch");  

	//Searchbox2 show/hide default text if needed
	searchBox.focus(function(){
	if($(this).attr("value") == "Search A Song...") $(this).attr("value", "");
	//console.log("teehee");
	});
	searchBox.blur(function(){
	if($(this).attr("value") == "") $(this).attr("value", "Search A Song...");
	});
	
});

// function init(){
//   	loadPlayer();  
// 
// 	// show mainsearch, hide all else
// 	$("#MainContainer > div").hide();
// 	$("#MainSearch").show();
// 
// 	// hide show search value
// 	var searchBox = $("#MainFormSearch");  
// 
// 	//Searchbox2 show/hide default text if needed
// 	searchBox.focus(function(){
// 	if($(this).attr("value") == "Search A Song...") $(this).attr("value", "");
// 	//console.log("teehee");
// 	});
// 	searchBox.blur(function(){
// 	if($(this).attr("value") == "") $(this).attr("value", "Search A Song...");
// 	});	
// }