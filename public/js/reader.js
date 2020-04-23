let converter = new Converter();
let episodesHandler = new EpisodesHandler("#upcomingEpisode", "#publishedEpisodes ol", "#currentEpisode", "reader");
let commentsHandler = new CommentsHandler("#addCommentDiv", "#commentsList", "reader");
let usersHandler = new UsersHandler("reader", "#welcomeMessage", "#loginDiv");

usersHandler.displayWelcomeMessage();

//display of the upcoming episode in the aside
episodesHandler.getUpcomingEpisode();

//display of the published episodes list in the aside
episodesHandler.getPublishedEpisodes();

//display of the latest episode in the article, with its comment section
episodesHandler.getLastPublishedEpisode();


//COMMENTS
//CREATE COMMENTS


//
//
// //comment function event
// $("#commentForm").on("submit", function(e){
//
//     comments.addComment(e.target.content.value, e.target.author.value, e.target.episodeId.value, function(commentData){
//
//         comments.displayComment(commentData, "#commentsList");
//
//         comments.limitListLength("#commentsList", 10);
//
//         e.target.remove();
//
//     });
//
//     e.preventDefault();
//
// });
//
//
// //READ COMMENTS
//
// //display episode comments event
// $(".episodeLink, #seeAllCommentsButton").on("click", function(e){
//
//     var query = new FormData();
//     query.append("action", "getEpisodeComments");
//     query.append("episodeNumber", e.target.getAttribute("data-episode-number"));
//     query.append("numberOfComments", e.target.getAttribute("data-number-of-comments"));
//
//     ajaxPost("http://localhost/ocp4/index.php", query, function(response){
//
//         var commentsData = JSON.parse(response);
//
//         var commentsList = $("#commentsList");
//         commentsList.html("");
//
//         $.each(commentsData, function(key, value){
//
//             var li = $("<li>");
//             //create comment title and content
//             var div = $("<div>").html($(this)[0].author + ", " + $(this)[0].creationDate);
//             var p = $("<p>").html($(this)[0].content);
//             //create report form
//             var form = $("<form>", {
//                 class: "reportForm",
//                 method: "post",
//                 action: "#"
//             });
//             $("<input>", {
//                 hidden: "true",
//                 type: "number",
//                 name: "commentId",
//                 value: $(this)[0].id
//             }).appendTo(form);
//             $("<input>", {
//                 type: "submit",
//                 value: "Signaler"
//             }).appendTo(form);
//             //fill li
//             li.append(div);
//             li.append(p);
//             li.append(form);
//             //add li to the comment list
//             commentsList.append(li);
//         });
//
//     });
//
//     e.preventDefault();
//
// });
//
//
// //UPDATE COMMENTS
//
// //report comment function event
// $(".reportButton").on("click", function(e){
//
//     var query = new FormData();
//     query.append("action", "reportComment");
//     query.append("commentId", e.target.getAttribute("data-comment-id"));
//
//     ajaxPost("http://localhost/ocp4/index.php", query, function(){
//
//         var p = document.createElement("p");
//         p.innerHTML = "Ce commentaire a été signalé. Il sera vérifié par l'auteur.";
//         e.target.replaceWith(p);
//
//     });
//
//     e.preventDefault();
//
// });
//
//
// //DELETE COMMENTS
//
//
// //EPISODES
//
//
// //CREATE EPISODES
//
//
// //READ EPISODES
//
//
//
//
// //display episode event
// $(".episodeLink").on("click", function(e){
//
//     var query = new FormData();
//     query.append("action", "getEpisode");
//     query.append("episodeNumber", e.target.getAttribute("data-episode-number"));
//
//     ajaxPost("http://localhost/ocp4/index.php", query, function(response){
//
//         var episodeData = JSON.parse(response);
//
//         $("article h2").html(episodeData.number + ' - ' + episodeData.title);
//         $("article p").first().html(episodeData.content);
//
//         //for the comment form
//         $("#commentForm input").first().val(episodeData.id);
//
//         $("#seeAllCommentsButton").attr("data-episode-number", episodeData.number);
//
//     });
//
//     e.preventDefault();
//
// });
//
//
// //UPDATE EPISODES
//
//
// //DELETE EPISODES
