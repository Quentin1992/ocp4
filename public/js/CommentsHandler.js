class CommentsHandler {

    constructor(addLocation, listLocation, side) {
        //comments display locations :
        this.addLocation = addLocation;
        this.listLocation = listLocation;
        //reader or author ?
        this.side = side;
    }

    //CREATE

    addComment(content, author, episodeId){

        var query = new FormData();
        query.append("action", "addComment");
        query.append("content", content);
        query.append("author", author);
        query.append("episodeId", episodeId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            commentsHandler.getEpisodeComments(episodeId, 10);

        });
    };


    displayAddCommentForm(episodeId){

        let addCommentDiv = $("<div>");

        addCommentDiv.append($("<h4>").html("Publier un commentaire"));

        let addCommentForm = $("<form>", {
            id: "addCommentForm"
        });

        $("<label>", {
            for: "pseudo",
            html: "Pseudo : "
        }).appendTo(addCommentForm);
        $("<input>", {
            type: "text",
            name: "pseudo"
        }).appendTo(addCommentForm);

        $("<label>", {
            for: "content",
            html: "Commentaire : "
        }).appendTo(addCommentForm);
        $("<textarea>", {
            name: "content"
        }).appendTo(addCommentForm);
        $("<input>", {
            type: "submit",
            value: "Envoyer mon commentaire"
        }).appendTo(addCommentForm);

        addCommentForm.on("submit", function(e){

            commentsHandler.addComment(e.target.content.value, e.target.pseudo.value, episodeId);

            e.target.parentElement.innerHTML = "";

            commentsHandler.displayAddCommentButton(episodeId);

            e.preventDefault();
        });

        addCommentDiv.append(addCommentForm);

        $(this.addLocation).html("");
        $(this.addLocation).append(addCommentDiv);

    }


    displayAddCommentButton(episodeId){

        $(commentsHandler.addLocation).html("");

        let addCommentButton = $("<button>");
        addCommentButton.html("Ajouter un commentaire");
        addCommentButton.on("click", function(e){

            $(commentsHandler.addLocation).html("");

            if(commentsHandler.pseudo != undefined){

                commentsHandler.displayAddCommentForm(episodeId);
                e.target.remove();

            }
            else{

                commentsHandler.displayAddCommentButton(episodeId);
                $("<p>", {
                    html: "Vous devez être connecté pour publier un commentaire."
                }).appendTo($(commentsHandler.addLocation));


            }

        });
        $(commentsHandler.addLocation).append(addCommentButton);

    }


    //READ

    displayComment(commentData){

        let commentLi = document.createElement("li");

        if(commentData != undefined){

            let titleDiv = document.createElement("div");
            titleDiv.innerHTML = commentData.author + ", " + commentData.creationDate;
            commentLi.append(titleDiv);

            let contentP = document.createElement("p");
            contentP.innerHTML = commentData.content;
            commentLi.append(contentP);

            if(commentsHandler.side == "reader" && usersHandler.pseudo != undefined){

                let reportButton = document.createElement("button");
                reportButton.innerHTML = "Signaler";
                reportButton.addEventListener("click", function(e){

                    if(confirm("Signaler ce commentaire ?")){

                        commentsHandler.reportComment(commentData.id, commentData.episodeId);

                        let confirmP = document.createElement("p");
                        confirmP.innerHTML = "Commentaire signalé, il sera bientôt vérifié par l'auteur.";
                        e.target.replaceWith(confirmP);

                    }

                });

                commentLi.append(reportButton);

            }

        }
        else {

            let contentP = document.createElement("p");
            contentP.innerHTML = "Aucun commentaire.";
            commentLi.append(contentP);

        }

        $(this.listLocation).prepend(commentLi);

    };


    getEpisodeComments(episodeId, numberOfComments){

        $(commentsHandler.listLocation)[0].innerHTML = "";

        let query = new FormData();
        query.append("action", "getEpisodeComments");
        query.append("episodeId", episodeId);
        query.append("numberOfComments", numberOfComments);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let episodeComments = JSON.parse(response);

            if(episodeComments.length == 0){

                $(commentsHandler.listLocation).html("Aucun commentaire.");

            }
            else{

                episodeComments.forEach(function(commentData){

                    commentsHandler.displayComment(commentData);

                    commentsHandler.countEpisodeComments(episodeId, function(numberOfEpisodeComments){

                        if(numberOfEpisodeComments > episodeComments.length){

                            commentsHandler.displaySeeAllCommentsButton(episodeId);

                        }
                    });
                });
            }
        });
    }


    countEpisodeComments(episodeId, callback){

        let query = new FormData();
        query.append("action", "countEpisodeComments");
        query.append("episodeId", episodeId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(numberOfEpisodeComments){

            callback(numberOfEpisodeComments);

        });

    }


    displaySeeAllCommentsButton(episodeId){

        let seeAllCommentsButton = document.createElement("button");
        seeAllCommentsButton.innerHTML = "Voir tous les commentaires";
        seeAllCommentsButton.addEventListener("click", function(e){

            e.target.remove();
            commentsHandler.getEpisodeComments(episodeId, 100);

        });

        $(commentsHandler.listLocation).append(seeAllCommentsButton);

    }


    getComments(category){

        let query = new FormData();
        query.append("action", "getComments");
        query.append("category", "new");
        query.append("numberOfComments", numberOfComments);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let episodeComments = JSON.parse(response);

            $(commentsHandler.listLocation)[0].innerHTML = "";

            episodeComments.forEach(function(commentData){

                commentsHandler.displayComment(commentData);

            });

            if(numberOfComments < 100)
                commentsHandler.displaySeeAllCommentsButton(episodeId);

        });

    }


    //UPDATE

    reportComment(commentId, episodeId){

        let query = new FormData();
        query.append("action", "reportComment");
        query.append("commentId", commentId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        });

    }

}
