//COMMENTS
//CREATE COMMENT


//READ COMMENT


//UPDATE COMMENT

//validate comment event
$(".validateCommentButton").on("click", function(e){

    var query = new FormData();
    query.append("action", "validateComment");
    query.append("commentId", e.target.getAttribute("data-comment-id"));

    ajaxPost("http://localhost/ocp4/index.php", query, function(){

        var p = document.createElement("p");
        p.innerHTML = "Ce commentaire a bien été validé.";
        e.target.parentElement.parentElement.replaceWith(p);

    });

    e.preventDefault();

});


//DELETE COMMENT

//delete comment event
$(".deleteCommentButton").on("click", function(e){

    var query = new FormData();
    query.append("action", "deleteComment");
    query.append("commentId", e.target.getAttribute("data-comment-id"));

    ajaxPost("http://localhost/ocp4/index.php", query, function(){

        var p = document.createElement("p");
        p.innerHTML = "Ce commentaire a bien été supprimé.";
        e.target.parentElement.parentElement.replaceWith(p);

    });

});


//EPISODES
//CREATE EPISODE

//add episode event
$(document).on("submit", "#newEpisodeForm", function(e){

    var query = new FormData();
    query.append("action", "addEpisode");
    query.append("number", e.target.episodeNumber.value);
    query.append("title", e.target.title.value);
    query.append("content", e.target.content.value);
    query.append("publicationDate", e.target.publicationDate.value);

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        $("#newEpisodeDiv")[0].remove();

        //confirm publication

    });
    e.preventDefault();
});


//READ EPISODE

//work on existing episode event
$(".episodeLink").on("click", function(e){

    var query = new FormData();
    query.append("action", "getEpisode");
    query.append("episodeNumber", e.target.getAttribute("data-episode-number"));

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        var episodeData = JSON.parse(response);

        $("#updateEpisodeDiv").html("");

        var updateDiv = $("<div>", {
            id: "updateEpisodeDiv"
        });

        $("<h2>").html('Mise à jour de l\'épisode ' + episodeData.number + " : " + episodeData.title).appendTo(updateDiv);

        var updateForm = $("<form>", {
            id: "updateEpisodeForm",
            method: "post",
            action: "#"
        });
        $("<input>", {
            hidden: "true",
            type: "number",
            name: "episodeId",
            value: episodeData.id
        }).appendTo(updateForm);
        $("<input>", {
            type: "number",
            name: "episodeNumber",
            value: episodeData.number
        }).appendTo(updateForm);
        $("<input>", {
            type: "text",
            name: "title",
            value: episodeData.title
        }).appendTo(updateForm);
        $("<textarea>", {
            id: "myTextArea",
            name: "content",
            html: episodeData.content
        }).appendTo(updateForm);
        $("<input>", {
            type: "datetime",
            name: "publicationDate",
            value: episodeData.publicationDate
        }).appendTo(updateForm);
        $("<input>", {
            type: "submit",
            value: "Mettre à jour cet épisode"
        }).appendTo(updateForm);

        updateForm.appendTo(updateDiv);
        updateDiv.insertAfter("#episodes");

    });
    e.preventDefault();
});


//UPDATE EPISODE

//update episode event
$(document).on("submit", "#updateEpisodeForm", function(e){

    var query = new FormData();
    query.append("action", "updateEpisode");
    query.append("id", e.target.episodeId.value);
    query.append("number", e.target.episodeNumber.value);
    query.append("title", e.target.title.value);
    query.append("content", e.target.content.value);
    query.append("publicationDate", e.target.publicationDate.value);

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        //clear form inputs
        $("#updateEpisodeDiv")[0].remove()

        //confirm publication

    });
    e.preventDefault();
});


//DELETE EPISODE

//delete episode event
$(".deleteEpisodeButton").on("click", function(e){

    var query = new FormData();
    query.append("action", "deleteEpisode");
    query.append("episodeId", e.target.getAttribute("data-episode-id"));

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        var p = document.createElement("p");
        p.innerHTML = "Cet épisode a bien été supprimé.";
        e.target.parentElement.replaceWith(p);

    });
});


//NOT CRUD

//display new episode div event
$("#newEpisodeButton").on("click", function(e){

    $("#updateEpisodeDiv").remove();

    var newEpisodeDiv = $("<div>", {
        id: "newEpisodeDiv"
    });

    $("<h2>").html("Création d'un nouvel épisode.").appendTo(newEpisodeDiv);

    var newEpisodeForm = $("<form>", {
        id: "newEpisodeForm",
        method: "post",
        action: "#"
    });
    $("<input>", {
        type: "number",
        name: "episodeNumber"
    }).appendTo(newEpisodeForm);
    $("<input>", {
        type: "text",
        name: "title"
    }).appendTo(newEpisodeForm);
    $("<textarea>", {
        id: "myTextArea",
        name: "content"
    }).appendTo(newEpisodeForm);
    $("<input>", {
        type: "datetime",
        name: "publicationDate"
    }).appendTo(newEpisodeForm);
    $("<input>", {
        type: "submit",
        value: "Envoyer le nouvel épisode"
    }).appendTo(newEpisodeForm);

    newEpisodeForm.appendTo(newEpisodeDiv);

    newEpisodeDiv.insertAfter("#episodes");

});
