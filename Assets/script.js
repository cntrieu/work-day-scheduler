// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var saveBtn = $('.saveBtn');
var description = $('.description');
var currentDay = $('#currentDay');
var hourContainer = $('.container-fluid');



$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // On window load, display the stored localStorage value in the textboxes
  $(window).on("load", function () {
    var savedTextBox = localStorage.getItem('text');
    description.val(savedTextBox);
  })
  
  // work on this function:: we need to set the key in localstorage.setitem to a parameter that takes in hour-[i] to represent the times from 9-1700
  saveBtn.on('click', function () {
    var textBox = $(this).closest('.time-block').find('.description').val();
    localStorage.setItem('text', textBox);
  });
  
  



  // cloning the div until 5pm.. wrap this all in an if statement that says if time === 12pm don't subtract 12 from iterative. If > 12pm, substract 12 from iterative to get the time in 12 hour format instead of 24 hour format
  var cloneDIV = $("#hour-11").clone();
  cloneDIV.attr('id', 'hour-' + 12);
  cloneDIV.find('.hour').text("12PM");
  hourContainer.append(cloneDIV);

  // figure out a way not to use static numbers
  for (let i = 13; i < 18; i++) {
    var cloneDIV = $("#hour-11").clone();
    cloneDIV.attr('id', 'hour-' + (i));
    cloneDIV.find('.hour').text(i - 12 + "PM");
    hourContainer.append(cloneDIV);
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // - APPLY AN IF STATEMENT, IF THE ITERATIVE HOUR === HH, THEN SET IT TO PRESENT. IF THE ITERATIVE HOUR < HH, SET TO PAST. IF > HH, SET TO FUTURE

  $("div[id^='hour-']").each(function() {

    var hour = $(".hour");
    var currentId = $(this).attr("id"); // get the id of the current element
    var hourEl = currentId.split("-")[1]; // get the hour value from the id
 
    if (dayjs().get('hour') == hourEl ) {
      $(this).addClass('present')
    }

    if (dayjs().get('hour') > hourEl) {
      $(this).addClass('past')
      console.log(hourEl);
    }

    if (dayjs().get('hour') < hourEl) {
      $(this).addClass('future')
      console.log(hourEl);
    }

  
  });


 



  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  var displayDateEl = $('<p>');
  displayDateEl.text("Today's date is " + dayjs().format("MMMM DD YYYY") + " and the time is now " + dayjs().format("HH:mm A"));
  
  currentDay.append(displayDateEl);

  
});


// - Implement a function that saves the information entered in the textbox on click on the save button to localstorage. use localstorage at page start to get any previous stored info
// - Use date/time picker type function from jquery/day.js. 
//   - implement a function that if a specified time is hit, it changes color to represent past, present, future. 