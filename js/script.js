// Global Variables
let fieldset = document.querySelectorAll('fieldset');


// Initial focus: Set name field as the initial focus on page load
window.addEventListener("load", e => {
    let userName = document.getElementById('name');
    userName.focus();
});

/**********************************************************
    Basic Information
 *********************************************************/

// Show and hide a text area based on selection of 'user-title'
let title = document.getElementById('title');
let newField = document.createElement('input');
newField.setAttribute('type', 'text');
newField.hidden = true;
title.parentNode.appendChild(newField);

title.addEventListener('change', e => {
    if (e.target.value === 'other') {
        newField.hidden = false;

    } else
        newField.hidden = true;
});

/**********************************************************
    T-Shirt Information
 *********************************************************/

// Create logic so that the color dropdown and it's label aren't visible until a design is selected
let design = document.getElementById('design');
let color = document.getElementById('color');
color.previousElementSibling.hidden = true; // By default don't display label for color
color.hidden = true; // By default don't display color drop down
color.options[0].hidden = true; // By default, hide the values in the drop down


design.addEventListener('change', e => { // Listen for change in drop down value and act accordingly
    if (design.value === 'heart js') {
        color.previousElementSibling.hidden = false; // Color label should be visibile
        color.hidden = false; // Color dropdown should be visible
        color.value = 'none'; // Default visible value should be blank

        color.options.item(0).hidden = true; // First 3 color options should be hidden
        color.options.item(1).hidden = true;
        color.options.item(2).hidden = true;
        color.options.item(3).hidden = false; // Last 3 color options should be visible
        color.options.item(4).hidden = false;
        color.options.item(5).hidden = false;

    } else if (design.value === 'js puns') {
        color.previousElementSibling.hidden = false; // Color label should be visible
        color.hidden = false; // Color dropdown should be visible
        color.value = 'none'; // Default visible value should be blank
        color.options.item(0).hidden = false; // First 3 color options should be visible
        color.options.item(1).hidden = false;
        color.options.item(2).hidden = false;
        color.options.item(3).hidden = true; // Last 3 color options should be hidden
        color.options.item(4).hidden = true;
        color.options.item(5).hidden = true;
    } else {
        color.previousElementSibling.hidden = true; // Hide both color label and it's dropdown
        color.hidden = true;
    }
});

/**********************************************************
    Activity Information
 *********************************************************/

let activities = fieldset[2];
let payment = fieldset[3];
let div = document.createElement('div'); // Create a new div and add it below the list of checkbox inputs
activities.append(div);
activities.addEventListener('change', e => { // Listen for changes to the fieldset that includes all checkboxes
    let targetItem = e.target;
    let targetItemCost = targetItem.getAttribute('data-cost');
    let targetItemDayAndTime = targetItem.getAttribute('data-day-and-time');
    let checkboxes = activities.querySelectorAll('input');
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