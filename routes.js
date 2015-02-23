//setup crossroads
crossroads.addRoute('/show/{id}/',function(id) {
  console.log("Show ID: " + id);
  utils.clean();
  show.init();
  show.displayShow(id);

  ga('send', 'pageview', {
    'page': '/show/'+id,
    'title': 'Show Page' + id 
  });
});
crossroads.addRoute('/festival/{id}/',function(id) {
  console.log("Show ID: " + id);
  utils.clean();
  show.init();
  show.displayFestival(id);

  ga('send', 'pageview', {
    'page': '/festival/'+id,
    'title': 'Festival Page' + id 
  });
});
crossroads.addRoute('/shows/',function() {
  console.log("Generate Shows List");
  utils.clean();
  shows.init();

  ga('send', 'pageview', {
    'page': '/shows/',
    'title': 'Shows Page'
  });
});
/* TODO: Add festivals route */
crossroads.addRoute('/festivals/',function() {
  console.log("Generate Festivals List");
  utils.clean();
  shows.init("festival_listings");

  ga('send', 'pageview', {
    'page': '/festivals/',
    'title': 'Festivals Page'
  });
});
/* TODO: Add about route */
/* TODO: Add edit page route */
/* TODO: Need a good way to clear the contents when switching contexts. 
I'm worried about memory leaks, slow page load times. */
crossroads.routed.add(console.log, console); //log all routes
 
//setup hasher
function parseHash(newHash, oldHash){
  console.log("Hashes: " + newHash + " " + oldHash);
  crossroads.parse(newHash);          
}
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change