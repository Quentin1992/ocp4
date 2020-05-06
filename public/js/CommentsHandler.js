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

            usersHandler.getUserInSession(function(userInSession){

                $(commentsHandler.addLocation).html("");
                if(userInSession.pseudo != (undefined || "")){

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
        });
        $(commentsHandler.addLocation).append(addCommentButton);

    }


    displayAddCommentForm(episodeId){

        let addCommentForm = $("<form>", {
            id: "addCommentForm"
        });

        $("<label>", {
            for: "content",
            html: "Commentaire : "
        }).appendTo(addCommentForm);
        let contentInput = $("<textarea>", {
            name: "content"
        });
        contentInput.on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        });
        contentInput.appendTo(addCommentForm);
        $("<input>", {
            type: "submit",
            value: "Envoyer mon commentaire"
        }).appendTo(addCommentForm);

        addCommentForm.on("submit", function(e){

            e.preventDefault();

            usersHandler.getUserInSession(function(userInSession){

                commentsHandler.addComment(e.target.content.value, userInSession.pseudo, episodeId);

                e.target.parentElement.innerHTML = "";

                commentsHandler.displayAddCommentButton(episodeId);

            });

        });

        $(this.addLocation).html("");
        $(this.addLocation).append(addCommentForm);

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

            usersHandler.getUserInSession(function(userInSession){

                comments.forEach(function(commentData){

                    commentsHandler.displayComment(commentData, category, userInSession);

                });

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
            else {

                usersHandler.getUserInSession(function(userInSession){

                    episodeComments.forEach(function(commentData){

                        commentsHandler.displayComment(commentData, "episode", userInSession);

                    });

                    commentsHandler.countEpisodeComments(episodeId, function(numberOfEpisodeComments){

                        if(numberOfEpisodeComments > episodeComments.length){

                            commentsHandler.displaySeeAllCommentsButton(episodeId);

                        }
                    });
                });
            }
        });
    }


    displayComment(commentData, category, userInSession){

        let commentLi = document.createElement("li");
        let contentDiv = document.createElement("div");
        let buttonsDiv = document.createElement("div");


        if(commentData != undefined){

            let titleDiv = document.createElement("div");
            titleDiv.innerHTML = commentData.author + ", " + converter.datetimeToText(commentData.creationDate) + ".";
            contentDiv.append(titleDiv);

            let contentP = document.createElement("p");
            contentP.innerHTML = commentData.content;
            contentDiv.append(contentP);

            if((commentsHandler.side == "reader") && ((userInSession.pseudo != undefined) || (userInSession.pseudo != ""))){

                if(commentData.author != userInSession.pseudo){

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
                    buttonsDiv.append(reportButton);

                }
                else if(commentData.author == userInSession.pseudo){

                    let updateButton = document.createElement("button");
                    updateButton.innerHTML = "Modifier mon commentaire";
                    updateButton.addEventListener("click", function(e){

                        commentsHandler.displayUpdateCommentForm(commentData.id, commentData.episodeId, e.target);


                    });
                    buttonsDiv.append(updateButton);

                }
            }
            else if((commentsHandler.side == "author") && (userInSession.status == "writer")){

                let validateButton = document.createElement("button");
                validateButton.innerHTML = "Valider";
                validateButton.addEventListener("click", function(e){

                    if(confirm("Valider ce commentaire ?")){

                        commentsHandler.validateComment(commentData.id);

                        e.target.parentElement.remove();

                    }
                });
                buttonsDiv.append(validateButton);

                let deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Supprimer";
                deleteButton.addEventListener("click", function(e){

                    if(confirm("Supprimer ce commentaire ?")){

                        commentsHandler.deleteComment(commentData.id);

                        e.target.parentElement.remove();

                    }
                });
                buttonsDiv.append(deleteButton);

            }
        }
        else {

            let contentP = document.createElement("p");
            contentP.innerHTML = "Aucun commentaire.";
            contentDiv.append(contentP);

        }

        commentLi.append(contentDiv);
        commentLi.append(buttonsDiv);

        let location;
        switch (category) {
            case "new":
                $(commentsHandler.newList).append(commentLi);
                break;
            case "reported":
                $(commentsHandler.reportedList).append(commentLi);
                break;
            case "episode":
                $(commentsHandler.episodeList).append(commentLi);
                break;
            case "added":
                $(commentsHandler.episodeList).prepend(commentLi);
                break;
            default:
                break;

        }
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

    displayUpdateCommentForm(commentId, episodeId, trigger){

        let updateCommentForm = $("<form>", {
            id: "updateCommentForm",
            action: "#"
        });

        $("<label>", {
            for: "content",
            html: "Commentaire : "
        }).appendTo(updateCommentForm);
        let contentTextarea = $("<textarea>", {
            name: "content",
            html: trigger.parentElement.children[1].innerHTML,
            required: true
        });
        contentTextarea.on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        });
        contentTextarea.appendTo(updateCommentForm);

        $("<input>", {
            type: "submit",
            value: "Modifier mon commentaire"
        }).appendTo(updateCommentForm);

        updateCommentForm.on("submit", function(e){

            commentsHandler.updateComment(commentId, e.target.content.value, episodeId);

            e.target.remove();

            e.preventDefault();

        });
        console.log(trigger.parentElement.children[2]);
        trigger.parentElement.children[1].replaceWith(updateCommentForm[0]);
        trigger.parentElement.children[2].remove();

    }


    updateComment(commentId, content, episodeId){

        var query = new FormData();
        query.append("action", "updateComment");
        query.append("id", commentId);
        query.append("content", content);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            commentsHandler.getEpisodeComments(episodeId, 10);

        });

    }


    reportComment(commentId){

        let query = new FormData();
        query.append("action", "reportComment");
        query.append("commentId", commentId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        });

    }


    validateComment(commentId){

        let query = new FormData();
        query.append("action", "validateComment");
        query.append("commentId", commentId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        });

    }


    //DELETE

    deleteComment(commentId){

        let query = new FormData();
        query.append("action", "deleteComment");
        query.append("commentId", commentId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        });

    }

}
