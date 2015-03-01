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
    infoPathLocal : "./",
    infoPath : "/",
    infoType : "json"
  };

  var isInitialized = false;

  // Function declarations
  var displayShow, displayFestival, generateShow, init;

  //*********//
  // Initialization
  // Take and ID and search for it.
  // Currently that means searching through a list of json files until the ID is found (not ideal)
  //*********//
  init = function() {
    if (isInitialized === false) {
      console.log("initialized!");
      isInitialized = true;
    } else {
      console.log("already initialized.");
    }
  };

  // displayShow - Takes an id(int), finds the show details, and calls generateShow() on the data
  displayShow = function(id) {
    console.log("This is where we'll generate a show using id: " + id +"!");
    getAndGenerateIdFromListing(id, "show_listings");
  }

  // displayFestival - Takes an id(int), finds the festival details, and calls generateShow() on the data
  displayFestival = function(id) {
    console.log("This is where we'll generate a show using id: " + id +"!");
    getAndGenerateIdFromListing(id,"festival_listings");
  }

  getAndGenerateIdFromListing = function(id,listings) {
    console.log("generating!" + id + listings);

    if (typeof id === "undefined" || id === null) {
      // No id, so return default show
      return CONFIGS.shows;
    }

    // Determine where to pull listings from
    if (typeof listings !== "undefined" && listings !== null) {
      // We have a listing.
    } else {
      listings = "show_listings";
    }
    //console.log("Initializing wih file:" + listings);

    var path, _showObj = {};

    _showObj.shows = [];

    // Construct URL to listings
    path = (isLocalOrigin())? CONFIGS.infoPathLocal : CONFIGS.infoPath;
    path += listings.toString() + "." + CONFIGS.infoType;
    console.log(path);

    
    // Get the listings
    $.ajax({
      url: path,
      dataType: "json"
    }).success(function(data) {
      console.log("success!");
      // console.log("data" + data);

      // If we got shows, hide the "No Shows" messaging
      $(CONFIGS.noShows).hide();

      // Add prettyprint name for booking types
      // Get name/value pairs of available booking types/pretty names
      _BTarr = utils.getBookingTypes();
      for (var i = data.shows.length - 1; i >= 0; i--) {
        if (data.shows[i].id === id) {
          //console.log(data.shows[i]);
          data.shows[i].prettyPrint = [];
          for (var l = data.shows[i].bookingTypes.length - 1; l >= 0; l--) {
            var _BT, _PrettyBT;
            _BT = data.shows[i].bookingTypes[l];
            _PrettyBT = _BTarr[_BT];
            
            //console.log((_PrettyBT === undefined? "OTHER" : _PrettyBT));
            data.shows[i].prettyPrint.push(_PrettyBT);
          };

          // return this show
          _showObj.shows.push(data.shows[i]);
        }
      };
      var generatedShow = generateShow(_showObj);
      //console.log(generatedShow);
      // Generate the shows!
      $(CONFIGS.showContainer).append(generatedShow);
    }).error(function() {
      console.log("Shows Failed To Load");
    });

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
    "<section class='performance panel panel-default{{#each times}} {{this.day}}{{/each}}{{#each bookingTypes}} {{this}}{{/each}}' {{#if id}}id='{{id}}'{{/if}}>"+
     "<div class='panel-heading'>"+
       "<h3 class='panel-title'>"+
       "{{title}}"+
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

    return utils.getHTMLFromHbsTemplate(showHTML, data);
  };

  isLocalOrigin = function () {
    if (window.location.origin === 'null') {
      return true;
    } else return false;
  };

  // Return Public Functions
  return {
    displayShow : displayShow,
    displayFestival : displayFestival,
    init : init
  }
})();