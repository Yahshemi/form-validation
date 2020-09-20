/******************************************
Student: Cooper Hollmaier
Project: Techdegree - Unit 3
Intended Behavior: Interactive Form
Goal: Exceeds Expecatations
******************************************/

/******************************************
SETUP
******************************************/
// Constructors
let div = document.createElement('div'); // used to create a new div element
let opt = document.createElement('option'); // used to create a new select option
let actError = document.createElement('div');

// Selectors
let form = document.querySelector('form');
let fieldset = document.querySelectorAll('fieldset');
let name = document.querySelector("#name");
let mail = document.querySelector('#mail');
let title = document.querySelector('#title');
let other = document.querySelector('#other-title');
let size = document.querySelector('#size');
let design = document.querySelector('#design');
let color = document.querySelector('#color');
let colors = document.querySelector('#colors-js-puns')
let activities = document.querySelector('.activities');
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let payment = document.querySelector('#payment');
let credit = document.querySelector('#credit-card');
let ccNum = document.querySelector('#cc-num');
let zip = document.querySelector('#zip');
let cvv = document.querySelector('#cvv');
let expMonth = document.querySelector('#exp-month');
let expYear = document.querySelector('#exp-year');
let paypal = document.querySelector('#paypal');
let bitcoin = document.querySelector('#bitcoin');

// Helper functions
let hide = function() { // iterates through a set of items and sets them to hidden
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].hidden = true;
    }
}
let show = function() { // iterates through a set of items and sets them to show
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].hidden = false;
    }
}

// Page load events
window.addEventListener("load", e => { // 
    name.focus(); // focuses the input on the name field on page load
    hide(other); // hides the text field for other job roles
});

/******************************************
    BASIC INFO
******************************************/

title.addEventListener('change', e => {
    if (e.target.value === 'other') {
        show(other);
    } else
        hide(other);
});

/******************************************
T-SHIRT INFO
******************************************/

opt.appendChild(document.createTextNode('Please select a T-shirt theme')); // If no theme is selected, the color drop down has no options
opt.value = null;
color.insertBefore(opt, color.childNodes[0]);
let colorOptions = colors.querySelectorAll('option');
hide(colors);
color.selectedIndex = 0;
for (let i = 1; i < colorOptions.length; i++) {
    hide(colorOptions[i]);
}

design.addEventListener('change', e => { // Listen for change in drop down value and show colors available for selected theme
    colorOptions[0].innerText = 'Please select a color';
    color.selectedIndex = 0;
    show(colors);
    if (design.value === 'heart js') {
        hide(colorOptions[1], colorOptions[2], colorOptions[3]);
        show(colorOptions[4], colorOptions[5], colorOptions[6]);
    } else if (design.value === 'js puns') {
        hide(colorOptions[4], colorOptions[5], colorOptions[6]);
        show(colorOptions[1], colorOptions[2], colorOptions[3]);
    } else {
        hide(colors);
    }
});

/******************************************
REGISTER FOR ACTIVITIES
******************************************/

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

/******************************************
PAYMENT INFO
******************************************/

payment.selectedIndex = 1; // By default set non-credit card items to hidden
payment.options[0].disabled = true;
hide(paypal, bitcoin);

payment.addEventListener('change', e => { // Listen for a change in the selection input and react based on the selected value
    if (payment.value === 'credit card') {
        hide(paypal, bitcoin);
        show(credit);
    } else if (payment.value === 'paypal') {
        hide(credit, bitcoin);
        show(paypal);
    } else if (payment.value = 'bitcoin') {
        hide(credit, paypal);
        show(bitcoin);
    } else {
        payment.value = 'credit card';
        hide(paypal, bitcoin);
        show(credit);
    }
});
/**********************************************************
VALDIATION RULES
 *********************************************************/

let validName = () => { // Name cannot be blank
    let value = name.value;
    if (value == null || value == "") {
        name.className = 'field-error';

        return false;
    } else {
        name.removeAttribute('class');
        return true;
    }
};

let validEmail = () => { // Email must be valid syntax (name@name.com)
    let value = mail.value;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value == null || value == "" || !regex.test(value)) {
        mail.className = "field-error";
        return false;
    } else {
        mail.removeAttribute('class');
        return true;
    }
};

let validActivities = () => { // At least 1 activity must be selected
    let boxesSelected = 0;
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            boxesSelected++;
        }
    }
    if (boxesSelected == 0) {
        actError.className = "error-text"
        actError.innerHTML = "Please select at least 1 activity"
        activities.prepend(actError);

        return false;
    } else {
        return true;
    }
};

let validNum = () => { // Credit card number must be between 13 and 16 numerical characters 
    if (isNaN(ccNum.value) || ccNum == "" || ccNum.value.length > 16 || ccNum.value.length < 13) {
        ccNum.className = "field-error";
        return false;
    } else {
        ccNum.removeAttribute('class');
        return true;
    }
}

let validZip = () => { // Zip code must be exactly 5 numerical characters
    if (isNaN(zip.value) || zip.value.length !== 5) {
        zip.className = "field-error";
        return false;
    } else {
        zip.removeAttribute('class');
        return true;
    }
}

let validCVV = () => { // CVV must be exactly 3 numerical characters
    if (isNaN(cvv.value) || cvv.value.length !== 3) {
        cvv.className = "field-error";
        return false;
    } else {
        cvv.removeAttribute('class');
        return true;
    }
}

/******************************************
REAL TIME
******************************************/
mail.addEventListener('focus', validName);
title.addEventListener('focus', validEmail);
zip.addEventListener('focus', validNum);
cvv.addEventListener('focus', validZip);
expMonth.addEventListener('focus', validCVV);
/******************************************

******************************************/

form.addEventListener('submit', (e) => {

    if (!validName() || !validEmail() || !validActivities() || !validNum() || !validZip() || !validCVV()) {
        e.preventDefault();
    }

});