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
        class="form-control form-control-lg"
        type="text"
        placeholder="Enter name ${count}"
        id="inputLarge"
      />
    </div>
    `);
  });

  // on form submit
  submitBtn.on('click', function (e) {
    e.preventDefault();
    console.log('test');
  });

  // each participant can only draw one name
  // no one can be drawn more than once
  // no one can draw their own name
});
