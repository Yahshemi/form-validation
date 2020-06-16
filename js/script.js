/**********************************************************
    Global Variables
 *********************************************************/
let fieldset = document.querySelectorAll('fieldset');
let newField = document.createElement('input');
let div = document.createElement('div'); // Create a new div and add it below the list of checkbox inputs
/**********************************************************
    Setup
 *********************************************************/
window.addEventListener("load", e => {
    let userName = document.getElementById('name');
    userName.focus();
    for (let i = 0; i < checkboxes.length; i++) { // Reset checkbox selection
        checkboxes[i].checked = false;
    }
});
/**********************************************************
    Functions
 *********************************************************/
let hide = function () {
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].hidden = true;
    }
}
let show = function () {
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].hidden = false;
    }
}
/**********************************************************
            Basic Information
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
    T-Shirt Information
 *********************************************************/
let design = document.getElementById('design');
let color = document.getElementById('color');
let colorDiv = document.getElementById('colors-js-puns');
let colorOptions = colorDiv.querySelectorAll('option');
hide(colorDiv);

design.addEventListener('change', e => { // Listen for change in drop down value and act accordingly
    if (design.value === 'heart js') {
        show(colorDiv);
        color.value = 'none'; // Default visible value should be blank
        hide(colorOptions[0], colorOptions[1], colorOptions[2]);
        show(colorOptions[3], colorOptions[4], colorOptions[5]);
    } else if (design.value === 'js puns') {
        show(colorDiv);
        color.value = 'none'; // Default visible value should be blank
        hide(colorOptions[3], colorOptions[4], colorOptions[5]);
        show(colorOptions[0], colorOptions[1], colorOptions[2]);
    } else {
        hide(colorDiv);

    }
});
/**********************************************************
    Activity Information
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
    Payment Information
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
   Submission Validation
 *********************************************************/

let form = document.querySelector('form');
form.addEventListener("submit", validate);

function validate() {
    let submittedName = document.getElementById('name').value;
    let submittedEmail = document.getElementById('mail').value;
    let submittedPayment = document.getElementById('payment').value;
    validateName(submittedName);
    validateEmail(submittedEmail);
    validateActivities();
    validatePayment(submittedPayment);
}

// Is the name blank?
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


}





