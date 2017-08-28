
var area = {
	left:$('.left-area'),
	right:$('.right-area'),
	payment:$('.right-area-payment'),
	success:$('.right-area-success'),
	error:$('.right-area-error')
};
var button = {
	mainNext:$('.main-form-field .next-button'),
	secondNext:$('.right-area .next-button'),
	success:$('.next-button-success'),
	error:$('.next-button-error'),
	newPayment:$('.new-payment'),
	payAgain:$('.pay-again'),
	backArrow:$('.second-section .back-arrow-text'),
	terms:$('.terms-of-use'),
	cross:$('.terms-cross')
};
var container = {
	weAccept: $('.we-accept-container'),
	transHash:$('.transaction-hash-container'),
	back:$('.back-arrow-container'),
	btc:$('.btc-address-container'),
	terms:$('.terms-of-use-container')
};
var input = {
	usd:$('.first-input-container input'),
	btc:$('.second-input-container input'),
	wallet:$('.bitcoin-wallet-address'),
	email:$('.email')
};

var notification = {
	checkedWallet:$('.checked-first'),
	checkedEmail:$('.checked-second'),
	wrongWallet:$('.wrong-wallet'),
	wrongEmail:$('.wrong-email')
};
var section = {
	first:$('#1'),
	second:$('#2')
};
var text = {
	savedFor:$('.saved-for-text'),
	weAccept: $('.we-accept-text'),
	usdSpan: $('.usd-second-span'),
	btcSpan: $('.btc-second-span'),
	btcAddress: $('.btc-address'),
	transHash: $('.t-hash')
};

input.usd.on('input',function () {
	var usdVal = $(this).val();
	input.btc.val((usdVal*0.00023).toFixed(5));
	if ($(this).val()<0){
		$(this).val(0);
	}
	if(input.btc.val() < 0){
		input.btc.val(0);
	}
	$('.first-input-container, .second-input-container').removeClass('warning');
	buttonActivation(button.mainNext);
});

input.btc.on('input',function () {
	var btcVal = $(this).val();
	input.usd.val((btcVal/0.00023).toFixed(2));
	if ($(this).val()<0){
		$(this).val(0);
	}
	if(input.usd.val() < 0){
		input.usd.val(0);
	}
	$('.first-input-container, .second-input-container').removeClass('warning');
	buttonActivation(button.mainNext);
});

button.mainNext.click(function () {
	section.first.fadeOut('normal', function(){ section.second.fadeIn('normal'); });
	var chosenUsd  = input.usd.val();
	var chosenBtc  = input.btc.val();
	text.usdSpan.text(chosenUsd);
	text.btcSpan.text(chosenBtc);
	container.back.show();
	text.weAccept.css('color','black');
});

button.backArrow.click(function () {
	if (area.payment.is(":visible")) {
		area.payment.fadeOut('normal', function(){ area.right.fadeIn('normal'); });
	} else {
		section.second.fadeOut('normal', function(){
			section.first.fadeIn('normal');
			text.weAccept.css('color','#999999');
		});
	}
});

$('.first-input-container input,.second-input-container input').blur(function(){
	if( !$(this).val() || $(this).val() <= 0) {
		console.log($(this).val());
		$(this).parent().addClass('warning');
		buttonDeactivation(button.mainNext);
	}
});

if (!input.usd.val() || !input.btc.val() || input.usd.val() <= 0 || input.btc.val() <= 0) {
	buttonDeactivation(button.mainNext);
}

// --------

if (!input.wallet.val() || !input.email.val()) {
	buttonDeactivation(button.secondNext);
}
input.wallet.on('input',function () {
	buttonActivation(button.secondNext);
	if(input.wallet.val().length >= 26 && input.wallet.val().length <= 35){
		input.wallet.removeClass('warning');
		notification.checkedWallet.show();
		notification.wrongWallet.hide();
	} else {
		notification.checkedWallet.hide();
	}
});
input.email.on('input',function () {
	buttonActivation(button.secondNext);
	if(isValidEmailAddress(input.email.val()) === true){
		input.email.removeClass('warning');
		notification.wrongEmail.hide();
		notification.checkedEmail.show();
	} else {
		notification.checkedEmail.hide();
	}

});
button.secondNext.click(function () {
	if (input.wallet.val().length < 26 || input.wallet.val().length > 35) {
		input.wallet.addClass('warning');
		notification.wrongWallet.show();
		text.btcAddress.text('...in progress');
	}
	if(isValidEmailAddress(input.email.val()) === false){
		input.email.addClass('warning');
		notification.wrongEmail.show();
	}
	if(notification.checkedWallet.is(":visible") && notification.checkedEmail.is(":visible")){
		area.right.fadeOut('normal', function(){ area.payment.fadeIn('normal'); });
		text.btcAddress.text(input.wallet.val());
		container.btc.show();
	}

});

// -----

button.success.click(function () {
	area.payment.fadeOut('normal', function(){
		area.success.fadeIn('normal');
	});
	section.second.addClass('success-gradient');
	area.left.addClass('success-left-side-gradient');
	text.transHash.text(input.wallet.val());
	container.transHash.show();
	container.weAccept.hide();
	container.back.hide();
	text.savedFor.html('<b>Completed</b> @'+ getCurrentTime());
});

button.newPayment.click(function () {
	section.second.fadeOut('normal', function(){ section.first.fadeIn('normal'); });
	setTimeout(function () {
		resetState();
	},400);

});

//------

button.error.click(function () {
	area.payment.fadeOut('normal', function(){
		area.error.fadeIn('normal');
	});
	section.second.addClass('error-gradient');
	area.left.addClass('error-left-side-gradient');
	text.transHash.text('---');
	container.transHash.show();
	area.error.hide();
	container.weAccept.hide();
	container.back.hide();
	text.savedFor.html('<b>Completed</b> @'+ getCurrentTime());

});

//------

button.payAgain.click(function () {
	area.error.fadeOut('normal', function(){ area.payment.fadeIn('normal'); });
		container.weAccept.show();
		section.second.removeClass('error-gradient');
		area.left.removeClass('error-left-side-gradient');
		container.back.show();
		text.savedFor.html('Exchange rate saved for <b>15:46</b>');
});

//------

button.terms.click(function () {
	container.terms.show();
});
button.cross.click(function () {
	container.terms.hide();
});


//-----
function getCurrentTime(){
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
		"July", "Aug", "Sept", "Oct", "Nov", "Dec"
	];
	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes();
	var month = dt.getMonth();
	var day = dt.getDate();

	var date = dt.getFullYear() + ' ' + monthNames[month] + ' '+ ((''+day).length<2 ? '0' : '') + day;
	return time + ', ' + date;
}
function isValidEmailAddress(emailAddress) {
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
}

function buttonDeactivation(button){
	button.prop("disabled",true);
	button.addClass('deactivated');
}
function buttonActivation(button){
	button.prop("disabled",false);
	button.removeClass('deactivated');
}
function resetState() {
	area.success.hide();
	area.right.show();
	section.second.removeClass('success-gradient');
	area.left.removeClass('success-left-side-gradient');
	area.error.hide();
	section.second.removeClass('error-gradient');
	area.left.removeClass('error-left-side-gradient');
	container.transHash.hide();
	container.transHash.val('');
	input.usd.val('');
	input.btc.val('');
	container.weAccept.show();
	container.back.hide();
	text.savedFor.html('Exchange rate saved for <b>15:46</b>');
	text.weAccept.css('color','#999999');
	buttonDeactivation(button.mainNext);
}