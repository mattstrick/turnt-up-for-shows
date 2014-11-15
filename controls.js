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
    days_form : "#day_controls",
    showTypes : [
      "solo",
      "group",
      "standup",
      "festival"
    ],
    showTypes_form : "#show_type_controls"
  };

  // Function declarations
  var init;

  init = function() {
    var days_checkbox, any_day_checkbox, ind_day_checkbox;

    // Click handling of Days Form inputs.
    days_checkbox = $(CONFIGS.days_form + " input:checkbox");
    any_day_checkbox = $(CONFIGS.days_form + " input[value='Any']");
    // Returns the set of elements in days_checkbox without the any_day_checkbox element
    ind_day_checkbox = $($.grep(days_checkbox, function(value) {  return value != any_day_checkbox.get(0);}));

    // Click handling of Types Form inputs.
    types_checkbox = $(CONFIGS.showTypes_form + " input:checkbox");
    any_type_checkbox = $(CONFIGS.showTypes_form + " input[value='Any']");
    // Returns the set of elements in types_checkbox without the any_type_checkbox element
    ind_types_checkbox = $($.grep(types_checkbox, function(value) {  return value != any_type_checkbox.get(0);}));


    /*
      Form Update Handlers
     */
    // Update Day Controls - Any
    any_day_checkbox.on('click', function () {
      days_checkbox.prop('checked',false);
      any_day_checkbox.prop('checked',true);
    });

    // Update Day Controls - Day 
    ind_day_checkbox.on('click', function () {
      any_day_checkbox.prop('checked',false);
    })

    // Update Type Controls - Any
    any_type_checkbox.on('click', function () {
      types_checkbox.prop('checked',false);
      any_type_checkbox.prop('checked',true);
    });

    // Update Type Controls - Type 
    ind_types_checkbox.on('click', function () {
      any_type_checkbox.prop('checked',false);
    })


    /*
      Form Submit Handlers
     */ 
    
    // Submit handling of Days Form.
    $(CONFIGS.days_form).on('submit', function(e) {
      e.preventDefault();
      changeShowDays($(this).find('input:checked'));
    });

    // Submit handling of Types Form.
    $(CONFIGS.showTypes_form).on('submit', function(e) {
      e.preventDefault();
      changeShowTypes($(this).find('input:checked'));
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

  // changeShowTypes - converts a selection of DOM elements to an array of types that 
  // updateVisibleShows can parse.
  changeShowTypes = function(selected_types) {
    if (typeof selected_types === undefined) {
      console.error('No types passed.');
    } else {
      var type_arr = [];
      selected_types.each(function() {
        if ($(this).val() === 'Any') {
          type_arr = [];
          return;
        } else {
          type_arr.push('.'+$(this).val());
        }
      });

      // Pass type_arr to update function
      updateVisibleShows(type_arr);
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