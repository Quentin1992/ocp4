//comment function event
$("#commentForm").on("submit", function(e){

    var query = new FormData();
    query.append("action", "addComment");
    query.append("content", e.target.content.value);
    query.append("author", e.target.author.value);
    query.append("episodeId", e.target.episodeId.value);

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        var lastCommentData = JSON.parse(response);

        var li = $("<li>");
        //create and add comment title and content
        var div = $("<div>").innerHTML = lastCommentData.author + ", le " + lastCommentData.creationDate;
        var p = $("<p>").innerHTML = lastCommentData.content;
        li.append(div); li.append("<br /><br />");
        li.append(p); li.append("<br /><br />");

        //insert the new comment
        $("#commentsList").prepend(li);
        $("#commentsList li").last().remove();

        //clear form inputs
        $("#commentForm")[0].author.value = "";
        $("#commentForm")[0].content.value = "";

    });

    e.preventDefault();

});


//report comment function event
$(".reportForm").on("submit", function(e){

    var query = new FormData();
    query.append("action", "reportComment");
    query.append("commentId", e.target.commentId.value);

    ajaxPost("http://localhost/ocp4/index.php", query, function(){

        var p = document.createElement("p");
        p.innerHTML = "Ce commentaire a été signalé. Il sera vérifié par l'auteur.";
        e.target.replaceWith(p);

    });

    e.preventDefault();

});


//display episode event
$(".episodeLink").on("click", function(e){

    var query = new FormData();
    query.append("action", "getEpisode");
    query.append("episodeNumber", e.target.getAttribute("data-episode-number"));

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        var episodeData = JSON.parse(response);

        $("article h2").html(episodeData.number + ' - ' + episodeData.title);
        $("article p").first().html(episodeData.content);

        //for the comment form
        $("#commentForm input").first().val(episodeData.id);

    });

    e.preventDefault();

});

//display episode comments event
$(".episodeLink").on("click", function(e){

    var query = new FormData();
    query.append("action", "getEpisodeComments");
    query.append("episodeNumber", e.target.getAttribute("data-episode-number"));

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        var commentsData = JSON.parse(response);

        var commentsList = $("#commentsList");
        commentsList.html("");

        $.each(commentsData, function(key, value){

            var li = $("<li>");
            //create comment title and content
            var div = $("<div>").html($(this)[0].author + ", le " + $(this)[0].creationDate);
            var p = $("<p>").html($(this)[0].content);
            //create report form
            var form = $("<form>", {
                class: "reportForm",
                method: "post",
                action: "#"
            });
            $("<input>", {
                hidden: "true",
                type: "number",
                name: "commentId",
                value: $(this)[0].id
            }).appendTo(form);
            $("<input>", {
                type: "submit",
                value: "Signaler"
            }).appendTo(form);
            //fill li
            li.append(div);
            li.append(p);
            li.append(form);
            //add li to the comment list
            commentsList.append(li);
        });

        console.log($("#commentsList li").first());

    });

    e.preventDefault();

});
