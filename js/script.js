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
color.previousElementSibling.style.display = 'none'; // By default don't display label for color
color.style.display = 'none'; // By default don't display color drop down
color.options[0].hidden = true;

design.addEventListener("click", e=> { // Event listener to listen for change in drop down value and act accordingly
    if (design.value === 'heart js'){
       color.previousElementSibling.style.display = '';
       color.style.display = '';
       color.options.item(0).hidden = true;
       color.options.item(1).hidden = true;
       color.options.item(2).hidden = true;
       color.item(3).hidden = false;
       color.item(4).hidden = false;
       color.item(5).hidden = false;
       
    } else if (design.value === 'js puns'){
        color.previousElementSibling.style.display = '';
        color.style.display = '';
        color.item(3).hidden = true;
        color.item(4).hidden = true;
        color.item(5).hidden = true;
        color.options.item(0).hidden = false;
        color.options.item(1).hidden = false;
        color.options.item(2).hidden = false;
    } else {
        console.log('Theme not selected');
        color.previousElementSibling.style.display = 'none'; 
        color.style.display = 'none'; 
    }

  }); 

// TODO: Only certain color options should be available based on "design" selection

// TODO: If "design" choice is changed, color and menu is updated - I think I've accounted for that above

// TODO: Don't allow selection of events happening on the same day and time if one is already selected

// TODO: When competing activity is unselected, the former state should revert

// TODO: Checked activities should dynamically total up at the bottom