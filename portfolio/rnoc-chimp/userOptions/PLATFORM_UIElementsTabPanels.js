var currentTabId = undefined;

/**
    @description Creates a set of jquery UI tabs from a specified array
    @param {String[]} panels array of properties of the tabs to be created - id, title, number of tabs is the number of elements in the array
*/

function createTabs(panels){
    // Create tab <ul>links</ul>
    var tab_list_class = "tabs_ul_class";
    var tab_links = "<ul class='"+tab_list_class+"'>";
    var li_link;
    var tabClass = "";
    var tabsListItemId = "";
    // element type is set to tabs
    for (var p in panels){
        //li_link = '<li><a href="#'+panels[p].id+'">'+panels[p].name+'</a></li>';
        tabClass = "tabs_"+panels[p].id+"_li_"+p + " navigationClass";
        tabsListItemId = "tabs_li_"+p;
        li_link = "<li elementtype='tabs'  id ='"+tabsListItemId+"' class ='"+tabClass+"'><a href=#"+panels[p].id+" '>"+panels[p].name+"</a></li>";
        tab_links = tab_links+li_link;
    }
    tab_links = tab_links+'</ul>';
    $('#tabs').append(tab_links);

    // Create Panels based on the panels array
    for (var p in panels) {
        // Create DIVS base on Number of Panels
        $('#tabs').append("<div id='" + panels[p].id + "' class='main '></div>");
    }
    // adding this line because while switching to small view - tabs are disabled so no tabs are selected. 
    $('#tabs').tabs({selected: 0});
}

/* KEYHANDLING FUNCTIONS */

function keyNavigationElementHandler_tabs(){
	if($('#'+activeElementId).hasClass('horizontal') && key == 'UP'){
		return keyNavigationElementHandler_tabs(activeElementId, "LEFT_HORIZONTAL");
	}	
}

/**
    @private
    @description Main Key handling for Tabs
    @param {integer} activeElementId the element that is currently selected
    @param {string} key Key Press
*/
function keyNavigationElementHandler_tabs(){
	
    var index = activeElementId.lastIndexOf("_li_");
    var tabIndex = activeElementId.substring(index+4);
    tabIndex = parseInt(tabIndex);

    switch(keyId){
    case KEY_SET.LEFT:
    case "LEFT_HORIZONTAL":
    	/*
    	 * If its in horizontal mode and left is pressed when a tab is active, then do nothing 
    	 */
    	if($('#'+activeElementId).hasClass('horizontal') && key == 'LEFT'){
    		return true; 
    	}	
        // remove class from current active element
        // add class to the new active element
        // set the new active element
        if(tabSelectLEFT()){
            var k = $('#'+activeElementId);
            $('#'+activeElementId).removeClass(getActiveClass());
            var newActiveElementId = activeElementId.slice(0,index+4)+(tabIndex-1);
			currentFgMenuItem = tabIndex-1;
            //$("li[uniqueid="+newActiveElementId+"]").addClass(getActiveClass());
            
            setActiveElementId(newActiveElementId);
            $("#"+newActiveElementId).addClass(getActiveClass());
        }
        if($("#"+getActiveElementId()).hasClass("horizontal"))
        	return keyNavigationElementHandler_tabs(getActiveElementId(), 'DOWN_SELECT'); // added so that after switch tabs the first navigable element in the panel is auto selected
        return true;

        break;

        case KEY_SET.RIGHT:
        case "RIGHT_HORIZONTAL":
        	/*
        	 * If its in horizontal mode and right is pressed when a tab is active, then do nothing 
        	 */
        	if($('#'+activeElementId).hasClass('horizontal') && key == 'RIGHT'){
        		return true; 
        	}	
        	
            if(tabSelectRIGHT()){
                $('#'+activeElementId).removeClass(getActiveClass());
                var newActiveElementId = activeElementId.slice(0,index+4)+(tabIndex+1);
				currentFgMenuItem = tabIndex+1;
                setActiveElementId(newActiveElementId);
                $("#"+newActiveElementId).addClass(getActiveClass());
            }
            if($("#"+getActiveElementId()).hasClass("horizontal"))
            	return keyNavigationElementHandler_tabs(getActiveElementId(), 'DOWN_SELECT'); // added so that after switch tabs the first navigable element in the panel is auto selected
            return true;
            break;

        case KEY_SET.DOWN:
        case "DOWN_SELECT":
	    	if($('#'+activeElementId).hasClass('horizontal') && key == 'DOWN'){
	    		return keyNavigationElementHandler_tabs(activeElementId, "RIGHT_HORIZONTAL");
	    	}
            // remove class
            // get the next element of the sibling of the UL of tabs which has navigation class set
            // add the class to it
            // set the active element variable
            $('#'+activeElementId).removeClass(getActiveClass());
            var x = $('#'+activeElementId);
            //var findUL = $(x).parent().get(0);
            var findParent = $(x).parent().get(0);
            var uncles = $(findParent).nextAll();
            var elementBelow = null;
            // no for loop required here - this is because the platform knows that there is <div>s with panel content after the list, its just a question of picking the right div!
            var t = uncles.get(tabIndex);
			currentTabId = activeElementId;
            elementBelow = searchNavigationClassBelow($(t).children());
            
            if(elementBelow == null){
                newActiveElementId = activeElementId;
            }
            else{
                newActiveElementId = elementBelow.id;
            }
                    
            setActiveElementId(newActiveElementId); 

		//$('#'+activeElementId).addClass(getActiveClass());						
	
		keyHandlerManual(KEY_SET.DOWN);
		/*if((activeElementId.match(/theme-list/))){
			keyHandlerManual(KEY_SET.DOWN);
		}*/	
			
            return true;

        default:
            return true;

    }
}

/**
    @private
    @description RIGHT Key handling for Scroll Panels
    @param {string} activeElementId the element that is currently selected
    @returns {boolean} True if still widget is still in focus, false if not
*/
function tabSelectRIGHT(){
	
	var selected = $("#tabs").tabs( "option", "selected" );
	var numTabs = $("#tabs").tabs("length");
    
    if(selected < (numTabs-1)){
    	$('#tabs').tabs({selected: selected+1});
    	return true;
    }
    else{
    	$('#tabs').tabs({selected: selected});
    	return false;
    }
}

/**
    @private
    @description LEFT Key handling for Scroll Panels
    @param {string} activeElementId the element that is currently selected
    @returns {boolean} True if still widget is still in focus, false if not
*/
function tabSelectLEFT(){
	
	 var selected = $( "#tabs" ).tabs( "option", "selected" );
     if(selected>0){
         $('#tabs').tabs({selected: selected-1});
         return true;
     }
     else{
         $('#tabs').tabs({selected: selected});
         return false;
     }
}

/**
 * @description switch to the tab whose index is passed as a parameter 
 * @param n index of the tab to be switched to
 * @returns False if index is incorrect
 */
function switchToTab(n){
	var numTabs = $("#tabs").tabs("length");
	if(n>numTabs || n <= 0){
		return false;
	}
	$('#tabs').tabs({selected: n-1});
	
	$('#'+getActiveElementId()).removeClass(getActiveClass());
	setActiveElementId("tabs_li_"+(n-1));
    $("#"+getActiveElementId()).addClass(getActiveClass());
	
}
/**
 * return the index of the currently selected tab
 * @return {int} index of the currently selected tab {start index: 1}
 */
function getSelectedTab(){
	var stab = $( "#tabs" ).tabs( "option", "selected" );
	return $( "#tabs" ).tabs( "option", "selected" )+1;
}

/**
    @description Switch to specific panel based on given id
    @param {string} panelId Panel id that the should be switched to
*/
switchPanel = function(newPanelId){
    var currentView = document.getElementById('view').className;
    if(currentView != 'regular'){
	$('.panel_container div').show();
	for (var i=0; i < panels.length; i++){
            if(panels[i].id == newPanelId){
                $('#'+ panels[i].id).show();
                $('#'+ panels[i].id).removeClass('ui-tabs-hide');
            }
            else{
                $('#'+ panels[i].id).hide();
                $('#'+ panels[i].id).addClass('ui-tabs-hide');
            }
        }
	setWidgetElementInFocus(newPanelId);
    }
    else{
	$('.panel_container div').show();
    }
}

/**
    @public
    @description Add Horizontal Class to Navigation Class Object
*/
function addHorizontalClass(){
	var allNavElements = $('.panel_container').find('.navigationClass');
	// add horizontal class to all navigable elements
	for(var i=0; i<allNavElements.length; i++){
		var t = allNavElements.get(i);
		$(t).addClass('horizontal');
	}
}

/**
    @public
    @description Remove Horizontal Class from Navigation Class Object
*/
function removeHorizontalClass(){
	var allNavElements = $('.panel_container').find('.navigationClass');
	// add horizontal class to all navigable elements
	for(var i=0; i<allNavElements.length; i++){
		var t = allNavElements.get(i);
		if($(t).hasClass('horizontal') && $(t).attr('direction') != 'horizontal'){
			$(t).removeClass('horizontal');
		}
	}
}
/* SWITCH VIEW FUNCTIONS */

/**
    @description Switch View Related
    @description Current View Index
*/
var currentViewIndex = 0;

/**
    @description Switch View Related
    @description Array of views. View configuration is defined in example.css
*/
var views = new Array('icon', 'regular', 'small', 'ticker', 'full');

/**
    @description Switch View Related
    @description Switch Widget View. Call by Layout Developers. Implement by Widget Developers
    @param {string} newView New widget view
*/
switchView = function(newView){

	// Set view to newView
	document.getElementById('view').className = newView;
	removeHorizontalClass();
	switch(newView){
		case "icon":
			currentViewIndex = 0;
			switchViewIcon();
			break;
		case "regular":
            currentViewIndex = 1;
			switchViewRegular();
			break;
		case "small":
			currentViewIndex = 2;
			switchViewSmall();
		 	break;
		case "ticker":
			currentViewIndex = 3;
			switchViewTicker();
			break;
		case "full":
			currentViewIndex = 4;
			switchViewFull();
			break;
	}
}

/**
    @description Switch View Related
    @description Switch widget to Icon View
*/
function switchViewIcon(){
    $('#tabs').tabs('disable'); // Remove jQuery Tabs
    $('#background').show(); // Show background w/ Icon Background
    $('.panel_container').hide(); // Hide everything inside panel_container
}

/**
    @description Switch View Related
    @description Switch widget to Regular View
*/
function switchViewRegular(){
    $('#tabs').tabs(); // Use jQuery Tabs
    $('#background').hide(); // Hide background w/ Icon Background
    $('.panel_container').show(); // Show everything inside panel_container
    //$('.panel_container ul').show(); // Show everything inside panel_container
    $('.panel_container .tabs_ul_class').show(); // Hide ul inside panel_container
    var currentPanelIndex = getSelectedTab();
    switchToTab(currentPanelIndex);
}

/**
    @description Switch View Related
    @description Switch widget to Ticker View
*/
function switchViewTicker(){
    $('#background').hide(); // Hide background w/ Icon Background
    $('#tabs').tabs('disable'); // Remove jQuery Tabs
    //$('.panel_container ul').hide(); // Hide ul inside panel_container
    $('.panel_container .tabs_ul_class').hide(); // Hide ul inside panel_container
    var currentPanelIndex = getSelectedTab();
    switchToTab(currentPanelIndex);
    addHorizontalClass();
}

/**
    @description Switch View Related
    @description Switch widget to Small View
*/
function switchViewSmall(){
    $('#background').hide(); // Hide background w/ Icon Background
    $('#tabs').tabs('disable'); // Remove jQuery Tabs

    //$('.panel_container ul').hide(); // Hide ul inside panel_container
    $('.panel_container .tabs_ul_class').hide(); // Hide ul inside panel_container
    var currentPanelIndex = getSelectedTab();
    switchToTab(currentPanelIndex);
}
