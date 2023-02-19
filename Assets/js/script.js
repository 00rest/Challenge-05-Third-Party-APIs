// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var hourNow = dayjs().$H;
  var tense;
  var timeDisp;

  for (let count = 9; count < 18; count++) {
    if (count < 12) {
      timeDisp = count + 'AM';
    } else if (count == 12) {
      timeDisp = count + 'PM';
    } else { timeDisp = count - 12 + 'PM'; };

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    if (count < hourNow) {
      tense = 'past';
    } else if (count == hourNow) {
      var tense = 'present';
    } else { var tense = 'future'; };

    let div = $('<div>').addClass('row time-block ' + tense).attr('id', 'hour-' + count);
    let div2 = $('<div>').text(timeDisp).addClass('col-2 col-md-1 hour text-center py-3');
    let textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    let button = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    let i = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
    button.append(i);
    div.append(div2, textarea, button);
    $('#mainDiv').append(div);

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    let stored = localStorage.getItem('hour-' + count);
    if (stored) {textarea.text(stored)};

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    button.on('click', function () {
      localStorage.setItem('hour-' + count, textarea.val())
    });
  }

  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('dddd, MMMM D[th]'));
});