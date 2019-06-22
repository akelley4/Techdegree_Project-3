// do stuff when the DOM is ready
$(document).ready(function() {
});
//variable tracking total cost of registration
let total = 0;
// variables for
const creditClicked = $("#payment option[value= 'credit card']");
const paypalClicked = $('p:first');
const bitcoinClicked = $('p:last');
// put the first field in the 'focus' state'
$( "#name").focus();
// this hides the option initially and shows if JavaScript is disabled
$( "#other-title").hide();
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
$("<p>").addClass("total").text("The total cost for activities is $" + total).
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


$('#payment').click(function() {
    if ($('#payment option:selected').val === "credit card") {
        $(creditClicked).show();
        $(paypalClicked).hide();
        $(bitcoinClicked).hide();
    }
    if ($('#payment option:selected').val === "paypal") {
        $(paypalClicked).show();
        $(creditClicked).hide();
        $(bitcoinClicked).hide();
    }
    if ($('#payment option:selected').val === "bitcoin") {
        $(bitcoinClicked).show();
        $(creditClicked).hide();
        $(paypalClicked).hide();
    }
});
