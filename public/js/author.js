let converter = new Converter();
let episodesHandler = new EpisodesHandler("#upcomingEpisodes ol", "#publishedEpisodes ol", "#workOnEpisode", "author");
let commentsHandler = new CommentsHandler("#addCommentDiv", "#commentsList", "author");
let usersHandler = new UsersHandler("reader", "#welcomeMessage", "#loginDiv");

//displays the list of the published episodes
episodesHandler.getPublishedEpisodes();

//displays the list of the episodes with an upcoming date of publication
episodesHandler.getUpcomingEpisodes();

//displays the button that allows to create a new episode
episodesHandler.displayNewEpisodeButton();

//get comments that have not been validated yet, from all episodes
commentsHandler.getNewComments();

//get reported comments from all episodes
commentsHandler.getReportedComments();


usersHandler.displayAddUserButton("#users");
usersHandler.getUsersList("#usersList");


//COMMENTS
//CREATE COMMENT

//READ COMMENT

//UPDATE COMMENT

//validate comment event
// $(".validateCommentButton").on("click", function(e){
//
//     var query = new FormData();
//     query.append("action", "validateComment");
//     query.append("commentId", e.target.getAttribute("data-comment-id"));
//
//     ajaxPost("http://localhost/ocp4/index.php", query, function(){
//
//         var p = document.createElement("p");
//         p.innerHTML = "Ce commentaire a bien été validé.";
//         e.target.parentElement.parentElement.replaceWith(p);
//
//     });
//
//     e.preventDefault();
//
// });


//DELETE COMMENT

//delete comment event
// $(".deleteCommentButton").on("click", function(e){
//
//     var query = new FormData();
//     query.append("action", "deleteComment");
//     query.append("commentId", e.target.getAttribute("data-comment-id"));
//
//     ajaxPost("http://localhost/ocp4/index.php", query, function(){
//
//         var p = document.createElement("p");
//         p.innerHTML = "Ce commentaire a bien été supprimé.";
//         e.target.parentElement.parentElement.replaceWith(p);
//
//     });
//
// });
