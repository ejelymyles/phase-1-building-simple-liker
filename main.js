// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const errorMessage = document.querySelector(`#modal`)

function hideError (){
  errorMessage.classList.add('hidden')
}

document.addEventListener(`DOMContentLoaded`, () =>{
//define a variable to grab the error message
  const errorMessage = document.querySelector(`#modal`)
  //add a new class list of hidden to the error message
  errorMessage.classList.add(`hidden`);

  //invoke function to listen for clicks to turn it "on" since it is defined outside of the DOM Content Load function
  listenForClicks()
})

//add event listener here to add back into DOM Content function later
// create an event listener that listens for clicks in the dom 

function listenForClicks() {
  document.addEventListener('click', (event) => {
    // add a condition if it hears a click on the heart button
    if (event.target.classList[0] === 'like-glyph') {
      // only if it hears a click on the heart button, then invoke mimic server call function
      mimicServerCall()
        .then((response) => {
          // we'll need to turn the heart red if it was successful, find an easier way to store this heart element
          // find a way to describe if it is red or not, there should be a CSS property for the class. check to see if it's present.
          const activatedHeart = event.target.classList.contains('activated-heart');
          if (activatedHeart) {
            // if the heart is already activated when clicked or liked, we want to un-like it, or turn it back clear
            event.target.classList.remove('activated-heart');
            event.target.innerHTML = EMPTY_HEART;
          } else {
            // if the heart is not already activated or liked, then like it and turn it red
            event.target.classList.add('activated-heart');
            event.target.innerHTML = FULL_HEART;
          }
        })
        .catch((error) => {
          errorMessage.classList.remove('hidden');
          // we created a function and passed it to make the code more readable. 
          setTimeout(hideError, 3000);
        });
    }
  });
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
