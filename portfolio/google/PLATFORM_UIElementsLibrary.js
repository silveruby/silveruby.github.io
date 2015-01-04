/**
@description Creates a text box element from the given parameters
@param textBox the array with the properties of the 
@param textBox.name  name of the text box
@param textBox.id id of the element
@param textBox.maxlength maximum length of the text box 
@param textBox.value initial string displayed on the text box 
@param textBox.size 
@param textBox.cssClassString class associated with the text box
@param textBox.appendElementId the id of the element to append to  
*/

function createTextBoxElement(textBox){
	textBox[0].cssClassString += " navigationClass"; 
    var elementString = "<input type='text' name='"+textBox[0].name+"' id='"+textBox[0].id+"' maxlength='"+textBox[0].maxlength+"' value='"+textBox[0].value+"'size='"+textBox[0].size+"' class='"+textBox[0].cssClassString+"' elementtype='textBox' direction ='horizontal'/>";
    addElementToDOM(elementString, textBox[0].appendElementId);
}


/**
@description Creates a button - does not work if its a form submit button
@param button the array with the properties of the button to be created
@param button.type type of the button
@param button.value value of the button
@param button.id id of the button
@param button.html html between the button tags
@param button.css css class for the button
@param button.callback function to be called when OK is pressed - "click" event is triggered
 */
function createButton(button){
	var elementString = "<button type='"+button[0].type+"' value='"+button[0].value+"' id='"+button[0].id+"' class='"+button[0].cssClassString+" navigationClass' elementtype='button'>"+button[0].html+"</button>";
	addElementToDOM(elementString, button[0].appendTo);
	$('#'+button[0].id).bind('click',button[0].callback);
}


function addElementToDOM(elementString, appendElementId){
    $('#'+appendElementId).append(elementString);
}

/*
 * The $PLATFORM_widgetKeyUP, DOWN, LEFT, RIGHT methods are called whenever the widget developer has no implementation of these functions
 * The element type of the current active element is checked in the switch case
 * Then the element specific key handling function is called keyNavigationElementHandler_LI/tabs
 */

PLATFORM_widgetKeyUP = function(){
    var activeElementId = getActiveElementId();
    var tagName =  $('#'+activeElementId).attr('elementtype');
    // switch-case for various elements
    switch(tagName){
      
        case "textBox":
            return keyNavigationElementHandler_textBox(activeElementId,"UP");

        case "tabs":
        	return keyNavigationElementHandler_tabs(activeElementId,"UP");
        
        case "flippanels":
        	return keyNavigationElementHandler_flippanels(activeElementId,"UP");
                
        case "scrollButton":
        	return keyNavigationElementHandler_scrollPanels(activeElementId, "UP");
        
        // any other element it will be handled by this function 
        default:
            return keyNavigationElementHandler_general(activeElementId,"UP");
            
    }
}

PLATFORM_widgetKeyDOWN = function(){
    var activeElementId = getActiveElementId();
    //var k = $('#'+activeElementId);
    var tagName =  $('#'+activeElementId).attr('elementtype');
    // switch-case for various elements
    switch(tagName){
      
        case "tabs":
            return keyNavigationElementHandler_tabs(activeElementId,"DOWN");

        case "textBox":
            return keyNavigationElementHandler_textBox(activeElementId,"DOWN");

        case "flippanels":
        	return keyNavigationElementHandler_flippanels(activeElementId,"DOWN");
        	
        case "scrollButton":
        	return keyNavigationElementHandler_scrollPanels(activeElementId, "DOWN");
        
        // any other element it will be handled by this function 
        default:
            return keyNavigationElementHandler_general(activeElementId,"DOWN");
    }
}

PLATFORM_widgetKeyRIGHT = function(){
    var activeElementId = getActiveElementId();
    var tagName =  $('#'+activeElementId).attr('elementtype');
    // switch-case for various elements
    switch(tagName){
        case "tabs":
            return keyNavigationElementHandler_tabs(activeElementId,"RIGHT");
        case "textBox":
            return keyNavigationElementHandler_textBox(activeElementId,"RIGHT");
        case "checkboxoptions":
            return keyNavigationElementHandler_checkboxoptions(activeElementId,"RIGHT");
        case "flippanels":
        	return keyNavigationElementHandler_flippanels(activeElementId,"RIGHT");
        	
        // any other element it will be handled by this function 
        default:
            return keyNavigationElementHandler_general( activeElementId, "RIGHT");

    }

}
PLATFORM_widgetKeyLEFT = function(){
    var activeElementId = getActiveElementId();
    var tagName =  $('#'+activeElementId).attr('elementtype');
    
    // switch-case for various elements
    switch(tagName){
        case "tabs":
            return keyNavigationElementHandler_tabs(activeElementId,"LEFT");
        case "textBox":
            return keyNavigationElementHandler_textBox(activeElementId,"LEFT")
        case "checkboxoptions":
            return keyNavigationElementHandler_checkboxoptions( activeElementId, "LEFT");
        case "flippanels":
        	return keyNavigationElementHandler_flippanels(activeElementId,"LEFT");

        // any other element it will be handled by this function 
        default:
            return keyNavigationElementHandler_general(activeElementId, "LEFT");
       
    }
}
PLATFORM_widgetKeyNUMBER = function(num, textFlag){
    var activeElementId = getActiveElementId();
    var tagName =  $('#'+activeElementId).attr('elementtype');
    if(tagName == "textBox"){
        return keyNavigationElementHandler_textBox(activeElementId,"NUMBER", num, textFlag)
    }
    else{
        return -1;
    }
}

PLATFORM_widgetKeyOK =  function(){
        console.log("widgetKeyOk");
	 var activeElementId = getActiveElementId();
	 var tagName =  $('#'+activeElementId).attr('elementtype');
	    // switch-case for various elements
	 switch(tagName){
	        case "button":
	        	return keyNavigationElementHandler_button(activeElementId,"OK");
	        case "inputlistitem":
	        	return keyNavigationElementHandler_inputlistitem(activeElementId,"OK");
	        case "scrollButton":
	        	return keyNavigationElementHandler_scrollPanels(activeElementId,"OK");	       
            default:
	        	return true;
	 }
}

PLATFORM_widgetKeyBACK = function(){
    var activeElementId = getActiveElementId();
    var tagName =  $('#'+activeElementId).attr('elementtype');
    console.log("BACK: " + activeElementId)
    // switch-case for various elements
    switch(tagName){
	        case "scrollButton":
	        	return keyNavigationElementHandler_scrollPanels(activeElementId,"BACK");
            default:
               	return false;
    }
}

var PLATFORM_textBoxEntry = "";
var buffer = [];
function keyNavigationElementHandler_textBox(activeElementId,key, num, textFlag){

    switch(key){
    case "NUMBER":
        if(!textFlag){
        	PLATFORM_textBoxEntry = PLATFORM_textBoxEntry + (num).toString();
        	console.log("hello"+PLATFORM_textBoxEntry);
        	$('#'+activeElementId).val(PLATFORM_textBoxEntry+'|'); // changed
        	console.log("hello"+$('#'+activeElementId).val()); // changed);
    	}
        else{
        	handleTextEntry(activeElementId, num);
        }
        return true;
    case "LEFT":
        PLATFORM_textBoxEntry = $('#'+activeElementId).val();
        PLATFORM_textBoxEntry = PLATFORM_textBoxEntry.substring(0,PLATFORM_textBoxEntry.length-2); // changed
        $('#'+activeElementId).val(PLATFORM_textBoxEntry+'|');
        buffer =[];
        return true;
    case "RIGHT":
    	// empty character buffer 
    	buffer = [];
        return true;
    case "UP":
    	var value = $('#'+activeElementId).val();
    	if(value.substring(value.length-1) == '|'){
    		$('#'+activeElementId).val(value.substring(0,value.length-1));
    	}
        keyNavigationElementHandler_general( activeElementId, "UP");
        return true;
    case "DOWN":
    	var value = $('#'+activeElementId).val();
    	if(value.substring(value.length-1) == '|'){
    		$('#'+activeElementId).val(value.substring(0,value.length-1));
    	}
    	return keyNavigationElementHandler_general( activeElementId, "DOWN");
        	
    }
}

function handleTextEntry(activeElementId, num){
	// 2 - a,b,c 
	// 3 - d,e,f
	// 4 - g, h, i
	// all buffer elements have to be same -- else reset buffer 
	// buffer contains numerical entries - not characters 
	// check character buffer - if same, then take the next letter of the alphabet
	
	// if num is not the same as the character saved in the buffer, empty the buffer 
	// set it to num and add num to the string
	if(num != buffer[0] && buffer.length >= 1){
		buffer = [];
		buffer[0] = num;
	}
	else if(num == buffer[0] || buffer.length < 1){
		
		/*
		 * Delete the character and add if it is the number key pressed only when length of buffer is greater than 0
		 */
		if(PLATFORM_textBoxEntry != '|' && buffer.length >=1 ){
			PLATFORM_textBoxEntry = $('#'+activeElementId).val();
			PLATFORM_textBoxEntry = PLATFORM_textBoxEntry.substring(0,PLATFORM_textBoxEntry.length-2);
			$('#'+activeElementId).val(PLATFORM_textBoxEntry);
		}
		buffer[buffer.length] = num;
	}
	   
	PLATFORM_textBoxEntry = PLATFORM_textBoxEntry + getLetter(num);
	console.log("hello"+PLATFORM_textBoxEntry);
	$('#'+activeElementId).val(PLATFORM_textBoxEntry+'|');
}
setInterval( "resetBuffer()", 2500 );
function resetBuffer(){
	buffer = [];
}
var global_letterArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
function getLetter(num){
	console.log("getLetter- bufferlength -"+ buffer.length);
	var offSet = 0;
	switch(num){
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			return global_letterArray[(num-2)*3+(buffer.length)-1];
		case 8: 
		case 9: 
			return global_letterArray[(num-2)*3+(buffer.length)];
		case 0:
			return global_letterArray[global_letterArray.length-1];
	}
}
/*
 * not used currently
 */
function getTextValue(id){
	var value = $('#'+id).val();
	return value.substring(0,value.length-1);
}

/*
 * Key handling for elements other than that provided by the platform
 * If the down key is pressed - the algorithm is to check for the next navigable element below the current element
 * Find the parent of current element and its siblings (uncles)
 * If the current element has siblings then jump to the first sibling with a navigable element in it else
 * If neither of these exist, then the while loop tries to search for the next navigable element by looping through elements below
 */
function keyNavigationElementHandler_general(activeElementId, key){

    switch(key){
    case "DOWN":
    case "DOWN_HORIZONTAL":
    	/*
    	 * if the current element has the class "horizontal" and its attribute direction is not set to horizontal
    	 * - that means that it is an element that does not have innate horizontal movement and is in the ticker view 
    	 * - so a DOWN key should be interpreted as a tab change or a panel change and hence the method keyNavigationElementHandler_general 
    	 * - is called with the key = RIGHT_HORIZONTAL
    	 */
    	if($('#'+activeElementId).hasClass('horizontal') && key == 'DOWN' && $('#'+activeElementId).attr('direction') != 'horizontal' ){
    		return keyNavigationElementHandler_general(activeElementId, "RIGHT_HORIZONTAL");
    	}
    	
        //when the end of the div panel is reached, it should stay there and not jump panels
        // should check if everything is inside the panel
        // can you check which panel it is
    	
        $('#'+activeElementId).removeClass(getActiveClass());
        var x = $('#'+activeElementId);
        var findParent = $(x).parent().get(0);
        var uncles = $(findParent).nextAll();
        
        var tab_div = false;
        
        /*
         * get the children, parent and siblings of the current element
         * if the value of key = DOWN_HORIZONTAL that means that it was actually a right key pressed
         * searchNavigationClassBelow and searchHorizontalNavigationClassBelow are *same* methods - no difference as of now 
         */
        var xChildren = $(x).children(); // does it have any children?
        var xSiblings = $(x).nextAll();
        var xParent = $(x).parent().get(0);
        
        if(key == "DOWN_HORIZONTAL"){
        	var elementBelowChildren =  searchNavigationClassBelow(xChildren);
        	var elementBelowSiblings =  searchNavigationClassBelow(xSiblings);
        }
        else{
        	var elementBelowChildren =  searchHorizontalNavigationClassBelow(xChildren);
        	var elementBelowSiblings =  searchHorizontalNavigationClassBelow(xSiblings);
        }
        	var elementBelow = null;
        	
                
        
        if((elementBelowChildren) == null) {         	
        	/*
        	 * this means the element doesnt have any children, so check for the next navigable element in it siblings, niece, grand-niece
        	 */
        	if((elementBelowSiblings) == null){ 
        		/*
        		 * call function for parent since siblings is also null
        		 */        	
        		var gparent = x;
        		tab_div = $(gparent).hasClass("ui-tabs-panel"); 
        		/*
        		 * in this while loop stay until gparent (any ancestor above the parent) is undefined and 
        		 * you have not reached the end of the tab panel  
        		 * 
        		 * This is the while loop which takes responsibility to find the next element if the siblings and 
        		 * children of an active element are null. It basically searches recursively in the DOM to find 
        		 * the next navigable element
        		 */
        		while(/*uncles.length < 1 && */ gparent != undefined && elementBelow == null && !tab_div){ // tab_div added so that if its true that means boundary is hit !
        			
        			gparent = $(gparent).parent().get(0);               	  
               	  	uncles = $(gparent).nextAll();
               	  	tab_div = $(gparent).hasClass("ui-tabs-panel");
        		
               	  	if(key == "DOWN_HORIZONTAL"){ 
               	  		elementBelow = searchNavigationClassBelow(uncles);
               	  	}
               	  	else{
               	  		elementBelow = searchHorizontalNavigationClassBelow(uncles);
               	  	}
        		}
        	}
        	else{
        		elementBelow = elementBelowSiblings;
        	}
        }
        else{
        	elementBelow = elementBelowChildren;
        }
          
              
        if(tab_div){
     	   // this if condition checks that if there is no navigable element below the element with directional attribute = horizontal 
     	   // that means its the last element in the panel - so move to the tab below it 
     	   if($('#'+activeElementId).hasClass('horizontal') && key == 'DOWN' && $('#'+activeElementId).attr('direction') == 'horizontal')
     		   return keyNavigationElementHandler_general(activeElementId, 'RIGHT_HORIZONTAL');
     	   
     	   // this means that the current element is the last element in the panel - so no change in the active element
     	   newActiveElementId = activeElementId;  
        }
        else if(elementBelow == null){
        	if($('#'+activeElementId).hasClass('horizontal') && key == 'DOWN' && $('#'+activeElementId).attr('direction') == 'horizontal')
      		   return keyNavigationElementHandler_general(activeElementId, 'RIGHT_HORIZONTAL');        	
        	
        	newActiveElementId = activeElementId;
        }
        else{
            newActiveElementId = elementBelow.id;
        }
        
        $('#'+activeElementId).removeClass(getActiveClass());
        setActiveElementId(newActiveElementId);
        $("#"+newActiveElementId).addClass(getActiveClass());
                
        return true;

    /*
     * Key handling for elements other than that provided by the platform If
	 * the UP key is pressed - the algorithm is to check for the next
	 * navigable element above the current element Find the parent of
	 * current element and its siblings (uncles) If the current element has
	 * siblings then jump to the first sibling with a navigable element in
	 * it else If neither of these exist, then the while loop tries to
	 * search for the next navigable element by looping through elements
	 * below
	 */
        
    case "UP":
    case "UP_HORIZONTAL":

    	/*
    	 * if the current element has the class "horizontal" and its attribute direction is not set to horizontal
    	 * - that means that it is an element that does not have innate horizontal movement and is in the ticker view 
    	 * - so a UP key should be interpreted as a tab change or a panel change and hence the method keyNavigationElementHandler_general 
    	 * - is called with the key = LEFT_HORIZONTAL
    	 */
    	if($('#'+activeElementId).hasClass('horizontal') && key == 'UP' && $('#'+activeElementId).attr('direction') != 'horizontal'){
    		return keyNavigationElementHandler_general(activeElementId, "LEFT_HORIZONTAL");
    	}
    	// remove class from current active element
        $('#'+activeElementId).removeClass(getActiveClass());
        var x = $('#'+activeElementId);            
        
        /*
         * get the children, parent and siblings of the current element
         * if the value of key = UP_HORIZONTAL that means that it was actually a left key pressed
         * searchNavigationClassAbove and searchHorizontalNavigationClassAbove are *same* methods - no difference as of now 
        */
        
        var findParent = $(x).parent().get(0);
        var uncles = $(findParent).prevAll();
                    
        var tab_div = false;
        var flippanels_div = false;
        var xSiblings = $(x).prevAll();
        //var xParent = $(x).parent().get(0);
        if(key == "UP_HORIZONTAL"){
        	var elementAboveSiblings =  searchNavigationClassAbove(xSiblings);
        }
        else{
        	var elementAboveSiblings =  searchHorizontalNavigationClassAbove(xSiblings);
        }
        var elementAbove = null;
        	                
        /*
         *  this means the element doesn't have any children, so check for the next navigable element in it siblings, niece, grand-niece
         */
        if((elementAboveSiblings) == null){ 
        	
        	/*
    		 * in this while loop stay until gparent (any ancestor above the parent) is undefined and 
    		 * you have not reached the end of the tab panel  
    		 * 
    		 * This is the while loop which takes responsibility to find the next element if the siblings and 
    		 * children of an active element are null. It basically searches recursively in the DOM to find 
    		 * the next navigable element
    		 * 
    		 * an extra check for the flippanels is made here 
    		 */
        	var gparent = x; //findParent;
        	while(/*uncles.length < 1 &&*/ gparent != undefined && elementAbove == null && (!tab_div || !flippanels_div)){
        		gparent = $(gparent).parent().get(0);
               	tab_div = $(gparent).hasClass("ui-tabs-panel");
               	if($(gparent).attr('elementtype') == 'flippanels')
               		flippanels_div = true; 
               	uncles = $(gparent).prevAll();
	        	
	        	if(key == "UP_HORIZONTAL"){ 
	        		elementAbove = searchNavigationClassAbove(uncles);
	        	}
	        	else{
	        		elementAbove = searchHorizontalNavigationClassAbove(uncles);
	        	}        
	        	
        	}
        }
        else{
        	elementAbove = elementAboveSiblings;
        }
       // if the next element above should be the tab - we do not need to set it to active - as it is already selected -
       
       if(tab_div){

    	   // this if condition checks that if there is no navigable element above the element with directional attribute = horizontal 
    	   // that means its the first element in the panel - so move to the tab above it 
    	   if($('#'+activeElementId).hasClass('horizontal') && key == 'UP' && $('#'+activeElementId).attr('direction') == 'horizontal')
    		   return keyNavigationElementHandler_general(activeElementId, 'LEFT_HORIZONTAL');
    	   
    	   // this means that there is no other navigable element above this element
           // so move to the tab above
           // if tabs then search inside tabs_ul_class for a li with class = ui-tabs-selected ui-state-active
           // if flippanels - remain in the same element as beforexParent
    	   // if in horizontal case not shift over to highlight tabs/flippanels - this if condition is required because 
    	   
    	   
    	   if(!$('#'+activeElementId).hasClass('horizontal')){
    		   var tab_ul = $(".tabs_ul_class")[0];
    		   var tab_li = $(tab_ul).children(".ui-tabs-selected");
    		   elementAbove = tab_li[0];
    		   newActiveElementId = elementAbove.id;
    	   }
    	   else{
    		   switchToTab(getSelectedTab());
    		   return keyNavigationElementHandler_tabs(getActiveElementId(), 'DOWN_SELECT');
    	   }
    	
        }
       else if(flippanels_div){
    	   // this if condition checks that if there is no navigable element above the element with directional attribute = horizontal 
    	   // that means its the first element in the panel - so move to the panel above it 
    	   if($('#'+activeElementId).hasClass('horizontal') && key == 'UP' && $('#'+activeElementId).attr('direction') == 'horizontal')
    		   return keyNavigationElementHandler_general(activeElementId, 'LEFT_HORIZONTAL');
    	   
    	   return flipToPanel(getCurrentPanelIndex()); 
    	   
       }
       else if(elementAbove == null){
    	   
    	   // this if condition checks that if there is no navigable element above the element with directional attribute = horizontal 
    	   // that means its the first element in the panel - so move to the tab above it 
    	   if($('#'+activeElementId).hasClass('horizontal') && key == 'UP' && $('#'+activeElementId).attr('direction') == 'horizontal')
    		   return keyNavigationElementHandler_general(activeElementId, 'LEFT_HORIZONTAL');
    	   newActiveElementId = activeElementId;
        }
        else{
            newActiveElementId = elementAbove.id;
        }
                   
        setActiveElementId(newActiveElementId);
        $("#"+newActiveElementId).addClass(getActiveClass());
        
        return true;

    /*
     * in case of a ticker - there is restriction to only left to right
     * (horizontal navigation) - no up down navigation
     * 
     */
    case "RIGHT":
    case "RIGHT_HORIZONTAL":
    	if(($('#'+activeElementId).hasClass('horizontal') && key == 'RIGHT') || $('#'+activeElementId).attr('direction') == 'horizontal' ){
    		return keyNavigationElementHandler_general(activeElementId, "DOWN_HORIZONTAL");
    	}
    	
    	var ifTabs = $('#tabs').find('#'+activeElementId);  
    	if(ifTabs.length > 0){
    		// find the parent of the current active element which has main class and that will have the index attribute as the panel 
    		switchToTab(getSelectedTab()+1); 
    		keyNavigationElementHandler_tabs(getActiveElementId(), 'DOWN_SELECT'); // added so that after switch tabs the first navigable element in the panel is auto selected
    		return true; 
    	}
    	/*
    	if(($('#'+activeElementId).attr("elementtype")) == "flippanels"){
    		// then the active element is flippanel so just switch to next panel!
    		
    	}*/
    	var ifFlipPanels = $('#'+activeElementId).parents("[elementtype=flippanels]");
    	console.log(ifFlipPanels)
    	if(ifFlipPanels.length > 0){
    		// this works by setting the flip panel element as the active element and then passing the control to the flippanel_RIGHT method
    		var panelId = ifFlipPanels[0];
    		panelId = $(panelId).attr('id');
    		$('#'+activeElementId).removeClass(getActiveClass());
    		setActiveElementId(panelId);
    		//$('#'+panelId).addClass(getActiveClass());
    		keyNavigationElementHandler_flippanels_RIGHT(panelId);
    	}
    	return true;
    	
    case "LEFT":
    case "LEFT_HORIZONTAL":
    	if(($('#'+activeElementId).hasClass('horizontal') && key == 'LEFT') || $('#'+activeElementId).attr('direction') == 'horizontal'){
    		return keyNavigationElementHandler_general(activeElementId, "UP_HORIZONTAL");
    	}
    	
    	var ifTabs = $('#tabs').find('#'+activeElementId); //.parents("[elementtype=tabs]");
    	if(ifTabs.length > 0){
     		switchToTab(getSelectedTab()-1);
    		keyNavigationElementHandler_tabs(getActiveElementId(), 'DOWN_SELECT'); // added so that after switch tabs the first navigable element in the panel is auto selected
            return true;
    	}
    	// this works by setting the flip panel element as the active element and then passing the control to the flippanel_RIGHT method
    	var ifFlipPanels = $('#'+activeElementId).parents("[elementtype=flippanels]");
    	console.log(ifFlipPanels)
    	if(ifFlipPanels.length > 0){
    		var panelId = ifFlipPanels[0];
    		panelId = $(panelId).attr('id');
    		$('#'+activeElementId).removeClass(getActiveClass());
    		setActiveElementId(panelId);
    		//$('#'+panelId).addClass(getActiveClass());
    		keyNavigationElementHandler_flippanels_LEFT(panelId);    	
    	}
    	return true;	
    }

}

function keyNavigationElementHandler_button(activeElementId, key){
	$('#'+activeElementId).trigger('click');
	return true;
}


/*
 * This method is different from searchHorizontalNavigationClassBelow -
 * This method searches for any element that is below it 
 * that has the navigationClass, is not hidden and DOES NOT HAVE horizontal class attached with it
 */

function searchNavigationClassBelow(searchArray){
	var elementBelow = null;
	if(searchArray.length < 1){
		return elementBelow;
	}
	
	for(var j=0;j<searchArray.length;j++){
	    var t = searchArray.get(j);
	    if($(t).hasClass("navigationClass") && !($(t).is(':hidden'))){
	        elementBelow = t;
	        return elementBelow;
	    }
	    else if($(t).find(".navigationClass")[0] != undefined && !($(t).is(':hidden'))){  
	        elementBelow = $(t).find(".navigationClass")[0];
	        if(!($(elementBelow).is(':hidden')))
	        	return elementBelow;
	    }	//
	    else{
	        elementBelow = null;
	    }
	  
	}
	return elementBelow;
}

/*
 * This method is different from searchNavigationClassBelow -
 * This method searches for any element that is below it and has the horizontal and navigationClass classes and is not hidden
 * If it does not find any element with class horizontal it will stay there 
 * for an element that has innate horizontal navigation functionality - sliding checkboxes or sliders - for them down key will be the way to escape the element
 */


function searchHorizontalNavigationClassBelow(searchArray){
	var elementBelow = null;
	if(searchArray.length < 1){
		return elementBelow;
	}
	
	for(var j=0;j<searchArray.length;j++){
	    var t = searchArray.get(j);
	    if($(t).hasClass("navigationClass") /*&& !($(t).hasClass("horizontal"))*/ && !($(t).is(':hidden'))){
	        elementBelow = t;
	        return elementBelow;
	    }
	    else if($(t).find(".navigationClass")[0] != undefined && !($(t).is(':hidden'))){  
	        elementBelow = $(t).find(".navigationClass")[0];
	        if(/*!($(elementBelow).hasClass("horizontal")) &&*/  !($(elementBelow).is(':hidden'))){
	        	return elementBelow;
	        }
	    }
	    else{
	        elementBelow = null;
	    }
	   
	}
	 return elementBelow;
}

/*
 * This method searches for any element that is above it and has the navigationClass and is not hidden
 */

function searchNavigationClassAbove(searchArray){
	var elementAbove = null;
	if(searchArray.length < 1){
		return elementAbove;
	}
	var t;
	for(var j=0;j<searchArray.length;j++){
        t = searchArray.get(j);
        if($(t).hasClass("navigationClass") && !($(t).is(':hidden'))){
            elementAbove = t;
            return elementAbove;
         
        }
        else if($(t).find(".navigationClass").get(-1) != undefined){
            elementAbove = $(t).find(".navigationClass").get(-1);
            if(!($(elementAbove).is(':hidden')))
            	return elementAbove;
        }
        else{
            elementAbove = null;
        }
        
    }
    return elementAbove
}
/*
 * This method is the *same* as searchNavigationClassAbove -
 * This method searches for any element that is above and has the navigationClass and is not hidden
 */

function searchHorizontalNavigationClassAbove(searchArray){
	var elementBelow = null;
	if(searchArray.length < 1){
		return elementBelow;
	}
	var t, tmp;
	for(var j=0;j<searchArray.length;j++){
        t = searchArray.get(j);
        tmp = $(t).find(".navigationClass");
    	console.log(tmp);
        if($(t).hasClass("navigationClass") && !($(t).is(':hidden'))){// && !($(t).hasClass("horizontal"))){
            return elementAbove = t;
         
        }
        else if($(t).find(".navigationClass").get(-1) != undefined && !($(t).is(':hidden'))){
        	tmp = $(t).find(".navigationClass");
        	console.log(tmp);
        	elementAbove = $(t).find(".navigationClass").get(-1);
        	//if(!($(elementBelow).hasClass("horizontal"))){
        	 if(!($(elementAbove).is(':hidden')))	
        		 return elementAbove;
        	//}
        }
        else{
            elementAbove = null;
        }
        
    }
    return elementAbove;
}
