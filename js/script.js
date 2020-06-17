/******************************************
Student: Cooper Hollmaier
Project: Techdegree - Unit 3
Intended Behavior: Interactive Form
Goal: Exceeds Expecatations
******************************************/

/**********************************************************
    Setup
 *********************************************************/

// Global variables
let fieldset = document.querySelectorAll('fieldset');
let newField = document.createElement('input');
let div = document.createElement('div'); // Create a new div and add it below the list of checkbox inputs

// Onload events
window.addEventListener("load", e => {
    let userName = document.getElementById('name');
    userName.focus();
    for (let i = 0; i < checkboxes.length; i++) { // Reset checkbox selection
        checkboxes[i].checked = false;
    }
});

// Helper functions
let hide = function() {
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].hidden = true;
    }
}
let show = function() {
        for (let i = 0; i < arguments.length; i++) {
            arguments[i].hidden = false;
        }
    }
    /**********************************************************
    Basic Info
    *********************************************************/
    // Show and hide a text area based on selection of 'user-title'
let title = document.getElementById('title');

newField.setAttribute('type', 'text');
hide(newField);
title.parentNode.appendChild(newField);

title.addEventListener('change', e => {
    if (e.target.value === 'other') {
        show(newField);
    } else
        hide(newField);
});
/**********************************************************
T-shirt Info
 ********************************************************/
let design = document.getElementById('design');
let color = document.getElementById('color');
let colorDiv = document.getElementById('colors-js-puns');
let colorOptions = colorDiv.querySelectorAll('option');
let addOption = document.createElement('option');
let colorSelect = colorDiv.querySelector('select');
colorSelect.prepend(addOption);
addOption.text = 'Please select a T-shirt theme';
addOption.value = 'default';
colorSelect.value = 'default';
hide(colorDiv);

design.addEventListener('change', e => { // Listen for change in drop down value and act accordingly
    if (design.value === 'heart js') {
        show(colorDiv);
        color.value = 'default'; // Default visible value should be blank
        hide(colorOptions[0], colorOptions[1], colorOptions[2]);
        show(colorOptions[3], colorOptions[4], colorOptions[5]);
    } else if (design.value === 'js puns') {
        show(colorDiv);
        color.value = 'default'; // Default visible value should be blank
        hide(colorOptions[3], colorOptions[4], colorOptions[5]);
        show(colorOptions[0], colorOptions[1], colorOptions[2]);
    } else {
        hide(colorDiv);

    }
});
/**********************************************************
Register for Activities
*********************************************************/
let activities = fieldset[2];
let checkboxes = activities.querySelectorAll('input');
activities.append(div);
activities.addEventListener('change', e => { // Listen for changes to the fieldset that includes all checkboxes
    let targetItem = e.target;
    let targetItemDayAndTime = targetItem.getAttribute('data-day-and-time');
    let sum = 0;

    for (let i = 0; i < checkboxes.length; i++) { // Check status of checkboxes and total the sum of costs
        if (checkboxes[i].checked === true) {
            sum += parseInt(checkboxes[i].dataset.cost); // Add to the sum variable the integer contained within the dataset
        }
    }
    div.textContent = 'Total Due: ' + '$' + sum; // Write the integer value of the variable 'sum' to the div that was created

    for (let i = 0; i < checkboxes.length; i++) {
        let storage = checkboxes[i].getAttribute('data-day-and-time');
        if (targetItemDayAndTime === storage && targetItem !== checkboxes[i]) {
            if (targetItem.checked) {
                checkboxes[i].disabled = true;
                checkboxes[i].parentNode.style.color = 'gray';
            } else {
                checkboxes[i].disabled = false;
                checkboxes[i].parentNode.style.color = 'black';
            }

        }

    }
});
/**********************************************************
Payment Info
 *********************************************************/
let payment = fieldset[3];
let paymentMethod = document.getElementById('payment');
let creditCardText = document.getElementById('credit-card'); // Select the appropriate text for each case
let paypalText = document.getElementById('paypal');
let bitcoinText = document.getElementById('bitcoin');
paymentMethod[1].selected = true; // By default set non-credit card items to hidden
hide(paypalText, bitcoinText);

payment.addEventListener('change', e => { // Listen for a change in the selection input and react accordingly
    if (paymentMethod.value === 'credit card') {
        hide(paypalText, bitcoinText);
        show(creditCardText);
    } else if (paymentMethod.value === 'paypal') {
        hide(creditCardText, bitcoinText);
        show(paypalText);
    } else if (paymentMethod.value = 'bitcoin') {
        hide(creditCardText, paypalText);
        show(bitcoinText);
    } else {
        paymentMethod.value = 'credit card';
        hide(paypalText, bitcoinText);
        show(creditCardText);
    }
});
/**********************************************************
 Validation
 *********************************************************/

let form = document.querySelector('form');
form.addEventListener("submit", validate);

function validate() {
    let submittedName = document.getElementById('name').value; // user submitted text for name field
    let submittedEmail = document.getElementById('mail').value; // user submitted text for email field
    let submittedPayment = document.getElementById('payment').value; // user submitted value for payment selection field

    if (submittedName.length < 1) { // Check if the name field is blank
        alert('Validation failed');
        return false;
    } else {
        alert('Good');
        return true;
    }



    /* validateName(submittedName);
     validateEmail(submittedEmail);
     validateActivities();
     validatePayment(submittedPayment);*/
}

/*// Is the name blank?
function validateName(string) {
    if (string.length < 1) {
        alert('Name field is blank. ' + string.length + ' characters were entered')
    } else {
        return true;
    }
}

// Is the email in the valid format?
function validateEmail(string) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (string.length < 1) {
        alert(' Email field is blank. ' + string.length + ' characters were entered')
    } else if (regex.test(string)) {
        return true;
    } else {
        alert('Make sure your email address is properly formatted!');
    }
}
// Has at least one checkbox been checked?

function validateActivities() {
    let boxesSelected = 0;
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            boxesSelected++;
        }
    }
    if (boxesSelected > 0) {
        return true;
    } else {
        alert('No boxes were selected');
    }

}

function validatePayment(string) {
    let submittedCc = document.getElementById('cc-num').value;
    let submittedZip = document.getElementById('zip').value;
    let submittedCvv = document.getElementById('cvv').value;
    if (string === 'credit card') {
        if (submittedCc.length > 0 && submittedCc.length > 12 && submittedCc.length < 16) {
            return true;
        }
        if (submittedZip.length > 0 && submittedZip.length === 5) {
            return true;
        }
        if (submittedCvv.length > 0 && submittedCvv.length === 3) {
            return true;
        }
        returnToPreviousPage();
    }
    return true;
}

/**********************************************************
 Regression Tests for Grading
 *********************************************************/

// True — Focus on the first field
// True — "Your job role" text field appears when user selects "Other" from the Job Role menu.
// True — Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
// True — When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
// True — “Color” drop down menu is hidden until a T-Shirt design is selected.
// True — User cannot select two activities that are at the same time.
// True — Total cost of selected activities is calculated and displayed below the list of activities.
// True — The "Credit Card" payment option is selected by default.
// True — Payment option in the select menu matches the payment option displayed on the page.
// True — When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden.
// True — Form cannot be submitted if name is blank.
//      — Form cannot be submitted if email field isn't formatted correctly.
//      — Form cannot be submitted if no activities are selected.
//      — Form cannot be submitted if credit card is selected and CC# isn't 13-16 digits.
//      — Form cannot be submitted if credit card is selected and zipcode isn't 5 digits.
//      — Form cannot be submitted if credit card is selected and CVV isn't 3 digits.
//      — At least one field does real time data validation.
//      — Without JavaScript all form fields and payment information is displayed.