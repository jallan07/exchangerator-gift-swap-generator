// check for document ready
$(document).ready(function () {
  // ================
  // variable declarations
  // ================

  const submitBtn = $('#nameSubmit');
  const formContainer = $('#formContainer');
  const addMoreBtn = $('#addMoreNames');
  // const masthead = $('.masthead');
  const nameForm = $('.name-form');
  const rightCol = $('#right-column');
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
  submitBtn.on('click', (e) => {
    e.preventDefault();

    // store the individual names from the input fields
    for (let i = 1; i <= count; i++) {
      let input = $(`#inputLarge${i}`).val().trim();
      if (!input) break;
      // push each entry into the participants array
      participants.push(input);
    }
    // error handling for empty submissions
    if (participants.length < 2) {
      setTimeout(function () {
        rightCol.prepend(
          `<div class="error mb-3"><h5>You must enter at least 2 names for Exchangerator to work properly.</h5></div>`
        );
        setTimeout(function () {
          $('.error').fadeOut();
        }, 7000);
      }, 100);
      return;
    }
    // pass in the participants to the shuffle function
    const shuffledArr = shuffleParticipants(participants);
    // hide the form inputs
    nameForm.hide();
    // build pairs based off the shuffled array
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
    rightCol.append(`<div class="results-container"></div>`);
    for (let i = 0; i < array.length; i++) {
      rightCol.append(
        `<h4 class="ml-3 mt-4">${array[i].giver.toUpperCase()} 
        is buying for 
        ${array[i].receiver.toUpperCase()}
        </h4>`
      );
    }
    rightCol.append(
      `<a href="/"><button type="submit" class="btn btn-primary ml-3 mt-3 id="resetBtn">Reset</button></a>`
    );
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
});
