class CommentsHandler {

    constructor(addLocation, episodeList, newList, reportedList, side) {
        //comments display locations :
        this.addLocation = addLocation;
        this.episodeList = episodeList;
        this.newList = newList;
        this.reportedList = reportedList;
        //reader or author
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
                $(commentsHandler.newList).html("");
            else if(category == "reported")
                $(commentsHandler.reportedList).html("");
            usersHandler.getUserInSession(function(userInSession){
                comments.forEach(function(commentData){
                    commentsHandler.displayComment(commentData, category, userInSession);
                });
            });
        });
    }

    getEpisodeComments(episodeId, numberOfComments){
        $(commentsHandler.episodeList).html("");
        let query = new FormData();
        query.append("action", "getEpisodeComments");
        query.append("episodeId", episodeId);
        query.append("numberOfComments", numberOfComments);
        ajaxPost("index.php", query, function(response){
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
        let commentLi = $("<li>");
        let contentDiv = $("<div>");
        let buttonsDiv = $("<div>");
        if(commentData != undefined){
            $("<div>").html(commentData.author + ", " + converter.datetimeToText(commentData.creationDate) + ".").appendTo(contentDiv);
            $("<p>").html(commentData.content).appendTo(contentDiv);
            //reader side, user connected
            if((commentsHandler.side == "reader") && ((userInSession.pseudo != undefined) || (userInSession.pseudo != ""))){
                //if user hasn't written this comment : report button
                if(commentData.author != userInSession.pseudo){
                    $("<button>").html("Signaler").on("click", function(e){
                        if(confirm("Signaler ce commentaire ?")){
                            commentsHandler.reportComment(commentData.id, commentData.episodeId);
                            e.target.replaceWith($("p").html("Commentaire signalé, il sera bientôt vérifié par l'auteur."));
                        }
                    }).appendTo(buttonsDiv);
                }
                //if user has written this comment : update button
                else if(commentData.author == userInSession.pseudo){
                    $("<button>").html("Modifier mon commentaire").on("click", function(e){
                        commentsHandler.displayUpdateCommentForm(commentData.id, commentData.episodeId, e.target);
                    }).appendTo(buttonsDiv);
                }
            }
            //author side, and he's connected (to avoid access to reader in case they find the url)
            else if((commentsHandler.side == "author") && (userInSession.status == "writer")){
                $("<button>").html("Valider").on("click", function(e){
                    if(confirm("Valider ce commentaire ?")){
                        commentsHandler.validateComment(commentData.id);
                        e.target.parentElement.remove();
                    }
                }).appendTo(buttonsDiv);
                $("<button>").html("Supprimer").on("click", function(e){
                    if(confirm("Supprimer ce commentaire ?")){
                        commentsHandler.deleteComment(commentData.id);
                        e.target.parentElement.remove();
                    }
                }).appendTo(buttonsDiv);
            }
        }
        else {
            $("<p>").html("Aucun commentaire.").appendTo(contentDiv);
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
        ajaxPost("index.php", query, function(numberOfEpisodeComments){
            callback(numberOfEpisodeComments);
        });
    }

    displaySeeAllCommentsButton(episodeId){
        $("<button>").html("Voir tous les commentaires").on("click", function(e){
            e.target.remove();
            commentsHandler.getEpisodeComments(episodeId, 100);
        }).appendTo(commentsHandler.episodeList);
    }

    //UPDATE

    displayUpdateCommentForm(commentId, episodeId, trigger){
        let updateCommentForm = $("<form>", {
            id: "updateCommentForm",
            action: "#"
        });
        $("<textarea>", {
            name: "content",
            html: trigger.parentElement.parentElement.children[0].lastElementChild.innerHTML,
            required: true
        }).on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        }).appendTo(updateCommentForm);
        $("<br>").appendTo(updateCommentForm);
        $("<input>", {
            type: "submit",
            value: "Confirmer la modification"
        }).appendTo(updateCommentForm);
        updateCommentForm.on("submit", function(e){
            commentsHandler.updateComment(commentId, e.target.content.value, episodeId);
            e.target.remove();
            e.preventDefault();
        });
        trigger.parentElement.parentElement.children[0].children[1].replaceWith(updateCommentForm[0]);
        trigger.parentElement.remove();
    }

    updateComment(commentId, content, episodeId){
        var query = new FormData();
        query.append("action", "updateComment");
        query.append("id", commentId);
        query.append("content", content);
        ajaxPost("index.php", query, function(response){
            commentsHandler.getEpisodeComments(episodeId, 10);
        });
    }

    reportComment(commentId){
        let query = new FormData();
        query.append("action", "reportComment");
        query.append("commentId", commentId);
        ajaxPost("index.php", query, function(response){});
    }

    validateComment(commentId){
        let query = new FormData();
        query.append("action", "validateComment");
        query.append("commentId", commentId);
        ajaxPost("index.php", query, function(response){});
    }

    //DELETE

    deleteComment(commentId){
        let query = new FormData();
        query.append("action", "deleteComment");
        query.append("commentId", commentId);
        ajaxPost("index.php", query, function(response){});
    }
}
