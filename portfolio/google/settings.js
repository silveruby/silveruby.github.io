
/** SETTING PANEL **/

function createSettingPanel(){
	$("<div class='ui-state-active' id='setting_border'></div>").appendTo('#setting_panel'); // the big colored horizontal border
	
	$("<div class='setting_container' id='setting_profile'></div>").appendTo('#setting_panel');
	$("<div class='setting_container' id='setting_personal'></div>").appendTo('#setting_panel');

	/** headers **/
	$("<div id='setting_profile_header'>Profile</div><div id='setting_profile_info'></div>").appendTo('#setting_profile');
	$("<div id='setting_personal_header'>Personal Settings</div><div id='setting_personal_info'></div>").appendTo('#setting_personal');
	
	/** Profile Info **/
	//var p = getPlatform();
	//var name = p.userIdentification[0].name;
	var name = "Ruby";
	//var imageUrl = p.userIdentification[0].image;
	var imageUrl = "";
	
	$("<div id='setting_profile_icon' class='ui-corner-all'><img src='" + imageUrl + "' width='90px' height='90px'></div>").appendTo('#setting_profile_info');	
	$("<div id='setting_profile_name' class='setting_style'>" + name + "</div>").appendTo('#setting_profile_info');	
	//$("<div id='setting_profile_gender' class='setting_style'>Female</div>").appendTo('#setting_profile_info');	
	$("<div id='setting_profile_location' class='setting_style'>Atlanta, GA</div>").appendTo('#setting_profile_info');	
	
	/** Personal Settings Info **/
	var nadu = new Array({email: 'nadu@gatech.edu', phone: '(123) 000-0001', paymentMethod: 'Visa', cardInfo: '****1234'});
	var mano = new Array({email: 'mano@gatech.edu', phone: '(123) 000-0002', paymentMethod: 'MasterCard', cardInfo: '****1235'});
	var ruby = new Array({email: 'rubyz@gatech.edu', phone: '(123) 000-0003', paymentMethod: 'American Express', cardInfo: '****1236'});	
	
	var person;
	
	if (name == 'Ruby Zheng'){
		person = ruby;
	}
	else if (name == 'Manohar Ganesan'){
		person = mano;
	}
	else {
		person = ruby;
	}
	
	$("<div id='setting_personal_info_email' class='setting_style'><strong>Email</strong>: " + person[0].email + "</div>").appendTo('#setting_personal_info');	
	$("<div id='setting_personal_info_phone' class='setting_style'><strong>Phone</strong>: " + person[0].phone + "</div>").appendTo('#setting_personal_info');	
	$("<div id='setting_personal_info_payment' class='setting_style'><strong>Payment Method</strong>: " + person[0].paymentMethod + "</div>").appendTo('#setting_personal_info');	
	$("<div id='setting_personal_info_cardInfo' class='setting_style'><strong>Card Information</strong>: " + person[0].cardInfo + " </div>").appendTo('#setting_personal_info');	
	
}
