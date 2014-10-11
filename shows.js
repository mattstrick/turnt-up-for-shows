var shows = (function() {
  var configs = {
    noShows : '#no-shows',
    addShow : '.add-show',
    showsContainer : '#shows-list',
    shows : [
      {
        title:"The Show Below",
        miniMap : "http://maps.googleapis.com/maps/api/staticmap?center=1540+N+Milwaukee+Ave,+Chicago,+IL+60622&zoom=15&size=150x150&maptype=roadmap&markers=color:red%7C41.909297,-87.676301",
        venue: "Crocodile",
        address: "1540 N Milwaukee Ave, Chicago, IL",
        times: [
          "Friday (9PM - 10PM)"
        ],
        bookingTypes : [
          "Improv - Group"
        ],
        contactTypes : [
          "<a href='mailto:showbelowbooking@gmail.com'>Email</a>",
          "<a href='https://www.facebook.com/TheShowBelow'>FB</a>"
        ]
      },
      {
        title:"98.6 Presents Free Show", 
        miniMap : "http://maps.googleapis.com/maps/api/staticmap?center=952+W+Newport+Ave,+Chicago,+IL+60657&zoom=15&size=150x150&maptype=roadmap&markers=color:red%7C41.9446323,-87.6539266",
        venue: "The Underground Lounge",
        address: "952 W Newport Ave, Chicago IL",
        times: [
          "Monday (8PM - 9:30PM and 10PM - 11:30PM)",
          "Tuesday (8PM - 9:30PM and 10PM - 11:30PM)"
        ],
        bookingTypes : [
          "Improv - Solo",
          "Improv - Group",
          "Stand-up"
        ],
        contactTypes : [
          "<a href='mailto:98.6improv@gmail.com'>Email</a>",
          "<a href='http://www.supersaas.com/schedule/98point6/shows'>Show Sign-up</a>",
          "<a href='https://www.facebook.com/98point6'>FB</a>"
        ]
      },
      {
        title:"The New New Show",
        miniMap : "http://maps.googleapis.com/maps/api/staticmap?center=3209+N+Halsted+St,+Chicago,+IL+60657r&zoom=15&size=150x150&maptype=roadmap&markers=color:red%7C41.940317,-87.649118",
        venue: "The Playground Theater",
        address: "3209 N Halsted St, Chicago IL",
        times: [
          "Wednesday (8PM - 9:30PM)"
        ],
        bookingTypes : [
          "Improv - Group"
        ],
        contactTypes : [
          "<a href='mailto:newnewshow@gmail.com'>Email</a>",
          "<a href='https://www.facebook.com/pages/The-New-New-Show/660778720628843'>FB</a>"
        ]
      }
    ]
  };

  //*********//
  // Initialization
  //*********//
  var newShow, generateShow;

  // Handlebars Test - START
  var source = "{{#each shows}}"+
  "<!-- Show Listing -->"+
  "<section class='show panel panel-default'>"+
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
            "{{this}}"+
          "{{/each}}"+
       "</div>"+
       "<div class='col-md-3'>"+
         "<ul class='list-group'>"+
           "<li class='list-group-item active'>Booking</li>"+
           "{{#each bookingTypes}}"+
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
   "{{/each}}"

  var template = Handlebars.compile(source);

  var data = configs;

  var result = template(data);

  $(configs.showsContainer).append(result);

  // Handlebars Test - END

  // DEPRECATED - Still building out the funcionality. Not ready for 
  // people to add content yet.
  // attach new show event to button
  $(configs.addShow).on('click', function() {
    return newShow();
  });

  newShow = function() {
    // Remove the "No Shows" notice the first time through
    if ($(configs.noShows).length > 0) {
      $(configs.noShows).remove();
    } 
    
    $(configs.showsContainer).append(generateShow());
  }

  // DEPRECATED: 
  // Generic show
  // @TODO: pass parameters to new show
  generateShow = function() {
    showHTML = "";
    showHTML += "<section class='show col-md-12'>";
      showHTML += "<h2>Show</h2>";
      showHTML += "<div>Location Information</div>";
      showHTML += "<div class='row'>";
        showHTML += "<div class='col-md-4'>Google Map</div>";
        showHTML += "<div class='col-md-8'>Show Information</div>";
      showHTML += "</div>";
    showHTML += "</section>";

    return showHTML;
  }

  return {
    newShow : newShow
  }
})();