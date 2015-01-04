function init(){
	var mygallery=new simpleGallery({
		wrapperid: "simplegallery1", //ID of main gallery container,
		dimensions: [360, 270], //width/height of gallery in pixels. Should reflect dimensions of the images exactly
		imagearray: [
			["./view_full_screen.png", "", "", "Full Screen"],
			["./view_half_screen.png", "", "", "Half Screen"],
			["./view_icon.png", "", "", "Icon"],
			["./view_one_line.png", "", "", "One Line"],
			["./view_regular.png", "", "", "Regular"],
			["./view_small.png", "", "", "Small"],
			["./view_ticker.png", "", "", "Ticker"]														
		],
		autoplay: [false, 2500, 2], //[auto_play_boolean, delay_btw_slide_millisec, cycles_before_stopping_int]
		persist: false, //remember last viewed slide and recall within same session?
		fadeduration: 500, //transition duration (milliseconds)
		oninit:function(){ //event that fires when gallery has initialized/ ready to run
			//Keyword "this": references current gallery instance (ie: try this.navigate("play/pause"))
		},
		onslide:function(curslide, i){ //event that fires after each slide is shown
			//Keyword "this": references current gallery instance
			//curslide: returns DOM reference to current slide's DIV (ie: try alert(curslide.innerHTML)
			//i: integer reflecting current image within collection being shown (0=1st image, 1=2nd etc)
		}
	})
	
	var mygallery=new simpleGallery({
		wrapperid: "simplegallery2", //ID of main gallery container,
		dimensions: [768, 576], //width/height of gallery in pixels. Should reflect dimensions of the images exactly
		imagearray: [
			["./TV_MaxView_MultipleApp_1.png", "", "", "For Multiple Widgets"],
			["./TV_MinView_MultipleApp_1.png", "", "", "For Multiple Widgets"],
			["./TV_RegularView_MultipleApp_1.png", "", "", "For Multiple Widgets"],
			["./TV_RegularView_MultipleApp_2.png", "", "", "For Multiple Widgets"],
			["./TV_RegularView_MultipleApp_3.png", "", "", "For Multiple Widgets"],
			["./TV_RegularView_SingleApp_1.png", "", "", "For Single Widgets"],
			["./TV_RegularView_SingleApp_2.png", "", "", "For Single Widgets"],
			["./TV_RegularView_SingleApp_3.png", "", "", "For Single Widgets"]																
		],
		autoplay: [false, 2500, 2], //[auto_play_boolean, delay_btw_slide_millisec, cycles_before_stopping_int]
		persist: false, //remember last viewed slide and recall within same session?
		fadeduration: 500, //transition duration (milliseconds)
		oninit:function(){ //event that fires when gallery has initialized/ ready to run
			//Keyword "this": references current gallery instance (ie: try this.navigate("play/pause"))
		},
		onslide:function(curslide, i){ //event that fires after each slide is shown
			//Keyword "this": references current gallery instance
			//curslide: returns DOM reference to current slide's DIV (ie: try alert(curslide.innerHTML)
			//i: integer reflecting current image within collection being shown (0=1st image, 1=2nd etc)
		}
	})
	
	var mygallery=new simpleGallery({
		wrapperid: "simplegallery3", //ID of main gallery container,
		dimensions: [768, 576], //width/height of gallery in pixels. Should reflect dimensions of the images exactly
		imagearray: [
			["./TV_RegularView.png", "", "", "Regular Layout"],
			["./TV_SmallView.png", "", "", "Small Layout"],
			["./TV_IconView.png", "", "", "Icon Layout"]																
		],
		autoplay: [false, 2500, 2], //[auto_play_boolean, delay_btw_slide_millisec, cycles_before_stopping_int]
		persist: false, //remember last viewed slide and recall within same session?
		fadeduration: 500, //transition duration (milliseconds)
		oninit:function(){ //event that fires when gallery has initialized/ ready to run
			//Keyword "this": references current gallery instance (ie: try this.navigate("play/pause"))
		},
		onslide:function(curslide, i){ //event that fires after each slide is shown
			//Keyword "this": references current gallery instance
			//curslide: returns DOM reference to current slide's DIV (ie: try alert(curslide.innerHTML)
			//i: integer reflecting current image within collection being shown (0=1st image, 1=2nd etc)
		}
	})
}