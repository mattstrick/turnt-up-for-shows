//setup crossroads
crossroads.addRoute('/show/{id}/',function(id) {
  console.log("Show ID: " + id);
  show.init();
  show.displayShow(id);
});
crossroads.addRoute('/shows/',function(id) {
  console.log("Generate Shows List");
  shows.init();
});
/* TODO: Add festivals route */
crossroads.addRoute('/festivals/',function(id) {
  console.log("Generate Festivals List");
  shows.init("festival_listings");
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