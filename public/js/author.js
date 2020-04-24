let converter = new Converter();
let episodesHandler = new EpisodesHandler("#upcomingEpisodes ol", "#publishedEpisodes ol", "#workOnEpisode", "author");
let commentsHandler = new CommentsHandler("#addCommentDiv", "#commentsList", "#newComments ol", "#reportedComments ol", "author");
let usersHandler = new UsersHandler("reader", "#welcomeMessage", "#loginDiv");

//displays the list of the published episodes
episodesHandler.getPublishedEpisodes();

//displays the list of the episodes with an upcoming date of publication
episodesHandler.getUpcomingEpisodes();

//displays the button that allows to create a new episode
episodesHandler.displayNewEpisodeButton();

//get comments that have not been validated yet, from all episodes
commentsHandler.getComments("new");

//get reported comments from all episodes
commentsHandler.getComments("reported");


usersHandler.displayAddUserButton("#users");
usersHandler.getUsersList("#usersList");
