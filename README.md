# HTML Form Validation
> A JavaScript application modifies an HTML form and provides both real-time and on-submit input validation.

## Background
This project utilizes utilizes vanilla HTML, CSS, and JavaScript to present the user with a sign-up form. The elements are manipulated in the DOM as to provide a server-side fallback and not obscure elements if the browser isn't running JavaScript. I will admit that form validation was one of the trickier things I've tackled thus far, but it gave me a lot of practice in traversing the DOM and implementing callback functions.

### Highlights
- If a user selects the "Other" job role, a free text field appears to input a job that's not listed as a selection
- The color selection is not available until a user selects a theme/design for their shirt
- A user cannot select activities that conflict in date or time
- The cost of each activity is added to their total at the bottom of the list as they select/unselect items
- Different payment options are available show/hide based on the selection
- Name, email, credit card number, zipcode, and cvv are validated when a user moves focus to the next field
- All validated fields are checked and will block submission if the errors persist.
  
## Running the Project
To see the project in action, clone this repository to your desktop and open index.html in a browser. 

## Exceeds Requirements Met
- Color dropdown is hidden unless a t-shirt design is selected
- Name, email, credit card number, zipcode, and cvv have realtime validation
- Email field error is different for blank vs. formatting regex requirement met


## Credits

- Inspired by [Team Treehouse](https://teamtreehouse.com/)
- Built by Cooper Hollmaier 
[GitHub](https://github.com/chollma) 
[Twitter](https://twitter.com/cooperhollmaier) 
[Website](https://cooperhollmaier.com)
