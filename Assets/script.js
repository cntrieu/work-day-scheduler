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
    for (var i = 9; i < 17; i++ ) {
      var iterative = "hour-" + i;
      console.log(iterative);
      var savedTextBox = localStorage.getItem(iterative);
      $("#" + iterative).find('.description').val(savedTextBox);
    }
  })


  
  // Function takes two parameters to append 12pm - 5pm times onto the HTML.
  function clonedHours(startHour, endHour) {
    for (let i = startHour; i <= endHour; i++) {
    
    // Cloning the last time block in the HTML so we can add i to the id.
    var cloneDIV = $("#hour-11").clone();
    cloneDIV.attr('id', 'hour-' + (i));

    // Using the .find() method to target the div responsible for displaying the text of the hour
    if(cloneDIV.attr('id') === 'hour-12') {
      cloneDIV.find('.hour').text("12PM");
    } else {
    
    // We subtract 12 here in order to make it a 12 hour time schedule 
    cloneDIV.find('.hour').text(i - 12 + "PM");
    }
    hourContainer.append(cloneDIV);
    }
  }
  clonedHours(12, 17);

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
      
    }

  
  });


  // Going through the hour container using the class saveBtn selector
  hourContainer.on('click', '.saveBtn', function () {
    var textBox = $(this).closest('.time-block').find('.description').val();
    var hourId = $(this).closest('.time-block').attr('id');
    localStorage.setItem(hourId, textBox)
    console.log(textBox);
    console.log(hourId);
  });

  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  var displayDateEl = $('<p>');
  displayDateEl.text("Today's date is " + dayjs().format("MMMM DD YYYY") + " and the time is now " + dayjs().format("HH:mm A"));
  
  currentDay.append(displayDateEl);

  
});
