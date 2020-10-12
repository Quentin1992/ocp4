class UsersHandler {

    constructor(side, welcomeLocation, validatedUsersList, newUsersList, addLocation) {
        this.side = side;
        //user informations :
        this.pseudo;
        this.status;
        //display locations :
        this.welcomeLocation = welcomeLocation;
        this.validatedUsersList = validatedUsersList;
        this.newUsersList = newUsersList;
        this.addLocation = addLocation;
    }

    //CREATE

    //display a button that display addUser form on click
    displayAddUserButton(){
        $(usersHandler.addLocation).append($("<button>").html("Créer un nouveau profil").on("click", function(){
            usersHandler.displayAddUserForm();
        }));
    }

    //displays a form with user data inputs, that triggers addUser on submit
    displayAddUserForm(){
        var addUserDiv = $("<div>", {
            id: "addUserDiv"
        });
        addUserDiv.append($("<h5>").html("Nouveau profil utilisateur :"));
        let addUserForm = $("<form>", {
            id: "addUserForm",
            action: "#"
        });
        addUserForm.append($("<label>", {
            for: "pseudo",
            html: "Pseudo : "
        }));
        addUserForm.append($("<input>", {
            type: "text",
            name: "pseudo",
            required: true
        }).on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        }));
        $("<br>").appendTo(addUserForm);
        if(usersHandler.side == "author"){
            addUserForm.append($("<label>", {
                for: "status",
                html: "Statut : "
            }));
            let statusSelect = $("<select>", {
                name: "status"
            });
            statusSelect.append($("<option>", {
                value: "reader",
                html: "lecteur"
            }));
            statusSelect.append($("<option>", {
                value: "author",
                html: "auteur"
            }));
            addUserForm.append(statusSelect);
            addUserForm.append($("<br>"));
        }
        addUserForm.append($("<label>", {
            for: "password",
            html: "Mot de passe : "
        }));
        addUserForm.append($("<input>", {
            type: "password",
            name: "password",
            required: true
        }).on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        }));
        addUserForm.append($("<br>"));
        addUserForm.append($("<label>", {
            for: "confirmPassword",
            html: "Confirmation du mot de passe : "
        }));
        addUserForm.append($("<input>", {
            type: "password",
            name: "confirmPassword",
            required: true
        }).on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        }));
        addUserForm.append($("<br>"));
        addUserForm.append($("<label>", {
            for: "email",
            html: "Email : "
        }));
        addUserForm.append($("<input>", {
            type: "email",
            name: "email"
        }));
        addUserForm.append($("<br>"));
        addUserForm.append($("<input>", {
            type: "checkbox",
            name: "getNewsletter",
            checked: false
        }));
        addUserForm.append($("<label>", {
            for: "getNewsletter",
            html: "Etre averti lors de la publication d'un nouvel épisode."
        }));
        addUserForm.append($("<br>"));
        addUserForm.append($("<input>", {
            type: "submit",
            value: "Créer le nouveau profil"
        }));
        addUserForm.on("submit", function(e){
            $(usersHandler.addLocation + " form p").remove();
            usersHandler.isPseudoAvailable(e.target.pseudo.value, function(pseudoAvailability){
                usersHandler.isEmailAvailable(e.target.email.value, function(emailAvailability){
                    if(pseudoAvailability && emailAvailability && (e.target.password.value == e.target.confirmPassword.value)){
                        if(confirm("Voulez-vous créer ce profil utilisateur ?")){
                            let email;
                            if(e.target.email.value.length == 0) { email = null; }
                            else { email = e.target.email.value; }
                            usersHandler.addUser(e.target.pseudo.value, null, e.target.password.value, email, e.target.getNewsletter.value);
                        }
                    } else {
                        if(!pseudoAvailability){
                            let warning = document.createElement("p");
                            warning.innerHTML = "Ce pseudo est déjà pris.";
                            e.target.appendChild(warning);
                        }
                        if(!emailAvailability){
                            let warning = document.createElement("p");
                            warning.innerHTML = "Cet adresse email est déjà prise.";
                            e.target.appendChild(warning);
                        }
                        if(e.target.password.value != e.target.confirmPassword.value){
                            let warning = document.createElement("p");
                            warning.innerHTML = "Le mot de passe doit être identique dans les deux champs.";
                            e.target.appendChild(warning);
                        }
                    }
                });
            });
            e.preventDefault();
        });
        addUserForm.appendTo(addUserDiv);
        addUserDiv.append($("<button>").html("Annuler").on("click", function(){
            $(usersHandler.addLocation).html("");
            if(usersHandler.side == "reader"){
                usersHandler.displayWelcomeMessage();
            }
            else if(usersHandler.side == "author"){
                usersHandler.displayAddUserButton();
            }
        }));
        $(usersHandler.addLocation).html("");
        $(usersHandler.addLocation).append(addUserDiv);
    }

    //sends user data in a new entry in database
    addUser(pseudo, status, password, email, getNewsletter){
        let query = new FormData();
        query.append("action", "addUser");
        query.append("pseudo", pseudo);
        query.append("status", status);
        query.append("password", password);
        query.append("email", email);
        query.append("getNewsletter", getNewsletter);
        ajaxPost("index.php", query, function(response){
            $("#addUserDiv").remove();
            if(usersHandler.side == "author")
                usersHandler.getUsersList();
            else if(usersHandler.side == "reader"){
                //usersHandler.sendConfirmationEmail(pseudo, password, email);
                let confirmationDiv = $("<div>");
                confirmationDiv.append($("<p>").html("Félicitations " + pseudo + ", votre profil a bien été créé."));
                // $("<p>", { html: "Un message a été envoyé à votre adresse mail. Merci de confirmer celle-ci en cliquant sur le lien qui s'y trouve." }).appendTo(confirmationDiv);
                confirmationDiv.append($("<p>").html("Vous pouvez dès à présent vous connecter."));
                usersHandler.displayConnectButton();
                $(usersHandler.addLocation).append(confirmationDiv);
            }
        });
    }

    // sendConfirmationEmail(pseudo, password, email){
    //     let query = new FormData();
    //     query.append("action", "sendConfirmationEmail");
    //     query.append("pseudo", pseudo);
    //     query.append("password", password);
    //     query.append("email", email);
    //     ajaxPost("index.php", query, function(response){
    //         console.log(response);
    //     });
    // }

    //READ

    getUserFromPseudo(pseudo, callback){
        let query = new FormData();
        query.append("action", "getUserFromPseudo");
        query.append("pseudo", pseudo);
        ajaxPost("index.php", query, function(response){
            let userData = JSON.parse(response);
            callback(userData);
        });
    }

    //a list of all unckecked (new) or checked (validated) users
    getUsersList(category){
        let query = new FormData();
        query.append("action", "getUsersList");
        query.append("category", category);
        ajaxPost("index.php", query, function(response){
            let users = JSON.parse(response);
            if(category == "newUsers"){
                $(usersHandler.newUsersList).html("");
            }
            if(category == "validatedUsers"){
                $(usersHandler.validatedUsersList).html("");
            }
            users.forEach(function(user){
                usersHandler.displayUser(user, category);
            });
        });
    }

    isPseudoAvailable(pseudo, callback){
        let query = new FormData();
        query.append("action", "isPseudoAvailable");
        query.append("pseudo", pseudo);
        ajaxPost("index.php", query, function(response){
            let pseudoAvailability = JSON.parse(response);
            callback(pseudoAvailability);
        });
    }

    isEmailAvailable(email, callback){
        let query = new FormData();
        query.append("action", "isEmailAvailable");
        query.append("email", email);
        ajaxPost("index.php", query, function(response){
            let emailAvailability = JSON.parse(response);
            callback(emailAvailability);
        });
    }

    //user data in a list element
    displayUser(user, category){
        let userLi = $("<li>");
        let contentDiv = $("<div>");
        let buttonsDiv = $("<div>");
        let getNewsletter = "";
        if(user.getNewsletter == true){
            getNewsletter = " (abonné à la newsletter)";
        } else if(user.getNewsletter == false){
            getNewsletter = " (non abonné à la newsletter)";
        }
        let userStatus = "";
        if(user.status == "reader")
            userStatus = "lecteur";
        if(user.status == "writer")
            userStatus = "auteur";
        contentDiv.append($("<p>").html(user.pseudo
            + "<br />Statut : " + userStatus
            + "<br />Email : " + user.email + getNewsletter
            + "<br />Date d'inscription : " + converter.datetimeToText(user.registrationDate)));
        if(category == "newUsers"){
            buttonsDiv.append($("<button>").html("Valider").on("click", function(e){
                if(confirm("Voulez-vous valider ce profil utilisateur ?")){
                    usersHandler.validateUser(user.id);
                    usersHandler.getUsersList("newUsers");
                    usersHandler.getUsersList("validatedUsers");
                }
            }));
        }
        if(category == "validatedUsers"){
            buttonsDiv.append($("<button>").html("Modifier").on("click", function(e){
                usersHandler.displayUdapteUserForm(user);
            }));
        }
        buttonsDiv.append($("<button>").html("Supprimer").on("click", function(e){
            if(confirm("Voulez-vous supprimer ce profil utilisateur ?")){
                usersHandler.deleteUser(user.id);
                usersHandler.getUsersList("newUsers");
                usersHandler.getUsersList("validatedUsers");
            }
        }));
        userLi.append(contentDiv);
        userLi.append(buttonsDiv);
        if(category == "newUsers"){
            $(usersHandler.newUsersList).append(userLi);
        }
        else if(category == "validatedUsers"){
            $(usersHandler.validatedUsersList).append(userLi);
        }
    }

    //a welcome sentence, with connect and adduser buttons
    displayWelcomeMessage(){
        usersHandler.getUserInSession(function(userInSession){
            $(usersHandler.welcomeLocation).html("");
            let welcomeP = $("<p>");
            welcomeP.html("Bonjour ");
            if(userInSession.pseudo != (undefined || "")){
                usersHandler.getUserFromPseudo(userInSession.pseudo, function(userData){
                    welcomeP.html(welcomeP.html() + userInSession.pseudo + ", ravi de vous revoir.");
                    $(usersHandler.welcomeLocation).append(welcomeP);
                    usersHandler.displayDisconnectButton();
                    if(userInSession.status == "reader"){
                        $(usersHandler.welcomeLocation).append($("<button>").html("Modifier mon profil").on("click", function(){
                            usersHandler.displayUdapteUserForm(userData);
                        }));
                    }
                    if(userInSession.status == "writer"){
                        $(usersHandler.welcomeLocation).append($("<a>").html("Gestion du blog").attr("href", "index.php?action=authorView"));
                    }
                });
            }
            else {
                welcomeP.html(welcomeP.html() + "cher lecteur, bienvenue.");
                $(usersHandler.welcomeLocation).append(welcomeP);
                usersHandler.displayConnectButton();
                usersHandler.displayAddUserButton();
            }
        });
    }

    displayDisconnectButton(){
        $(usersHandler.welcomeLocation).append($("<button>").html("Se déconnecter").on("click", function(){
            if(confirm("Etes-vous sûr de vouloir vous déconnecter ?")){
                usersHandler.closeUserSession();
            }
        }));
    }

    //a button that triggers connectUser form on click
    displayConnectButton(){
        $(usersHandler.welcomeLocation).append($("<button>").html("Se connecter").on("click", function(){
            usersHandler.displayConnectForm();
        }));
    }

    //a form that triggers connectUser function on submit
    displayConnectForm(){
        let connectDiv = $("<div>");
        connectDiv.append($("<h3>").html("Connexion au blog"));
        let connectForm = $("<form>", {
            id: "connectForm"
        });
        connectForm.append($("<label>", {
            for: "pseudo",
            html: "Pseudo : "
        }));
        connectForm.append($("<input>", {
            type: "text",
            name: "pseudo",
            required: true
        }).on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        }));
        connectForm.append($("<br>"));
        connectForm.append($("<label>", {
            for: "password",
            html: "Mot de passe : "
        }));
        connectForm.append($("<input>", {
            type: "password",
            name: "password",
            required: true
        }).on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        }));
        connectForm.append($("<br>"));
        connectForm.append($("<input>", {
            type: "submit",
            value: "Se connecter"
        }));
        connectForm.on("submit", function(e){
            usersHandler.openUserSession(e.target.pseudo.value, e.target.password.value);
            e.preventDefault();
        });
        connectDiv.append(connectForm);
        connectDiv.append($("<button>").html("Annuler").on("click", function(){
            $(usersHandler.welcomeLocation).html("");
            usersHandler.displayWelcomeMessage();
        }));
        $(usersHandler.welcomeLocation).html("");
        $(usersHandler.welcomeLocation).append(connectDiv);
    }

    openUserSession(pseudo, password){
        var query = new FormData;
        query.append("action", "openUserSession");
        query.append("pseudo", pseudo);
        query.append("password", password);
        ajaxPost("index.php", query, function(response){
            //if we got a status, it means the combination pseudo/password is correct
            if((response == "reader") || (response == "writer")){
                usersHandler.displayWelcomeMessage();
                commentsHandler.displayAddCommentButton();
                episodesHandler.getLastPublishedEpisode();
                episodesHandler.getPublishedEpisodes("desc");
            }
            else{
                alert(response);
            }
        });
    }

    closeUserSession(){
        let query = new FormData();
        query.append("action", "closeUserSession");
        ajaxPost("index.php", query, function(response){
            usersHandler.displayWelcomeMessage();
            //displays the first episode
            episodesHandler.getEpisode(1);
            episodesHandler.getPublishedEpisodes("asc");
        });
    }

    updatePseudoInSession(pseudo){
        var query = new FormData;
        query.append("action", "updatePseudoInSession");
        query.append("pseudo", pseudo);
        ajaxPost("index.php", query, function(response){});
    }

    getUserInSession(callback){
        let query = new FormData;
        query.append("action", "getUserInSession");
        ajaxPost("index.php", query, function(response){
            let userInSession = JSON.parse(response);
            callback(userInSession);
        });
    }

    //UDPATE

    //a form that triggers updateUser event
    displayUdapteUserForm(user){
        $(".updateUserDiv").remove();
        var updateUserDiv = $("<div>", {
            class: "updateUserDiv"
        });
        updateUserDiv.append($("<h3>").html('Mise à jour du profil de ' + user.pseudo));
        let updateUserForm = $("<form>", {
            id: "updateUserForm",
            action: "#"
        });
        updateUserForm.append($("<label>", {
            for: "pseudo",
            html: "Pseudo : "
        }));
        updateUserForm.append($("<input>", {
            type: "text",
            name: "pseudo",
            value: user.pseudo,
            required: true
        }));
        updateUserForm.append($("<br>"));
        if(usersHandler.side == "author"){
            updateUserForm.append($("<label>", {
                for: "status",
                html: "Statut : "
            }));
            let statusSelect = $("<select>", {
                name: "status"
            });
            statusSelect.append($("<option>", {
                value: "reader",
                html: "lecteur"
            }));
            statusSelect.append($("<option>", {
                value: "author",
                html: "auteur"
            }));
            updateUserForm.append(statusSelect);
            updateUserForm.append($("<br>"));
        }
        updateUserForm.append($("<label>", {
            for: "email",
            html: "Email : "
        }));
        updateUserForm.append($("<input>", {
            type: "email",
            name: "email",
            value: user.email,
            required: true
        }));
        updateUserForm.append($("<br>"));
        updateUserForm.append($("<input>", {
            type: "checkbox",
            name: "newsletter",
            checked: user.getNewsletter
        }));
        updateUserForm.append($("<label>", {
            for: "newsletter",
            html: "Etre averti lors de la publication d'un nouvel épisode."
        }));
        updateUserForm.append($("<br>"));
        if(usersHandler.side == "reader"){
            updateUserForm.append($("<label>", {
                for: "newPassword",
                html: "Nouveau mot de passe : "
            }));
            updateUserForm.append($("<input>", {
                type: "password",
                name: "newPassword",
                placeholder: "Pas de changement"
            }).one("focus", function(e){
                $("<input>", {
                    type: "password",
                    name: "confirmNewPassword",
                    placeholder: "Pas de changement"
                }).insertAfter(e.target);
                $("<label>", {
                    for: "confirmNewPassword",
                    html: "Confirmer le nouveau mot de passe : "
                }).insertAfter(e.target);
                $("<br>").insertAfter(e.target);
            }));
        }
        updateUserForm.append($("<br>"));
        updateUserForm.append($("<input>", {
            type: "submit",
            value: "Envoyer les modifications"
        }));
        updateUserForm.on("submit", function(e){
            if(usersHandler.side == "reader"){
                let newPassword = "";
                if(e.target.newPassword.value != ""){
                    if(e.target.newPassword.value == e.target.confirmNewPassword.value){
                        newPassword = e.target.newPassword.value;
                    }
                    else {
                        $("<span>").html("Le mot de passe doit être identique dans les deux champs.").insertAfter(e.target.confirmNewPassword);
                    }
                }
                usersHandler.updateUser(user.id, e.target.pseudo.value, JSON.stringify(null), newPassword, e.target.email.value, e.target.newsletter.checked);
                usersHandler.updatePseudoInSession(e.target.pseudo.value);
                usersHandler.displayWelcomeMessage();
            }
            else {
                usersHandler.updateUser(user.id, e.target.pseudo.value, e.target.status.value, e.target.email.value, e.target.newsletter.checked);
            }
            e.preventDefault();
        });
        updateUserForm.append($("<button>").html("Annuler").on("click", function(){
            $(usersHandler.addLocation).html("");
            if(usersHandler.side == "reader"){
                usersHandler.displayWelcomeMessage();
            }
            else if(usersHandler.side == "author"){
                usersHandler.displayAddUserButton();
            }
        }));
        updateUserDiv.append(updateUserForm);
        $(usersHandler.addLocation).html("");
        $(usersHandler.addLocation).append(updateUserDiv);
        if(usersHandler.side == "author"){
            $("html").animate({
                scrollTop: $("#createUser").offset().top
            }, 1000);
        }
    }

    //updates a user in database
    updateUser(id, pseudo, status, password, email, getNewsletter){
        let query = new FormData();
        query.append("action", "updateUser");
        query.append("id", id);
        query.append("pseudo", pseudo);
        query.append("status", status);
        query.append("password", password);
        query.append("email", email);
        query.append("getNewsletter", getNewsletter);
        ajaxPost("index.php", query, function(response){
            usersHandler.getUsersList("newUsers");
            usersHandler.getUsersList("validatedUsers");
            if(usersHandler.side == "author"){
                $("html").animate({
                    scrollTop: $("#newUsers").offset().top
                }, 1000);
            }
        });
    }

    validateUser(userId){
        let query = new FormData();
        query.append("action", "validateUser");
        query.append("id", userId);
        ajaxPost("index.php", query, function(response){});
    }

    //DELETE

    deleteUser(id){
        let query = new FormData();
        query.append("action", "deleteUser");
        query.append("id", id);
        ajaxPost("index.php", query, function(response){
            usersHandler.getUsersList("#usersList");
        });
    }
}
