var controls = (function() {
  var CONFIGS = {
    days : [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    days_form : "#day_controls"
  };

  // Function declarations
  var init;

  init = function() {
    var days_checkboxes, any_day_checkbox, ind_day_checkbox;

    // Click handling of Days Form inputs.
    days_checkboxes = $(CONFIGS.days_form + " input:checkbox");
    any_day_checkbox = $(CONFIGS.days_form + " input[value='Any']");
    // Returns the set of elements in days_checkboxes without the any_day_checkbox element
    ind_day_checkbox = $($.grep(days_checkboxes, function(value) {  return value != any_day_checkbox.get(0);}));


    any_day_checkbox.on('click', function () {
      days_checkboxes.prop('checked',false);
      any_day_checkbox.prop('checked',true);
    });

    ind_day_checkbox.on('click', function () {
      any_day_checkbox.prop('checked',false);
    })

    // Submit handling of Days Form.
    $(CONFIGS.days_form).on('submit', function(e) {
      e.preventDefault();
      changeShowDays($(this).find('input:checked'));
    });

  };

  // changeShowDays - converts a selection of DOM elements to an array of days that 
  // updateVisibleShows can parse.
  changeShowDays = function(selected_days) {
    if (typeof selected_days === undefined) {
      console.error('No days passed.');
    } else {
      var day_arr = [];
      selected_days.each(function() {
        if ($(this).val() === 'Any') {
          day_arr = [];
          return;
        } else {
          day_arr.push('.'+$(this).val());
        }
      });

      // Pass day_arr to update function
      updateVisibleShows(day_arr);
    }

  };


  updateVisibleShows = function(days) {
    var performance_list = $('#shows-list');
    if (typeof days === undefined) {
      console.log("updateVisibleShows#showAll");
      performance_list.find('.performance').show();
    } else if (days.length === 0) {
      console.log("updateVisibleShows#showAll");
      performance_list.find('.performance').show();
    } else {
      console.log("updateVisibleShows#showDays "+days);
      performance_list.find('.performance').hide();
      performance_list.find(days.toString()).show();
    }
  };

  init();

  // Return Public Functions
  return {
    
  }
})();