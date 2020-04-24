class CommentsHandler {

    constructor(addLocation, episodeList, newList, reportedList, side) {
        //comments display locations :
        this.addLocation = addLocation;
        this.episodeList = episodeList;
        this.newList = newList;
        this.reportedList = reportedList;
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


    displayAddCommentButton(episodeId){

        $(commentsHandler.addLocation).html("");

        let addCommentButton = $("<button>");
        addCommentButton.html("Ajouter un commentaire");
        addCommentButton.on("click", function(e){

            $(commentsHandler.addLocation).html("");
            if((usersHandler.pseudo != undefined) && (usersHandler.pseudo != "")){

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


    displayAddCommentForm(episodeId){

        let addCommentDiv = $("<div>");

        addCommentDiv.append($("<h4>").html("Publier un commentaire"));

        let addCommentForm = $("<form>", {
            id: "addCommentForm"
        });

        // $("<label>", {
        //     for: "pseudo",
        //     html: "Pseudo : "
        // }).appendTo(addCommentForm);
        // $("<input>", {
        //     type: "text",
        //     name: "pseudo"
        // }).appendTo(addCommentForm);

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

            commentsHandler.addComment(e.target.content.value, usersHandler.pseudo, episodeId);

            e.target.parentElement.innerHTML = "";

            commentsHandler.displayAddCommentButton(episodeId);

            e.preventDefault();
        });

        addCommentDiv.append(addCommentForm);

        $(this.addLocation).html("");
        $(this.addLocation).append(addCommentDiv);

    }


    //READ

    getComments(category){

        let query = new FormData();
        query.append("action", "getComments");
        query.append("category", category);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let comments = JSON.parse(response);

            if(category == "new")
                $(commentsHandler.newList)[0].innerHTML = "";

            else if(category == "reported")
                $(commentsHandler.reportedList)[0].innerHTML = "";

            comments.forEach(function(commentData){

                commentsHandler.displayComment(commentData, category);

            });

            // if(numberOfComments < 100)
            //     commentsHandler.displaySeeAllCommentsButton(episodeId);

        });
    }


    getEpisodeComments(episodeId, numberOfComments){

        $(commentsHandler.episodeList)[0].innerHTML = "";

        let query = new FormData();
        query.append("action", "getEpisodeComments");
        query.append("episodeId", episodeId);
        query.append("numberOfComments", numberOfComments);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let episodeComments = JSON.parse(response);

            if(episodeComments.length == 0){

                $(commentsHandler.episodeList).html("Aucun commentaire.");

            }
            else{

                episodeComments.forEach(function(commentData){

                    commentsHandler.displayComment(commentData, "episode");

                    commentsHandler.countEpisodeComments(episodeId, function(numberOfEpisodeComments){

                        if(numberOfEpisodeComments > episodeComments.length){

                            commentsHandler.displaySeeAllCommentsButton(episodeId);

                        }
                    });
                });
            }
        });
    }


    displayComment(commentData, category){

        let commentLi = document.createElement("li");

        if(commentData != undefined){

            let creationDate = converter.datetimeToTextConverter(commentData.creationDate);

            let titleDiv = document.createElement("div");
            titleDiv.innerHTML = commentData.author + ", " + creationDate;
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
            else if(commentsHandler.side == "author" && usersHandler.status == "author"){

                let validateButton = document.createElement("button");
                validateButton.innerHTML = "Valider";
                validateButton.addEventListener("click", function(e){

                    if(confirm("Valider ce commentaire ?")){

                        commentsHandler.validateComment(commentData.id);

                        let confirmP = document.createElement("p");
                        confirmP.innerHTML = "Commentaire vérifié.";
                        e.target.replaceWith(confirmP);

                    }
                });
            }
        }
        else {

            let contentP = document.createElement("p");
            contentP.innerHTML = "Aucun commentaire.";
            commentLi.append(contentP);

        }

        let location;
        switch (category) {
            case "new":
                location = commentsHandler.newList;
                break;
            case "reported":
                location = commentsHandler.reportedList;
                break;
            case "episode":
                location = commentsHandler.episodeList;
                break;
            default:
                break;

        }

        $(location).prepend(commentLi);

    };


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

        $(commentsHandler.episodeList).append(seeAllCommentsButton);

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
