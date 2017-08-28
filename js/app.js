
var secondSection = $('.second-section');
var leftArea = $('.second-section');

var mainNextButton = $('.main-form-field .next-button');
var secondNextButton = $('.right-area .next-button');
var secondBackArrow = $('.second-section .back-arrow-text');
var firstInput = $('.first-input-container input');
var secondInput = $('.second-input-container input');
var bitcoinWalletAddress = $('.bitcoin-wallet-address');
var emailInput = $('.email');
var checkedFirst = $('.checked-first');
var checkedSecond = $('.checked-second');
var wrongWallet = $('.wrong-wallet');
var wrongEmail = $('.wrong-email');
var rightArea = $('.right-area');
var rightAreaCheck = $('.right-area-check');
var successButton = $('.next-button-success');
var errorButton = $('.next-button-error');
var rightAreaSuccess = $('.right-area-success');
var newPaymentButton = $('.new-payment');
var rightAreaError = $('.right-area-error');
var payAgainButton = $('.pay-again');
var newPaymentAfterError = $('.right-area-error .new-payment');

firstInput.on('input',function () {
	var usdVal = $(this).val();
	secondInput.val((usdVal*0.00023).toFixed(5));
	if ($(this).val()<0){
		$(this).val(0);
	}
	if(secondInput.val() < 0){
		secondInput.val(0);
	}
	$('.first-input-container, .second-input-container').removeClass('warning');
	buttonActivation(mainNextButton);
});
secondInput.on('input',function () {
	var btcVal = $(this).val();
	firstInput.val((btcVal/0.00023).toFixed(2));
	if ($(this).val()<0){
		$(this).val(0);
	}
	if(firstInput.val() < 0){
		firstInput.val(0);
	}
	$('.first-input-container, .second-input-container').removeClass('warning');
	buttonActivation(mainNextButton);
});

mainNextButton.click(function () {
	$('#1').fadeOut('normal', function(){ $('#2').fadeIn('normal'); });
	var chosenUsd  = firstInput.val();
	var chosenBtc  = secondInput.val();
	$('.usd-second-span').text(chosenUsd);
	$('.btc-second-span').text(chosenBtc);
	$('.back-arrow-container').show();
});
secondBackArrow.click(function () {
	if (rightAreaCheck.is(":visible")) {
		rightAreaCheck.fadeOut('normal', function(){ rightArea.fadeIn('normal'); });
	} else {
		$('#2').fadeOut('normal', function(){ $('#1').fadeIn('normal'); });
	}


});

$('.first-input-container input,.second-input-container input').blur(function(){
	if( !$(this).val() || $(this).val() <= 0) {
		console.log($(this).val());
		$(this).parent().addClass('warning');
		buttonDeactivation(mainNextButton);
	}
});

if (!firstInput.val() || !secondInput.val() || firstInput.val() <= 0 || secondInput.val() <= 0) {
	buttonDeactivation(mainNextButton);
}

// --------

if (!bitcoinWalletAddress.val() || !emailInput.val()) {
	buttonDeactivation(secondNextButton);
}
bitcoinWalletAddress.on('input',function () {
	buttonActivation(secondNextButton);
	if(bitcoinWalletAddress.val().length >= 26 && bitcoinWalletAddress.val().length <= 35){
		bitcoinWalletAddress.removeClass('warning');
		checkedFirst.show();
		wrongWallet.hide();
	} else {
		checkedFirst.hide();
	}
});
emailInput.on('input',function () {
	buttonActivation(secondNextButton);
	if(isValidEmailAddress(emailInput.val()) === true){
		emailInput.removeClass('warning');
		wrongEmail.hide();
		checkedSecond.show();
	} else {
		checkedSecond.hide();
	}

});
secondNextButton.click(function () {
	if (bitcoinWalletAddress.val().length < 26 || bitcoinWalletAddress.val().length > 35) {
		bitcoinWalletAddress.addClass('warning');
		wrongWallet.show();
		$('.btc-address').text('...in progress');
	}
	if(isValidEmailAddress(emailInput.val()) === false){
		emailInput.addClass('warning');
		wrongEmail.show();
	}
	if(checkedFirst.is(":visible") && checkedSecond.is(":visible")){
		rightArea.fadeOut('normal', function(){ rightAreaCheck.fadeIn('normal'); });
		$('.btc-address').text(bitcoinWalletAddress.val());
		$('.btc-address-container').show();
	}

});

// -----

successButton.click(function () {
	rightAreaCheck.fadeOut('normal', function(){ rightAreaSuccess.fadeIn('normal'); });
	$('.second-section').addClass('success-gradient');
	$('.left-area').addClass('success-left-side-gradient');
	$('.t-hash').text(bitcoinWalletAddress.val());
	$('.transaction-hash-container').show();
	$('.we-accept-block').hide();
	$('.back-arrow-container').hide();
});

newPaymentButton.click(function () {
	$('#2').fadeOut('normal', function(){ $('#1').fadeIn('normal'); });
	resetState();
});
//------
errorButton.click(function () {
	rightAreaCheck.fadeOut('normal', function(){ rightAreaError.fadeIn('normal'); });
	$('.second-section').addClass('error-gradient');
	$('.left-area').addClass('error-left-side-gradient');
	$('.t-hash').text('---');
	$('.transaction-hash-container').show();
	rightAreaError.hide();
	$('.we-accept-block').hide();
	$('.back-arrow-container').hide();
});
//------

payAgainButton.click(function () {
	rightAreaError.fadeOut('normal', function(){ rightAreaCheck.fadeIn('normal'); });
	$('.we-accept-block').show();
	$('.second-section').removeClass('error-gradient');
	$('.left-area').removeClass('error-left-side-gradient');
	$('.back-arrow-container').show();
});

//------

$('.terms-of-use').click(function () {
	$('.terms-of-use-container').show();
});
$('.terms-cross').click(function () {
	$('.terms-of-use-container').hide();
});


//-----

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
	rightAreaSuccess.hide();
	rightArea.show();
	$('.second-section').removeClass('success-gradient');
	$('.left-area').removeClass('success-left-side-gradient');
	rightAreaError.hide();
	$('.second-section').removeClass('error-gradient');
	$('.left-area').removeClass('error-left-side-gradient');
	$('.transaction-hash-container').hide();
	$('.transaction-hash-container').val('');
	firstInput.val('');
	secondInput.val('');
	$('.we-accept-block').show();
	$('.back-arrow-container').hide();
}