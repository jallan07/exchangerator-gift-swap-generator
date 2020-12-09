// check for document ready
$(document).ready(function () {
  // ================
  // variable declarations
  // ================
  const submitBtn = $('#nameSubmit');
  const formContainer = $('#formContainer');
  const addMoreBtn = $('#addMoreNames');
  const participants = [];
  let count = 4;

  // ================
  // event listeners
  // ================
  // "add more names" button
  addMoreBtn.on('click', () => {
    count++;
    console.log('test');
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

  // submit button
  submitBtn.on('click', function (e) {
    console.log('test');
    // store the individual names from the input fields
    for (let i = 1; i <= count; i++) {
      let input = $(`#inputLarge${i}`).val().trim();
      if (!input) break;
      // push each entry into the participants array
      participants.push(input);
    }
    console.log(participants);
    getMatches(participants);
    // return the participants array for use elsewhere
    return participants;
  });

  // ================
  // helper functions
  // ================

  // find a match for each of the participants
  const getMatches = (participants) => {
    console.log(participants);

    // each participant must be randomly matched with another participant
    // each participant can only draw one name
    // no participant can be drawn more than once
    // no participant can draw their own name
  };
});
