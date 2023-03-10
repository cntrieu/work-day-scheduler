var saveBtn = $('.saveBtn');
var description = $('.description'); // not used in the code (see reasoning in the hourContainer onclick function))
var currentDay = $('#currentDay');
var hourContainer = $('.container-fluid');
var firstWorkHour = 9;
var lastWorkHour = 17;

$(function () {
  // On window load, display the stored localStorage value in the textboxes of the respective hour
  $(window).on("load", function () {
    for (var i = firstWorkHour; i < lastWorkHour + 1; i++ ) {
      var iterative = "hour-" + i;
      var savedTextBox = localStorage.getItem(iterative);
      
      // Using find() to target class of .description as that is the element for the textarea
      $("#" + iterative).find('.description').val(savedTextBox);
    }
  })

  // Function takes two parameters to append 12pm - 5pm times onto the HTML.
  var clonedHours = function(startHour, endHour) {
    for (var i = startHour; i <= endHour; i++) {
    
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

  // Using the selector that specifies div ids starting with 'hour-'
  $("div[id^='hour-']").each(function() {
    var currentId = $(this).attr("id"); // get the id of the current element using attr()
    var hourEl = currentId.split("-")[1]; // splitting the hour id and taking the numeric value only
 
    // Using dayjs to get the current hour and comparing to the hourEl. Replaced the if/else statement here previously with a ternary operator conditional chain
    return (dayjs().get('hour') == hourEl ) ? $(this).addClass('present') 
    : (dayjs().get('hour') > hourEl) ? $(this).addClass('past') 
    : $(this).addClass('future')

  });

  // Going through the hour container using the class saveBtn selector
  hourContainer.on('click', '.saveBtn', function () {
    // Using closest() to find the first ancestor element to the .saveBtn class and then using find() to find the closest descendant of the respective class .time-block
    //Using the variable 'description' defined in the beginning of the code does not work in the find() method in this case because the variable is a collection of all elements of the class .description rather than the respective class clicked so we use '.description' as a parameter instead
    var textBox = $(this).closest('.time-block').find('.description').val();
    var hourId = $(this).closest('.time-block').attr('id');
    localStorage.setItem(hourId, textBox)
  });

  var displayDateEl = $('<p>');
  displayDateEl.text("Today's date is " + dayjs().format("MMMM DD, YYYY") + " and the time is now " + dayjs().format("HH:mm A"));
  
  currentDay.append(displayDateEl);
});
