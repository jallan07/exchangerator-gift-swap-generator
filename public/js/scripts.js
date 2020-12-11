// check for document ready
$(document).ready(function () {
  // ================
  // variable declarations
  // ================

  const submitBtn = $('#nameSubmit');
  const formContainer = $('#formContainer');
  const addMoreBtn = $('#addMoreNames');
  const masthead = $('.masthead');
  // participants => user input in the name fields get stored here
  const participants = [];
  // pairs => after user submits their list of names, the shuffled and matched names will be stored in an array of objects here
  const pairs = [];
  // count => used to set numbers for additional name fields
  let count = 4;

  // ================
  // event listeners
  // ================
  // "add more names" button event listener
  addMoreBtn.on('click', () => {
    count++;
    formContainer.append(`
      <div class="form-group">
        <input
          class="form-control form-control-lg name-field"
          type="text"
          placeholder="Enter name ${count}"
          id="inputLarge${count}"
          data-name="${count}"
        />
      </div>
  `);
  });

  // submit button event listener
  submitBtn.on('click', function (e) {
    e.preventDefault();
    // store the individual names from the input fields
    for (let i = 1; i <= count; i++) {
      let input = $(`#inputLarge${i}`).val().trim();
      if (!input) break;
      // push each entry into the participants array
      participants.push(input);
    }
    const shuffledArr = shuffleParticipants(participants);
    buildPairs(shuffledArr);
    // return the participants array for use elsewhere
    return participants;
  });

  // ================
  // helper functions
  // ================
  // find a match for each of the participants
  const shuffleParticipants = (array) => {
    // shuffle the array
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // reverse the array
    // array = array.reverse();
    return array;
  };

  // loop through the array and build objects with 2 people in each people
  const buildPairs = (array) => {
    for (let i = 0; i < array.length; i++) {
      // set the giver variable to the current index
      currentIndex = array[i];
      // set the nextIndex to the next item in the array
      nextIndex = array[i + 1];
      let obj = {
        giver: currentIndex,
        receiver: assignReceiver(array)
      };
      // console.log(obj);
      // push the giver/receiver pairs to the pairs array
      pairs.push(obj);
    }
    renderPairs(pairs);
    console.log({ pairs });
  };

  const renderPairs = (array) => {
    for (let i = 0; i < array.length; i++) {
      masthead.append(
        `<p>${array[i].giver.toUpperCase()} 
        is buying for 
        ${array[i].receiver.toUpperCase()}
        </p>`
      );
    }
  };

  // helper function to assign the receiver
  const assignReceiver = (array) => {
    // if the nextIndex is undefined (meaning it's the last item in the shuffled array), then set its coordinating receiver to the first item in the array
    if (nextIndex === undefined) {
      return array[0];
    }
    // otherwise, set it to the next item in the array
    else {
      return nextIndex;
    }
  };

  // push those objects to the final array, and push to the ejs page template

  // *! RULES **
  // there must be an even number of participants
  // each participant must be randomly matched with another participant
  // each participant can only draw one name
  // no participant can be drawn more than once
  // no participant can draw their own name
});

/* Logic
DONE - Get peoples names
DONE - Store them in an array
Shuffle the array
Reverse the array 
Loop through the array and build objects with 2 people in each object
Push those objects to the final array, and push to the ejs page template
*/
