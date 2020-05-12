let side = "reader";

let converter = new Converter();
let episodesHandler = new EpisodesHandler("#upcomingEpisode div", "#publishedEpisodes ol", "#currentEpisode", side);
let commentsHandler = new CommentsHandler("#addCommentDiv", "#commentsList", null, null, side);
let usersHandler = new UsersHandler(side, "#welcomeMessage", null, null, "#welcomeMessage");

usersHandler.displayWelcomeMessage();
//display of the upcoming episode in the aside
episodesHandler.getUpcomingEpisode();
usersHandler.getUserInSession(function(userInSession){
    if(userInSession.status == "" || userInSession.status == undefined){
        //display of the published episodes list in the aside
        episodesHandler.getPublishedEpisodes("asc");
        //displays the first episode
        episodesHandler.getEpisode(1);
    } else {
        //display of the published episodes list in the aside
        episodesHandler.getPublishedEpisodes("desc");
        //display of the latest episode in the article, with its comment section
        episodesHandler.getLastPublishedEpisode();
    }
});
