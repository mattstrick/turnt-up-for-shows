var showGenerator = (function() {
  var CONFIGS = {
    API_KEY : "AIzaSyApTvGE2HLUR3KOOYiPphzZUsmAaqcB0Nw",
    base_url : "http://maps.googleapis.com/maps/api/staticmap?",
    show_details_form : "form[name=newShowDetails]"
  };

  // Function declarations
  var init, generateNewShow, generateStaticMapURL, encodeAddress, newShow;

  // Variable declarations
  var new_show = {};

  init = function() {
    buildBookingTypes();

    $(CONFIGS.show_details_form).on('submit', function (e) {
      e.preventDefault();
      newShow(this);
    });
  };

  generateNewShow = function (data) {
    console.log("GEOCODING");
    console.log("*************");
    console.log(data);
    
    if (data.status != "ZERO_RESULTS") {
      var $form = $(CONFIGS.show_details_form);
      var $results = $('.results');
      var date = new Date();

      // Get a unique time, and convert from base 10 to base 32 to save some space
      new_show.id = date.getTime().toString(32);
      new_show.title = $form.find('[name=title]').val();
      new_show.miniMap = generateStaticMapURL(data.results.pop());
      new_show.venue = $form.find('[name=venue]').val();

      new_show.bookingTypes = [];
      _inputsBT = $form.find('[name=bookingTypes] input');
      for (input in _inputsBT) {
        if (_inputsBT[input].checked) {
          new_show.bookingTypes.push(_inputsBT[input].value);
        }
      }

      console.log(new_show.bookingTypes);

      $results.find('h1').html(new_show.address);
      $results.find('p').html(new_show.miniMap);
      $results.find('img').attr('src',new_show.miniMap);
      $('code').html(JSON.stringify(new_show));
    } else {
      console.log("No Results");
    }
  };

  buildBookingTypes = function () {
    var _BT, _inputList;
    
    _BT = utils.getBookingTypes();
    console.log(_BT);

    _inputList = "";
    for (option in _BT) {
      _inputList += '<label for="'+option+'">'+_BT[option]+'</label><input type="checkbox" name="'+option+'" id="'+option+'" value="'+option+'"/>'
    }

    console.log(_inputList);
    $("#noBookingTypes").replaceWith(_inputList);

  };

  generateStaticMapURL = function (data) {
    console.log(data);
    var lat = data.geometry.location.lat;
    var lng = data.geometry.location.lng;
    var url = CONFIGS.base_url + "center=" + encodeAddress(new_show.address) + "&zoom=15&size=150x150&maptype=roadmap&markers=color:red%7C" + lat + "," + lng + "&key=" + CONFIGS.API_KEY;

    console.log("MAP DATA");
    console.log("*************");
    console.log(url);

    return url;
  };

  encodeAddress = function (address) {
    return address.replace(/ /g, "+").replace(/#/g, "");
  };

  newShow =  function(form) {
    var new_street = form.children.namedItem("address").value;
    var new_city = form.children.namedItem("city").value;
    var new_state = form.children.namedItem("state").value;
    var new_zip = form.children.namedItem("zip").value;

    new_show.address = new_street + 
      ((new_city !== "")? " " + new_city : "") + 
      ((new_state !== "")? ", " + new_state : "") + 
      ((new_zip !== "")? " " + new_zip : "");

    // Get geocoding info from Google
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(encodeAddress(new_show.address)) + "&key=" + CONFIGS.API_KEY,
      dataType: "json"
    }).success(function(data) {
      generateNewShow(data);
    }).error(function() {
      console.log("Geocoder failed to load");
    });
  };

  init();

  // Return Public Functions
  return {
    
  }
})();