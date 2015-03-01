var controls = (function() {
  var CONFIGS = {
    noShows : '#no-shows',
    container : '#controls',
    form : "#controls form",
    days : [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    days_all : "daysAny",
    days_fieldset : "[name=day_controls]",
    showTypes : [
      "solo",
      "group",
      "standup",
      "sketch_g",
      "sketch_s"
    ],
    showTypes_all : "showTypesAny",
    showTypes_fieldset : "[name=show_type_controls]"
  };

  // Function declarations
  var init;

  init = function() {

    var days_checkbox, any_day_checkbox, ind_day_checkbox;

    addControls();

    // Click handling of Days Form inputs.
    days_checkbox = $(CONFIGS.days_fieldset + " input:checkbox");
    any_day_checkbox = $(CONFIGS.days_fieldset + " input[value='"+ CONFIGS.days_all +"']");
    // Returns the set of elements in days_checkbox without the any_day_checkbox element
    ind_day_checkbox = $($.grep(days_checkbox, function(value) {  return value != any_day_checkbox.get(0);}));

    // Click handling of Types Form inputs.
    types_checkbox = $(CONFIGS.showTypes_fieldset + " input:checkbox");
    any_type_checkbox = $(CONFIGS.showTypes_fieldset + " input[value='"+ CONFIGS.showTypes_all +"']");
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
    
    $(CONFIGS.form).on('submit', function(e) {
      var updatedSelectors = [];
      e.preventDefault();

      updateVisibleShows(this);
    });


  };

  addControls = function() {
    // Add Form
    $(CONFIGS.container).append(
      '<!-- <button class="add-show">Add Show</button>-->'+
      '<form>' +
      '<fieldset name="day_controls"><p>Filter by Days:</p></fieldset>' +
      '<fieldset name="show_type_controls"><p>Filter by Type:</p></fieldset>' +
      '<input type="submit" value="Update Types" />' +
      '</form><hr>'
    );

    // Day inputs
    // Build the inputs
    _days = "";
    _days += buildInput(CONFIGS.days_all,'day', true);
    for (option in CONFIGS.days) {
      _days += buildInput(CONFIGS.days[option],'day', false);
    }

    $(CONFIGS.days_fieldset).append(_days);
    //Hardcoded Values
    // '<input type="checkbox" name="day" value="Any" checked />Any<input type="checkbox" name="day" value="Monday" />M<input type="checkbox" name="day" value="Tuesday" />T<input type="checkbox" name="day" value="Wednesday" />W<input type="checkbox" name="day" value="Thursday" />Th<input type="checkbox" name="day" value="Friday" />F<input type="checkbox" name="day" value="Saturday" />Sa<input type="checkbox" name="day" value="Sunday" />Su'

    //Type inputs
    // Build the inputs
    _types = "";
    _types += buildInput(CONFIGS.showTypes_all,'type', true);
    for (option in CONFIGS.showTypes) {
      _types += buildInput(CONFIGS.showTypes[option],'type', false);
    }

    $(CONFIGS.showTypes_fieldset).append(_types);
    //Hardcoded Values
    // '<input type="checkbox" name="type" value="Any" checked />Any<input type="checkbox" name="type" value="solo" />Improv (Solo)<input type="checkbox" name="type" value="group" />Improv (Group)<input type="checkbox" name="type" value="standup" />Stand-up<input type="checkbox" name="type" value="sketch_s" />Sketch (Solo)<input type="checkbox" name="type" value="sketch_g" />Sketch (Group)'
  };

  buildInput = function(value, type, isChecked) {
    var input = "";
    /* Updated Checkboxes 
    input += '<section title="'+buildTitle(value,type)+'">';
    input +=  '<div class="squaredOne">';
    input +=    '<input type="checkbox" value="'+value+'" id="'+value+'" name="'+type+'" '+((isChecked)? "checked" : "")+' />';
    input +=    '<label for="'+value+'"></label>';
    input +=  '</div>';
    input += '</section>';
    /**/
    /* Normal Checkboxes */
    input += '<input type="checkbox" name="'+ type +'" value="'+ value +'" '+ ((isChecked)? "checked" : "") +' />' + buildTitle(value,type);
    /**/
    return input;
  };

  buildTitle = function (value, type) {
    var returnVal = "";

    // Return 'Any' values
    if (value.substr(-3) === "Any") {
      returnVal = value.substr(-3);
      return returnVal;
    }

    if (type === 'day') {
      returnVal = value.substr(0,2);
    } else {
      _BTarr = utils.getBookingTypes();
      returnVal = _BTarr[value];
    }

    return returnVal;
  };

  // changeShowDays - converts a selection of DOM elements to an array of days that 
  // updateVisibleShows can parse.
  changeShowDays = function(selected_days) {
    if (typeof selected_days === undefined) {
      console.error('No days passed.');
    } else {
      var day_arr = [];
      selected_days.each(function() {
        // How should we handle?
        if ($(this).val() === CONFIGS.days_all) {
          day_arr.push('*');
          return;
        } else {
          day_arr.push('.'+$(this).val());
        }
      });

      // Pass day_arr to update function
      return day_arr;
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
        if ($(this).val() === CONFIGS.showTypes_all) {
          type_arr.push('*');
          return;
        } else {
          type_arr.push('.'+$(this).val());
        }
      });

      // Pass type_arr to update function
      return type_arr;
    }
  };

  /*
    updateVisibleShows - handles updating the shows that are visible when new controls are submitted.
    It starts with the full set of shows on the page. Then, parses a set of controls, to turn into DOM selectors.
    From there, we can keep decrease the set of shows to show. Repeating for each set of controls.
   */
  updateVisibleShows = function(form) {
    // Remove No Shows Messaging
    $(CONFIGS.noShows).remove();
    
    var performance_list = $(shows.getShowsContainer()).find('.performance'), selectors;

    // Hide everything
    performance_list.hide();
    console.log(performance_list);

    // TODO: We can abstract this to take any number of control sets.
    // Submit handling of Days Form.
    selectors = changeShowDays($(form).find(CONFIGS.days_fieldset + ' input:checked'));
    performance_list = performance_list.filter(selectors.toString());
    
    // Submit handling of Types Form.
    selectors = changeShowTypes($(form).find(CONFIGS.showTypes_fieldset + ' input:checked'));
    performance_list = performance_list.filter(selectors.toString());
    console.log(performance_list);
    
    // Show what's left
    performance_list.show();

    if (performance_list.size() === 0) {
      utils.noShowsFound();
    }
  };

  // Return Public Functions
  return {
    addControls : addControls,
    init : init
  }
})();