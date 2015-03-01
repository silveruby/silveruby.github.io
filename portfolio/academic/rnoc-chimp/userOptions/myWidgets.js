/** MY WIDGETS PANEL **/
var myWidgetList = new Array(
		{category: 'Entertainment', widgets: new Array()},
		{category: 'News and Weather', widgets: new Array()},
		{category: 'Shopping', widgets: new Array()},
		{category: 'Show Apps', widgets: new Array()},
		{category: 'Social', widgets: new Array()},
		{category: 'Sports', widgets: new Array()}
);

function getMyList(){
		var url = "widgets.xml";
		$.ajax( {
			url : url,
			dataType : 'xml',
			success : function(result) {
				getWidgetListCallback(result);
			},
			async : false 
		});
}

/*
 * It retrieves the XML file received from the server This function strips of
 * the App Store Widgets information and converts them into HTML Each widget is
 * inside a <div> element with the image and span text inside it
 */
function getWidgetListCallback(storeListXML){ // callback function of getStoreWidgets

	//var p = top.getPlatform();
	attribs = "";

	var widgetsArray = new Array();
	var i = 0;

	$(storeListXML).find("widget").each(function() {
		var widget = $(this);
		var description = widget.find("description").text();
		var name = widget.find("name").text();
		var view = widget.find("view").text();
		var title = widget.find("title").text();
		var version = widget.find("version").text();
		var icon = '../' + name + '/' + widget.find("icon").text();
		var category = widget.find("category").text();

		 widgetsArray.push({name : name, 
		 						title : title, 
		 						update : '10/08/2010',
		 						version : version,
		 						size : 'unknown',
		 						price : '$1.99', 
		 						category : category,
		 						description : description,
		 						image : 'image.png',
		 						icon : icon,
		 						developer : 'GT-RNOC',
		 						contact : 'http://www.rnoc.gatech.edu',
		 						isInstalled : 'true',
		 						divId : "app_" + i + "_" + name
		 					});
		
		
	}); // end getting WidgetsArray

		// convert WidgetArray into StoreList (match category)
		for(w in widgetsArray){
			for(s in myWidgetList){
				if(myWidgetList[s].category == widgetsArray[w].category){
                                    myWidgetList[s].widgets.push(widgetsArray[w]);
                                    break;
				}
			}
		}

}
function createMyPanel(){

	// DEFINE MY WIDGET LIST AND WIDGET OPTIONS CONTAINERS
	var html = "<div id='myWidgets_border' class='ui-state-active'></div>";
	html = html + "<div id='myWidgets_list' class='myWidgets_container' ></div>";
	html = html + "<div id='myWidgets_widget' class='myWidgets_container'></div>";
	$('#myWidgets_panel').html(html);

	//showCategoryInfo("start", "#myWidgets_widget");
	createMyWidgets();
}

function createMyWidgets(){
	
	var html = "<div id='myWidgets-wrap' class='hidden'></div>";
	html = html + "<div id='myWidgets-demo' class='hidden'><ul>";

	for(cate in myWidgetList){
		html = html + "<li>";
		html = html + "<a href='#' id='my_" + myWidgetList[cate].category + "'>" + myWidgetList[cate].category + "</a>";
		if(myWidgetList[cate].widgets.length > 0){
			html = html + "<ul>";
			for(wid in myWidgetList[cate].widgets){
				html = html + "<li>";
				html = html + "<a href='#'>" + myWidgetList[cate].widgets[wid].title + "</a>";
				html = html + createMyWidgetDetail(myWidgetList[cate].widgets[wid]);
				html = html + "</li>";
			}
			html = html + "</ul>";
		}
		else{
			html = html + "<ul><li><a href='#'>N/A</a></li></ul>";
		}
		html = html + "</li>";
	}

	html = html + "</ul></div>";

	$('#myWidgets_list').html(html);

	$('#myWidgets-wrap').menu({
		content: $('#myWidgets-demo').html(),
		backLink: false,
		width: 350,
		maxHeight: 500,
		appendTo: '#myWidgets_list',
		showInfoTo: '#myWidgets_widget',
                idCount: 0,
                id: 'my'
	});
}

function createMyWidgetDetail(widget){
	var html = "";

	html = "<ul>";
	html = html + "<li>";
	html = html + "<a href='#' onClick='updateWidgetEnableStatus()'>Disable</a>";
	html = html + "</li>";
	html = html + "<li>";
	if(isLatestVersion(widget)){
		html = html + "<a href='#' style='color:gray; background:none;'>Update</a>";
	}
	else{
		html = html + "<a href='#' onClick='updateWidgetVersionCall()'>Update</a>";	
	}
	html = html + "</li>";
	html = html + "<li>";
	html = html + "<a href='#' onClick='uninstallWidget()'>Uninstall</a>";
	html = html + "</li>";
	html = html + "</ul>";

	return html;
}

function updateWidgetVersionCall(){
    	var widget = $("#" + activeElementId).parent().parent().parent().find('a:eq(0)');
    	var widgetTitle = widget[0].text;
	var widgetObject = getWidgetObjectBasedOnTitle(widgetTitle);

	var storeVersion;

	for(s in storeList){
		for(w in storeList[s].widgets){
			if(storeList[s].widgets[w].name == widgetObject.name){
				updateWidgetVersion(widgetObject.name, storeList[s].widgets[w].version); // version from Store so update is availble
				break;
			}
		}
	}


}

function isLatestVersion(widget){
	for(s in storeList){
		for(w in storeList[s].widgets){
			if(storeList[s].widgets[w].version == widget.version){
				return true; // indicate that it is not the latest version so update is availble
			}
		}
	}
	return false;
}

function updateWidgetEnableStatus(){
	var status1 = document.getElementById(activeElementId).innerText;
	if(status1 == 'Enable'){
		enableWidget();
	}
	else{
		disableWidget();
	}
}

function enableWidget(){

	// update link options
	document.getElementById(activeElementId).innerText = "Disable";
	
	// update information on the right
	$("#myWidgets_widget_state").html("Currently Enabled");

	// update platform: add to selected widget

	// update OUX widget container
    	var widget = $("#" + activeElementId).parent().parent().parent().find('a:eq(0)');
    	var widgetTitle = widget[0].text;
	var widgetObject = getWidgetObjectBasedOnTitle(widgetTitle);
	top.addWidgetToContainer(widgetObject);
}

function disableWidget(){

	// update link options
	document.getElementById(activeElementId).innerText = "Enable";
	
	// update information on the right
	$("#myWidgets_widget_state").html("Currently Disabled");

	// update platform: remove from selected widget
		

	// update OUX widget container
    	var widget = $("#" + activeElementId).parent().parent().parent().find('a:eq(0)');
    	var widgetTitle = widget[0].text;
	var widgetObject = getWidgetObjectBasedOnTitle(widgetTitle);
	top.removeWidgetFromContainer(widgetObject);

}

function getWidgetObjectBasedOnTitle(widgetTitle){
	for(i in myWidgetList){
		for(j in myWidgetList[i].widgets){
			if(myWidgetList[i].widgets[j].title == widgetTitle){
				return myWidgetList[i].widgets[j];
			}
		}
	}
}

function uninstallWidget(){	

	// update information on the right
	$("#myWidgets_widget_state").html("Uninstalled");

	// update uninstalled option style
	var optionUnisntall = document.getElementById(activeElementId);
	optionUnisntall.innerHTML = "Uninstalled";
	optionUnisntall.onclick = undefined;
	optionUnisntall.style.color = "gray";
	optionUnisntall.style.background = "none";


	// update uninstalled option style
	var optionStatusId = $("#" + activeElementId).parent().parent().find('li').find('a:eq(0)').attr('id');
	var optionStatus = document.getElementById(optionStatusId);
	optionStatus.innerHTML = "Disabled";
	optionStatus.onclick = undefined;
	optionStatus.style.color = "gray";
	optionStatus.style.background = "none";

	// update backend
	removeWidgetFromMyWidgets();
}

function removeWidgetFromMyWidgets(){
	// update oux3 iframe and to platform 
    	var widget = $("#" + activeElementId).parent().parent().parent().find('a:eq(0)');
    	var widgetTitle = widget[0].text;
	var widgetObject = getWidgetObjectBasedOnTitle(widgetTitle);
	top.removeWidgetFromContainer(widgetObject); // also removes from selectedWidgets	

	//top.addWidgetToContainer(widgetName);				
	// add widget to the XML file - added by Nadu
	removeInstalledWidget(widgetObject.name);
	//addWidgetToXMLFile(storeList[s].widgets[w]);
							
	// update myWidgetList in userOptions
        //myWidgetList[m].widgets.push(storeList[s].widgets[w]);
}

function addWidgetToMyWidgets(){

    var widget = $("#" + activeElementId).parent().parent().parent().find('a:eq(0)');
    var widgetName = widget[0].text;
    var category = widget.parent().parent().parent().find('a:eq(0)');
    var categoryText = category[0].textContent;
    
    for(s in storeList){
        if(storeList[s].category == categoryText){
            for(w in storeList[s].widgets){
                if(storeList[s].widgets[w].title == widgetName){
                    for(m in myWidgetList){
                        if(myWidgetList[m].category == categoryText){

				// update oux3 iframe and to platform 
				top.addWidgetToContainer(storeList[s].widgets[w]);	
				//top.addWidgetToContainer(widgetName);				
				// add widget to the XML file - added by Nadu
				addWidgetToXMLFile(storeList[s].widgets[w]);
							
				// update myWidgetList in userOptions
                            	myWidgetList[m].widgets.push(storeList[s].widgets[w]);

                            	break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }

    fgMenu_Kill(1);	
    createMyWidgets();
}

/* method added by Nadu for adding widget to the backend xml file */
function addWidgetToXMLFile(newW){
    var param = new Array();
    param[0] = new Object;
    param[0].key = "name";
    param[0].value = newW.name;
    param[1] = new Object;
    param[1].key = "title";
    param[1].value = newW.title;
    param[2] = new Object;
    param[2].key = "description";
    param[2].value = newW.description;
    param[3] = new Object;
    param[3].key = "icon";
    param[3].value = newW.icon;
    param[4] = new Object;
    param[4].key = "view";
    param[4].value = newW.view;
	param[5] = new Object;
    param[5].key = "version";
    param[5].value = newW.version;
    param[6] = new Object;
    param[6].key = "selected";
    param[6].value = "true"; // has to be set here as AppStore doesnt have this property value
	
	param[7] = new Object;
    param[7].key = "category";
    param[7].value = newW.category;
	
    
    addNewWidget(param);
   
}

function removeMyWidget(){
	$('#myWidgets_list').empty();
}
