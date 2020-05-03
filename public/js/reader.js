let side = "reader";

let converter = new Converter();
let episodesHandler = new EpisodesHandler("#upcomingEpisode p", "#publishedEpisodes ol", "#currentEpisode", side);
let commentsHandler = new CommentsHandler("#addCommentDiv", "#commentsList", null, null, side);
let usersHandler = new UsersHandler(side, "#welcomeMessage", null, null, "#welcomeMessage");

let query = new FormData;
query.append("action", "getUserInSession");

ajaxPost("http://localhost/ocp4/index.php", query, function(response){

    let sessionUser = JSON.parse(response);

    usersHandler.pseudo == sessionUser.pseudo;
    usersHandler.status == sessionUser.status;

});

usersHandler.displayWelcomeMessage();

//display of the upcoming episode in the aside
episodesHandler.getUpcomingEpisode();

//display of the published episodes list in the aside
episodesHandler.getPublishedEpisodes();

//display of the latest episode in the article, with its comment section
episodesHandler.getLastPublishedEpisode();
