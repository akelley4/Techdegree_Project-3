// do stuff when the DOM is ready
$(document).ready(function() {
});
//variable tracking total cost of registration
let total = 0;
const selectPay = $('#payment');
// put the first field in the 'focus' state'
$( "#name").focus();
// this hides the option initially and shows if JavaScript is disabled
$( "#other-title").hide();
// function to show job option field if selected and hide otherwise.
$('#title').change(function() {

  if ( $(this).val() === "other" ) {

    $("#other-title").show();

  }

  else {

    $("#other-title").hide();

  }

});
/* hide the 'select theme' option element in the 'design' menu;
grabs the first id option (0) and sets text as "" */
$('#design option').eq(0).text("");
/* update the 'color' field to read 'Please select a T-Shirt theme';
selected='selected' will make it selected */
 $('#color option:first').before("<option selected= 'selected'>Please select a T-Shirt theme</option>");
 // hide the colors in the 'color' drop down menu
 $('#color option').hide();

// function and condition created to show only appropriate colors for each theme that is selected
$("#design").change(function() {
// id for all the colors
$("#colors-js-puns").show();
//these certain colors will only show if theme js puns is selected
  if($("#design option:selected").val() === "js puns"){
// adding option 'selected, true' allows for design selection to be updated when user chooses
    $("#color option[value='cornflowerblue']").attr("selected", true);
    $("#color option[value='darkslategrey']").show();
    $("#color option[value='gold']").show();
    $("#color option[value='cornflowerblue']").show();

    $("#color option[value='tomato']").hide();
    $("#color option[value='steelblue']").hide();
    $("#color option[value='dimgrey']").hide();

} else {
    $("#color option[value='cornflowerblue']").hide();
    $("#color option[value='darkslategrey']").hide();
    $("#color option[value='gold']").hide();

    $("#color option[value='tomato']").attr("selected", true);
    $("#color option[value='tomato']").show();
    $("#color option[value='steelblue']").show();
    $("#color option[value='dimgrey']").show();

    }
});

// create an element to display the total activity cost, append to activity section
$("<div>").addClass("total").text("The total cost for activities is $" + total).
css("color", "red").insertAfter($(".activities"));


//Add an event listener to the parent element of all of the checkboxes.
$('[type="checkbox"]').click( (event) => {
//target the element that was just clicked and store in a variable
const clickedInput = $(event.target);
//store the value of the text content for the label
const text = clickedInput.parent().text();
//get the index value of the $ in the string
const $index = text.indexOf('$');
//get the cost of the workshop by using a slice from the $index (+1 to get just the number), and the length of the string
let cost = text.slice($index +1 , text.length);
//parse cost to an int for easy math
cost = parseInt(cost);
//if checkbox is checked add to total
if(clickedInput.is(':checked')){
  total += cost;
} else {
  //else if checkbox is unchecked, minus from total
  total -= cost;
}
$('.total').text("Total: $" + total);

//disable conflicting workshops
//get the index of the hyphen in the text
const dashIndex = text.indexOf('—');
//get the index of the comma in the text
const commaIndex = text.indexOf(',');
//get the string of day and time from the text
const dayAndTime = text.slice(dashIndex + 1, commaIndex);
//select the checkboxes
const checkboxes = $('[type="checkbox"]');
//loop through all checkboxes
for(let i = 0; i < checkboxes.length; i++){
  //store in a variable
  let checkboxText = checkboxes[i].parentElement.textContent;
//check if day and time are contained in the text of other options, and check that it is not the same option
    if(checkboxText.includes(dayAndTime) && text !== checkboxText){
      //if clickedInput is checked, disable conflicting options, and change text to grey
      if(clickedInput.is(':checked')){
    $('[type="checkbox"]').eq(i).attr("disabled", true);
    $('[type="checkbox"]').eq(i).parent().css("color", "dimgrey");
    } else {
      //else if unchecked, reactivate element, and change text to black.
      $('[type="checkbox"]').eq(i).attr("disabled", false);
      $('[type="checkbox"]').eq(i).parent().css("color", "black");
    }
  }
}

});

// hide the select method option in payments section
$('#payment').find('option:eq(0)').remove();
// hides all paragraph elements
$("p").hide();
//shows the first paragraph which contains the total
$("div:first").show();

// variables to hold payment section info
const creditPayment= $(".credit-card");
const paypalPayment= $("p").eq(0);
const bitcoinPayment= $("p").eq(1);

// function that shows/hides payment options
$('#payment').change(function() {
  if ( $(this).val() === "credit card" ) {

  creditPayment.prop('selected', true);
  $(".credit-card").attr('hidden', false);
  paypalPayment.hide();
  bitcoinPayment.hide();

}

else if ( $(this).val() === "paypal" ) {

  paypalPayment.prop('selected', true);
  $(".credit-card").attr('hidden', true);
  paypalPayment.show();
  bitcoinPayment.hide();

}

else if ( $(this).val() === "bitcoin" ) {

  bitcoinPayment.prop('selected', true);
  $(".credit-card").attr('hidden', true);
  paypalPayment.hide();
  bitcoinPayment.show();

}

});


// validation inputs
const name = $('#name');
const email = $('#mail');
const creditCardNum = $('#cc-num');
const zipNum = $('#zip');
const cvv = $('#cvv');

//regex valdiation
const regexName =  /[\d+\!\"#\$%&\(\)\=\/*-+\|@`\']/
const regexEmail = /(\w+@\w+)(\.com|\.net|\.co)/;
const regexCreditCard = /^(?:\d[ -]*?){13,16}$/;
const regexZip = /^(\d{5})$/;
const regexCVV = /^\d{3}$/;

//Tooltips for input and credit card validation
const nameToolTip = $('<p class="tooltip">Required field</p>');
nameToolTip.insertBefore("#name");
nameToolTip.hide();

const emaillToolTip = $('<p class="tooltip">Required field</p>');
emaillToolTip.insertBefore('#mail');
emaillToolTip.hide();

const activitiesToolTip = $('<p class="tooltipActivities">Required field</p>');
activitiesToolTip.insertBefore(".activities");
activitiesToolTip.hide();

const creditCardToolTip =  $('<p class="TooltipCC">Required field</p>');
creditCardToolTip.insertBefore("#cc-num");
creditCardToolTip.hide();

const zipToolTip =  $('<p class="TooltipCC">Required field</p>');
zipToolTip.insertBefore("#zip");
zipToolTip.hide();

const cvvToolTip =  $('<p class="TooltipCC">Required field</p>');
cvvToolTip.insertBefore("#cvv");
cvvToolTip.hide();

//checking input fields for validity and showing tool tips
function validName(name) {
    if (name.val() === "" || regexName.test(name.val())) {
         nameToolTip.show()
        name.css('borderColor', 'red');
        return false;
    }

        name.css('borderColor', 'green');
         return true;
}

function validEmail(email) {
    if (email.val() === "" || !(regexEmail.test(email.val())) ) {
        emaillToolTip.show();
        email.css('borderColor', 'red');
          return false;
      }
      email.css('borderColor', '#cldeeb');
      return true;
}

function validActivity(activities) {

    if(activities === 0) {
        activitiesToolTip.show()
        $('.activities').css('color', 'red');
        return false;
    }
    $('.activities').css('border', 'none');
    return true;
}

function validCreditCardNum(creditCardNum) {
    if(creditCardNum.val() === "" || !(regexCreditCard.test(creditCardNum.val())) ) {
        creditCardToolTip.show();
        creditCardNum.css('borderColor', 'red');
        return false;
    }
    creditCardNum.css('borderColor', '#cldeeb');
    return true;
}

function validZipCode(zipNum) {
    if(zipNum.val() === "" || !(regexZip.test(zipNum.val())) ) {
        zipToolTip.show();
        zipNum.css('borderColor', 'red' );
        return false;
    }
    zipNum.css('borderColor', '#cldeeb');
    return true;
}

function validCVV(cvv) {
    if(cvv.val() === "" || !(regexCVV.test(cvv.val())) ) {
        cvvToolTip.show();
        cvv.css('borderColor', 'red' );
        return false;
    }
    cvv.css('borderColor', '#cldeeb');
    return true;
}

// function to check the validity of all input. If everything is valid it will return true
function validateForm() {
    let isValid = true;
    if(validName($name) == false) {
       isValid = false;
   }

   if(validEmail($email) == false) {
     isValid = false;
  }

   if (validActivity(total) == false) {
     isValid = false;
   }

   if ($("#payment").val() === 'credit card') {
        if(validCreditCardNum(creditCardNum) == false) {
            isValid = false;
        }
        if(validZipCode(zipNum) == false ) {
            isValid = false;
        }
        if ( validCVV(cvv) == false) {
            isValid = false;
        }
    }
    return isValid;
 }

 // function that clears red border and toop tip if input is correct
 function clearError() {
     if (name.val() !== "" || !(regexName.test($name.val()))) {
         nameToolTip.hide();
         name.css('borderColor', '');
     }
     if (email.val() !== "" || regexEmail.test($email.val()) ) {
         emaillToolTip.hide();
         email.css('borderColor', '');
     }
     if(total !== 0) {
         $('.activities').css('color', '');
         activitiesToolTip.hide();
     }
     if(creditCardNum.val() !== "" || regexCreditCard.test($creditCardNum.val()) ) {
         creditCardToolTip.hide();
         creditCardNum.css('borderColor', '');
     }
     if(zipNum.val() !== "" || regexZip.test($zipNum.val()) ) {
         zipToolTip.hide();
         zipNum.css('borderColor', '' );

     }
     if(cvv.val() !== "" || regexCVV.test($cvv.val()) ) {
         cvvToolTip.hide();
         cvv.css('borderColor', '' );
     }
 }

 //keyup functions for tooltips
 $("#name").on('keyup', function(){
     if (  regexName.test(name.val()) ){
     nameToolTip.text("Only letters and spaces").show()
    } else {
        name.css('borderColor', 'green');
        nameToolTip.hide();
    }
});
 $("#mail").on('keyup', function(){
     if ( !(regexEmail.test(email.val())) )  {
     emaillToolTip.text("example123@email.com").css("font-size","100%").show()
    } else {
        email.css('borderColor', '');
        emaillToolTip.hide();
    }
 });
 $("#cc-num").on('keyup', function(){
     if ( !(regexCreditCard.test(creditCardNum.val())) ){
     creditCardToolTip.text("Must be between 13-16 digits").css("color","green").show()
    } else {
        creditCardNum.css('borderColor', '');
        creditCardToolTip.hide();
    }
 });
 $("#zip").on('keyup', function(){
     if ( !(regexZip.test(zipNum.val())) ) {
     zipToolTip.text("Must be 5 digits").css("color","green").show();
    } else {
        zipNum.css('borderColor', '');
        zipToolTip.hide();
    }
 });
 $("#cvv").on('keyup', function(){
     if (!(regexCVV.test(cvv.val()))  ) {
     cvvToolTip.text("Must be 3 digits").css("color","green").show();
    } else {
        cvv.css('borderColor', '');
        cvvToolTip.hide();
    }
 });

 //submitting the form, clearing errors and checking for validity
 document.querySelector("form").addEventListener("submit", function(e) {
     clearError();
     if (validateForm() == false) {
         e.preventDefault();
     }
 });
