var utils = (function() {
  var CONFIGS = {
    noShows : '#no-shows',
    container : '#content',
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

  var clean, getHTMLFromHbsTemplate;

  clean = function () {
    $(CONFIGS.container).empty();
    $('#controls').empty();
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
    clean:clean,
    getHTMLFromHbsTemplate:getHTMLFromHbsTemplate
  }
})();