let side = "author";

let converter = new Converter();
let episodesHandler = new EpisodesHandler("#upcomingEpisodes ol", "#publishedEpisodes ol", "#workOnEpisode div", side);
let commentsHandler = new CommentsHandler("#addCommentDiv", "#commentsList", "#newComments ol", "#reportedComments ol", side);
let usersHandler = new UsersHandler(side, "#welcomeMessage", "#validatedUsers ol", "#newUsers ol", "#createUser div");

let query = new FormData;
query.append("action", "getUserInSession");

ajaxPost("http://localhost/ocp4/index.php", query, function(response){

    let sessionUser = JSON.parse(response);

    usersHandler.pseudo == sessionUser.pseudo;
    usersHandler.status == sessionUser.status;

    if(sessionUser.status == "writer"){

        //displays the list of the published episodes
        episodesHandler.getPublishedEpisodes();

        //displays the list of the episodes with an upcoming date of publication
        episodesHandler.getUpcomingEpisodes();

        //displays the button that allows to create a new episode
        episodesHandler.displayNewEpisodeButton();

        //gets comments that have not been validated yet ("new"), from all episodes
        commentsHandler.getComments("new");

        //gets reported comments from all episodes
        commentsHandler.getComments("reported");

        //gets a list of validated users
        usersHandler.getUsersList("validatedUsers");

        //
        usersHandler.getUsersList("newUsers");

        //
        usersHandler.displayAddUserButton();

    }
    
});
