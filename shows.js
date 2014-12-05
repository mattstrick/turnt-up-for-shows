var shows = (function() {
  var CONFIGS = {
    noShows : '#no-shows',
    addShow : '.add-show',
    showsContainer : '#shows-list',
    shows : [
      {
        "title":"Test Show",
        "miniMap" : "http://maps.googleapis.com/maps/api/staticmap?center=1540+N+Milwaukee+Ave,+Chicago,+IL+60622&zoom=15&size=150x150&maptype=roadmap&markers=color:red%7C41.909297,-87.676301",
        "venue": "Fake Location",
        "address" : "123 Anywhere Blvd, Chicago, IL",
        "times": [
          "Blowvember 9PM"
        ],
        "bookingTypes" : [
          "Improv - Group"
        ],
        "contactTypes" : [
          "<a href='#'>Email</a>",
          "<a href='#'>FB</a>"
        ]
      }
    ],
    bookingTypes : {
      "solo" : "Improv (Solo)",
      "group" : "Improv (Group)",
      "standup" : "Stand-up",
      "festival" : "Festival",
      "sketch_s" : "Sketch (Solo)",
      "sketch_g" : "Sketch (Group)"
    },
    infoPathLocal : "./",
    infoPath : "/",
    infoType : "json" 
  };

  // Function declarations
  var newShow, generateShow, init, getHTMLFromHbsTemplate;

  //*********//
  // Initialization
  //*********//
  init = function(listings) {
    var path;

    // Determine where to pull listings from
    if (typeof listings !== "undefined" && listings !== null) {
      // We have a listing.
    } else {
      listings = "show_listings";
    }
    //console.log("Initializing wih file:" + listings);

    // Construct URL to listings
    path = (isLocalOrigin())? CONFIGS.infoPathLocal : CONFIGS.infoPath;
    path += listings.toString() + "." + CONFIGS.infoType;
    console.log(path);
    
    // Get the listings
    $.ajax({
      url: path,
      dataType: "json"
    }).success(function(data) {
      // console.log("data" + data);

      // Remove the "No Shows" notice the first time through
      if ($(CONFIGS.noShows).length > 0) {
        $(CONFIGS.noShows).remove();
      }

      // Add prettyprint name for booking types
      for (var i = data.shows.length - 1; i >= 0; i--) {
        //console.log(data.shows[i]);
        data.shows[i].prettyPrint = [];
        for (var l = data.shows[i].bookingTypes.length - 1; l >= 0; l--) {
          var _BT, _PrettyBT;
          _BT = data.shows[i].bookingTypes[l];
          _PrettyBT = CONFIGS.bookingTypes[_BT];
          
          //console.log((_PrettyBT === undefined? "OTHER" : _PrettyBT));
          data.shows[i].prettyPrint.push(_PrettyBT);
        };
        //console.log(data.shows[i].prettyPrint);
      };

      // Generate the shows!
      $(CONFIGS.showsContainer).append(generateShow(data));
    }).error(function() {
      console.log("Shows Failed To Load");
    });
  };

  // DEPRECATED - Still building out the funcionality. Not ready for 
  // people to add content yet.
  // attach new show event to button
  $(CONFIGS.addShow).on('click', function() {
    return newShow();
  });

  newShow = function() {
    // Remove the "No Shows" notice the first time through
    if ($(CONFIGS.noShows).length > 0) {
      $(CONFIGS.noShows).remove();
    } 
    
    // @TODO: New show show pass Defaul/Empty show object to generateShow()
    $(CONFIGS.showsContainer).append(generateShow());
  }

  // DEPRECATED: 
  // Generic show
  // @TODO: pass parameters to new show
  generateShow = function(showConfigs) {
    var data, showHTML;
    
    if (typeof showConfigs !== undefined) {
      data = showConfigs;
    } else {
      data = CONFIGS;
    }

    //console.log('configs' + showConfigs);

    showHTML = "{{#each shows}}"+
    "<!-- Show Listing -->"+
    "<section class='performance panel panel-default{{#each times}} {{this.day}}{{/each}}{{#each bookingTypes}} {{this}}{{/each}}'>"+
     "<div class='panel-heading'>"+
       "<h3 class='panel-title'>{{title}}</h3>"+
     "</div>"+
     "<div class='panel-body'>"+
       "<div class='row'>"+
         "<div class='col-md-2'>"+
           "<img src='{{{miniMap}}}' />"+
         "</div>"+
         "<div class='col-md-4'>"+
           "<h5>{{venue}}</h5>"+
            "{{address}}<br />"+
            "{{#each times}}"+
              "{{this.day}} ({{this.time}}) <br/ >"+
            "{{/each}}"+
         "</div>"+
         "<div class='col-md-3'>"+
           "<ul class='list-group'>"+
             "<li class='list-group-item active'>Booking</li>"+
             "{{#each prettyPrint}}"+
              "<li class='list-group-item'>{{this}}</li>"+
             "{{/each}}"+
           "</ul>"+
         "</div>"+
         "<div class='col-md-3'>"+
           "<ul class='list-group'>"+
            "<li class='list-group-item active'>Contact</li>"+
            "{{#each contactTypes}}"+
              "<li class='list-group-item'>{{{this}}}</li>"+
            "{{/each}}"+
           "</ul>"+
         "</div>"+
       "</div>"+
     "</div>"+
     "</section>"+
     "{{/each}}";

    return getHTMLFromHbsTemplate(showHTML, data);
  };

  isLocalOrigin = function () {
    if (window.location.origin === 'null') {
      return true;
    } else return false;
  };

  getHTMLFromHbsTemplate = function(template, data) {
    var templateCompiled, htmlResult;

    if (!template){
      console.log("No template!");
      return false;
    }

    if (!data){
      console.log("No data!");
      return false;
    }
    
    templateCompiled = Handlebars.compile(template);
    htmlResult = templateCompiled(data);

    return htmlResult;
  };


  // Return Public Functions
  return {
    newShow : newShow,
    init : init
  }
})();