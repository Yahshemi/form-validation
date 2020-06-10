// Global Variables
let fieldset = document.querySelectorAll('fieldset');
let activities = fieldset[2];
let checkboxes = activities.querySelectorAll('input');
let payment = fieldset[3];
let design = document.getElementById('design');
let color = document.getElementById('color');
let title = document.getElementById('title');
let newField = document.createElement('input');
let div = document.createElement('div'); // Create a new div and add it below the list of checkbox inputs
let paymentMethod = document.getElementById('payment');

// Initial focus: Set name field as the initial focus on page load
window.addEventListener("load", e => {
    let userName = document.getElementById('name');
    userName.focus();
    for (let i = 0; i < checkboxes.length; i++) { // Reset checkbox selection
        checkboxes[i].checked = false;
    }
});

// Hide/show functions to control display for users

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
    Basic Information
 *********************************************************/

// Show and hide a text area based on selection of 'user-title'

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

// Create logic so that the color dropdown and it's label aren't visible until a design is selected

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
    }
});