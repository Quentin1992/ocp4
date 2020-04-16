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

        $("#newEpisodeForm").replaceWith($("<p>").html("Vous avez créé l'épisode " + e.target.episodeNumber.value + " : " + e.target.title.value + "."));

        //display episode in the list ?

    });
    e.preventDefault();
});


//READ EPISODE

//add episode event
$(document).on("submit", "#newEpisodeForm", function(e){

    var query = new FormData();
    query.append("action", "getEpisode");
    query.append("number", e.target.episodeNumber.value);
    query.append("title", e.target.title.value);
    query.append("content", e.target.content.value);
    query.append("publicationDate", e.target.publicationDate.value);

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        $("#newEpisodeForm").replaceWith($("<p>").html("Vous avez créé l'épisode " + e.target.episodeNumber.value + " : " + e.target.title.value + "."));

    });
    e.preventDefault();
});


//work on existing episode event
$(".episodeLink").on("click", function(e){

    var query = new FormData();
    query.append("action", "getEpisode");
    query.append("episodeNumber", e.target.getAttribute("data-episode-number"));

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        var episodeData = JSON.parse(response);

        $("#updateEpisodeDiv").remove();
        $("#newEpisodeDiv").remove();

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

        tinymce.init({
            selector: '#mytextarea'
        });

        $("<input>", {
            type: "datetime",
            name: "publicationDate",
            value: episodeData.publicationDate
        }).appendTo(updateForm);

        $("<span>", { html: "Publication le  " }).appendTo(updateForm);

        var selectDay = $("<select>", { id: "day" });
        for(i=1; i <= 31; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectDay);
        }
        selectDay.appendTo(updateForm);

        $("<span>", { html: " / " }).appendTo(updateForm);

        var selectMonth = $("<select>", { id: "month" });
        for(i=1; i <= 12; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectMonth);
        }
        selectMonth.appendTo(updateForm);

        $("<span>", { html: " / " }).appendTo(updateForm);

        var selectYear = $("<select>", { id: "year" });
        for(i=2020; i <= 2025; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectYear);
        }
        selectYear.appendTo(updateForm);

        $("<span>", { html: "  à  " }).appendTo(updateForm);

        var selectHour = $("<select>", { id: "hour" });
        for(i=0; i <= 23; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectHour);
        }
        selectHour.appendTo(updateForm);

        $("<span>", { html: " h " }).appendTo(updateForm);

        var selectMinute = $("<select>", { id: "minute" });
        for(i=0; i <= 59; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectMinute);
        }
        selectMinute.appendTo(updateForm);

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

        $("#updateEpisodeForm").replaceWith($("<p>").html("Vous avez mis à jour cet épisode."));

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


//USERS
//CREATE USERS

const usersHandler = new UsersHandler();

usersHandler.getUsersList("#usersList");


//UPDATE USERS

$





//NOT CRUD

//display new episode div event
$("#newEpisodeButton").on("click", function(e){

    $("#updateEpisodeDiv").remove();
    $("#newEpisodeDiv").remove();

    var newEpisodeDiv = $("<div>", {
        id: "newEpisodeDiv"
    });

    $("<h3>").html("Création d'un nouvel épisode.").appendTo(newEpisodeDiv);

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
