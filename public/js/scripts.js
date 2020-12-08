$(document).ready(function () {
  const submitBtn = $('#nameSubmit');
  const participants = [];

  // event listeners
  submitBtn.on('click', function (e) {
    e.preventDefault();
    console.log('test');
  });

  // each participant can only draw one name
  // no one can be drawn more than once
  // no one can draw their own name
});
