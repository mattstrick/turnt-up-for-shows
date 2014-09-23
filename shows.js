var shows = (function() {
  var configs = {
    noShows : '#no-shows',
    addShow : '.add-show',
    showsContainer : '#shows-list'
  }

  //*********//
  // Initialization
  //*********//
  var newShow, generateShow;

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