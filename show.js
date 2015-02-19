var show = (function() {
  var CONFIGS = {
    noShows : '#no-shows',
    showContainer : '#content',
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

  var isInitialized = false;

  // Function declarations
  var displayShow, generateShow, init, getHTMLFromHbsTemplate, clean;

  //*********//
  // Initialization
  // Take and ID and search for it.
  // Currently that means searching through a list of json files until the ID is found (not ideal)
  //*********//
  init = function() {
    // Clean up from the previous page
    clean();
    
    if (isInitialized === false) {
      console.log("initialized!");
      isInitialized = true;
    } else {
      console.log("already initialized.");
    }

 /*
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

      // If we got shows, hide the "No Shows" messaging
      $(CONFIGS.noShows).hide();

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
      $(CONFIGS.showContainer).append(generateShow(data));
    }).error(function() {
      console.log("Shows Failed To Load");
    });
/**/
  };

  // displayShow - Takes an id(int), finds the show details, and calls generateShow() on the data
  displayShow = function(id) {
    console.log("This is where we'll generate a show using id: " + id +"!");
    $(CONFIGS.showContainer).append(generateShow());
  }

  clean = function () {
    console.log("Cleaning....");
    $(CONFIGS.showContainer).empty();
  }

  // DEPRECATED: 
  // Generic show
  // @TODO: pass parameters to new show
  generateShow = function(showConfigs) {
    var data, showHTML;
    
    if (showConfigs !== undefined) {
      console.log("Generating with " + showConfigs);
      data = showConfigs;
    } else {
      console.log("Generating with DEFAULT");
      data = CONFIGS;
    }

    //console.log('configs' + showConfigs);

    showHTML = "{{#each shows}}"+
    "<!-- Show Listing -->"+
    "<section class='performance panel panel-default{{#each times}} {{this.day}}{{/each}}{{#each bookingTypes}} {{this}}{{/each}}'>"+
     "<div class='panel-heading'>"+
       "<h3 class='panel-title'>"+
       "{{#if id}}<a href='#/show/{{id}}/'>{{title}}</a>"+
       "{{else}}{{title}}"+
       "{{/if}}"+
       "</h3>"+
     "</div>"+
     "<div class='panel-body'>"+
       "<div class='row'>"+
         "<div class='col-md-2'>"+
           "<img src='{{{miniMap}}}&api=AIzaSyApTvGE2HLUR3KOOYiPphzZUsmAaqcB0Nw' />"+
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
    console.log("Returning HTML!" + htmlResult);
    return htmlResult;
  };


  // Return Public Functions
  return {
    displayShow : displayShow,
    clean : clean,
    init : init
  }
})();