$("#commentForm").on("submit", function(e){

    var query = new FormData();
    query.append("action", "addComment");
    query.append("content", e.target.content.value);
    query.append("author", e.target.author.value);
    query.append("episodeId", e.target.episodeId.value);


    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        var lastCommentData = JSON.parse(response);

        var title = lastCommentData.author + ", le " + lastCommentData.creationDate;
        var content = lastCommentData.content;

        var newLi = document.createElement("li");
        var newDiv = document.createElement("div");
        var newP = document.createElement("p");
        var newButton = document.createElement("button");

        newDiv.innerHTML = title;
        newP.innerHTML = content;
        newButton.innerHTML = "Signaler";

        newLi.append(newDiv);
        newLi.append(newP);
        newLi.append(newButton);

        $("#commentsList").prepend(newLi);
        $("#commentsList li").last().remove();

        $("#commentForm")[0].author.value = "";
        $("#commentForm")[0].content.value = "";

    });

    e.preventDefault();

});


$("#reportButton").on("click", function(e){

    var query = new FormData();
    query.append("action", "reportComment");
    query.append("commentId", "2"); //utiliser info par formulaire et input caché ?

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        var newP = $("<p>Ce commentaire a été signalé. Il sera vérifié par l'auteur.</p>");

        $("#reportButton").replaceWith(newP);

    });

});
