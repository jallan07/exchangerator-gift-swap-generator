$(document).ready(function () {
  const submitBtn = $('#nameSubmit');
  const formContainer = $('#formContainer');
  const addMoreBtn = $('#addMoreNames');
  const participants = [];
  let count = 4;

  // on "add more names" button click
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

  // on form submit
  submitBtn.on('click', function (e) {
    console.log('test');
    // store the individual names from the input fields
    for (let i = 1; i <= count; i++) {
      // push each entry into the participants array
      participants.push($(`#inputLarge${i}`).val().trim());
    }
    // return the participants array for use elsewhere
    console.log(participants);
    return participants;
  });

  console.log(participants);

  // each participant can only draw one name
  // no one can be drawn more than once
  // no one can draw their own name
});
