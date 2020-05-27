// Global Variables

// Create text field for job title = other
let title = document.getElementById('title');
let newField = document.createElement('input');
newField.setAttribute('type', 'text');
newField.style.display = 'none';
title.parentNode.appendChild(newField);

// Initial focus: Set name field as the initial focus on page load
window.addEventListener("load", e => {
    let userName = document.getElementById('name');
    userName.focus();

});

// Add an event listener to hide/show extra text field when other is selected as a role

title.addEventListener('click', e => {
    if (e.target.value === 'other') {
        newField.style.display = '';

    } else
        newField.style.display = 'none';
});

// Create logic so that the color dropdown and it's label aren't visible until a design is selected
let design = document.getElementById('design');
let color = document.getElementById('color');
color.style.display = 'none';
color.previousElementSibling.style.display = 'none';
design.addEventListener('click', e => {
    if (e.target.textContent === 'Select Theme') {
        color.style.display = 'none';
        color.previousElementSibling.style.display = 'none';
    } else {
        color.style.display = '';
        color.previousElementSibling.style.display = '';

    }
});


// TODO: Only certain color options should be available based on "design" selection

// TODO: If "design" choice is changed, color and menu is updated

// TODO: Don't allow selection of events happening on the same day and time if one is already selected

// TODO: When competing activity is unselected, the former state should revert

// TODO: Checked activities should dynamically total up at the bottom