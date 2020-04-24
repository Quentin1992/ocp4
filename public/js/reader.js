function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let side = "reader";

let converter = new Converter();
let episodesHandler = new EpisodesHandler("#upcomingEpisode p", "#publishedEpisodes ol", "#currentEpisode", side);
let commentsHandler = new CommentsHandler("#addCommentDiv", "#commentsList", null, null, side);
let usersHandler = new UsersHandler(side, "#welcomeMessage", "#loginDiv");

usersHandler.pseudo = getCookie("pseudo");
usersHandler.status = getCookie("status");

usersHandler.displayWelcomeMessage();

//display of the upcoming episode in the aside
episodesHandler.getUpcomingEpisode();

//display of the published episodes list in the aside
episodesHandler.getPublishedEpisodes();

//display of the latest episode in the article, with its comment section
episodesHandler.getLastPublishedEpisode();
