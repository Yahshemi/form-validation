// Global Variables

// Create text field for job title = other
let title = document.getElementById('title');
let newField = document.createElement('input');
newField.setAttribute('type', 'text');
newField.hidden = true; // By default, don't show the text area field created above
title.parentNode.appendChild(newField);

// Initial focus: Set name field as the initial focus on page load
window.addEventListener("load", e => {
    let userName = document.getElementById('name');
    userName.focus();

});

// Add an event listener to hide/show extra text field when other is selected as a role

title.addEventListener('click', e => {
    if (e.target.value === 'other') {
        newField.hidden = false;

    } else
        newField.hidden = true;
});

// Create logic so that the color dropdown and it's label aren't visible until a design is selected
let design = document.getElementById('design');
let color = document.getElementById('color');
color.previousElementSibling.style.display = 'none'; // By default don't display label for color
color.style.display = 'none'; // By default don't display color drop down
color.options[0].hidden = true;


design.addEventListener("change", e => { // Listen for change in drop down value and act accordingly
    if (design.value === 'heart js') {
        color.previousElementSibling.style.display = '';
        color.style.display = '';
        color.value = 'none';
        color.options.item(0).hidden = true; // Replace with more DRY code
        color.options.item(1).hidden = true;
        color.options.item(2).hidden = true;
        color.item(3).hidden = false;
        color.item(4).hidden = false;
        color.item(5).hidden = false;

    } else if (design.value === 'js puns') {
        color.previousElementSibling.style.display = '';
        color.style.display = '';
        color.value = 'none';
        color.item(3).hidden = true; // Replace with more DRY code
        color.item(4).hidden = true;
        color.item(5).hidden = true;
        color.options.item(0).hidden = false;
        color.options.item(1).hidden = false;
        color.options.item(2).hidden = false;
    } else {
        color.previousElementSibling.style.display = 'none';
        color.style.display = 'none';
    }
});

let fieldset = document.querySelectorAll('fieldset');
let activities = fieldset.item(2);
let payment = fieldset.item(3);
let div = document.createElement('div');
activities.append(div);
activities.addEventListener('change', e => { // Listen for change to checkbox


    let checkboxes = activities.querySelectorAll('input');
    let sum = 0;
    for (let i = 0; i < checkboxes.length; i++) { // Check status of checkboxes and total the sum of costs
        if (checkboxes.item(i).checked === true) {
            sum += parseInt(checkboxes.item(i).dataset.cost);

        } else {
            console.log('not checked');
        }
    }
    div.textContent = "Total Due: " + "$" + sum;

});

// TODO: Don't allow selection of events happening on the same day and time if one is already selected

// Time value is stored in data-day-and-time. Everytime a checkbox in the field is updated, loop through the fieldset and ensure boxes that are "checked" don't have any values that are identical.

// TODO: When competing activity is unselected, the former state should revert