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

        let addUserButton = document.createElement("button");
        addUserButton.innerHTML = "Créer un nouveau profil";
        addUserButton.id = "addUserButton";

        addUserButton.addEventListener("click", function(){

            usersHandler.displayAddUserForm();

        });

        $(usersHandler.addLocation).append(addUserButton);

    }


    //displays a form with user data inputs, that triggers addUser on submit
    displayAddUserForm(){

        var addUserDiv = $("<div>", {
            id: "addUserDiv"
        });

        $("<h3>").html("Nouveau profil utilisateur :").appendTo(addUserDiv);

        let addUserForm = $("<form>", {
            id: "addUserForm",
            method: "post",
            action: "#"
        });

        $("<label>", {
            for: "pseudo",
            html: "Pseudo : "
        }).appendTo(addUserForm);
        let pseudoInput = $("<input>", {
            type: "text",
            name: "pseudo",
            required: true
        });
        pseudoInput.on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        });
        pseudoInput.appendTo(addUserForm);

        $("<br>").appendTo(addUserForm);

        if(usersHandler.side == "author"){

            $("<label>", {
                for: "status",
                html: "Statut : "
            }).appendTo(addUserForm);
            let statusSelect = $("<select>", {
                name: "status"
            });
            $("<option>", {
                value: "reader",
                html: "lecteur"
            }).appendTo(statusSelect);
            $("<option>", {
                value: "author",
                html: "auteur"
            }).appendTo(statusSelect);
            statusSelect.appendTo(addUserForm);

            $("<br>").appendTo(addUserForm);

        }

        $("<label>", {
            for: "password",
            html: "Mot de passe : "
        }).appendTo(addUserForm);
        let passwordInput = $("<input>", {
            type: "password",
            name: "password",
            required: true
        });
        passwordInput.on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        });
        passwordInput.appendTo(addUserForm);

        $("<br>").appendTo(addUserForm);

        $("<label>", {
            for: "confirmPassword",
            html: "Confirmation du mot de passe : "
        }).appendTo(addUserForm);
        let confirmPasswordInput = $("<input>", {
            type: "password",
            name: "confirmPassword",
            required: true
        });
        confirmPasswordInput.on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        });
        confirmPasswordInput.appendTo(addUserForm);

        $("<br>").appendTo(addUserForm);

        $("<label>", {
            for: "email",
            html: "Email : "
        }).appendTo(addUserForm);
        $("<input>", {
            type: "email",
            name: "email"
        }).appendTo(addUserForm);

        $("<br>").appendTo(addUserForm);

        $("<input>", {
            type: "checkbox",
            name: "getNewsletter",
            checked: false
        }).appendTo(addUserForm);
        $("<label>", {
            for: "getNewsletter",
            html: "Etre averti lors de la publication d'un nouvel épisode."
        }).appendTo(addUserForm);

        $("<br>").appendTo(addUserForm);

        $("<input>", {
            type: "submit",
            value: "Créer le nouveau profil"
        }).appendTo(addUserForm);

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

                            let helper = $("<p>").html("Ce pseudo est déjà pris.");
                            helper.appendTo(e.target);

                        }

                        if(!emailAvailability){

                            let helper = $("<p>").html("Cet adresse email est déjà prise.");
                            helper.appendTo(e.target);

                        }

                        if(e.target.password.value != e.target.confirmPassword.value){

                            let helper = $("<p>").html("Le mot de passe doit être identique dans les deux champs.");
                            helper.appendTo(e.target);

                        }
                    }
                });
            });

            e.preventDefault();

        });

        addUserForm.appendTo(addUserDiv);

        let cancelButton = $("<button>");
        cancelButton.html("Annuler");
        cancelButton.on("click", function(){

            $(usersHandler.addLocation).html("");

            if(usersHandler.side == "reader"){

                usersHandler.displayWelcomeMessage();

            }
            else if(usersHandler.side == "author"){

                usersHandler.displayAddUserButton();

            }
        });
        addUserDiv.append(cancelButton);

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

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            $("#addUserDiv").remove();

            if(usersHandler.side == "author")
                usersHandler.getUsersList();

            else if(usersHandler.side == "reader"){

                //usersHandler.sendConfirmationEmail(pseudo, password, email);

                let confirmationDiv = $("<div>");

                $("<p>", {
                    html: "Félicitations " + pseudo + ", votre profil a bien été créé."
                }).appendTo(confirmationDiv);
                // $("<p>", {
                //     html: "Un message a été envoyé à votre adresse mail. Merci de confirmer celle-ci en cliquant sur le lien qui s'y trouve."
                // }).appendTo(confirmationDiv);
                $("<p>", {
                    html: "Vous pouvez dès à présent vous connecter."
                }).appendTo(confirmationDiv);

                usersHandler.displayConnectButton();

                $(usersHandler.addLocation).append(confirmationDiv);

            }
        });
    }


    // sendConfirmationEmail(pseudo, password, email){
    //
    //     let query = new FormData();
    //     query.append("action", "sendConfirmationEmail");
    //     query.append("pseudo", pseudo);
    //     query.append("password", password);
    //     query.append("email", email);
    //
    //     ajaxPost("http://localhost/ocp4/index.php", query, function(response){
    //
    //         console.log(response);
    //
    //     });
    //
    // }


    //READ

    getUserFromPseudo(pseudo, callback){

        let query = new FormData();
        query.append("action", "getUserFromPseudo");
        query.append("pseudo", pseudo);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let userData = JSON.parse(response);

            callback(userData);

        });

    }


    //a list of all unckecked (new) or checked (validated) users
    getUsersList(category){

        let query = new FormData();
        query.append("action", "getUsersList");
        query.append("category", category);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

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

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let pseudoAvailability = JSON.parse(response);
            callback(pseudoAvailability);

        });

    }


    isEmailAvailable(email, callback){

        let query = new FormData();
        query.append("action", "isEmailAvailable");
        query.append("email", email);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let emailAvailability = JSON.parse(response);
            callback(emailAvailability);

        });

    }


    //user data in a list element
    displayUser(user, category){

        let userLi = document.createElement("li");
        let contentDiv = document.createElement("div");
        let buttonsDiv = document.createElement("div");

        let getNewsletter = "";
        if(user.getNewsletter == true){

            getNewsletter = " (abonné à la newsletter)";

        } else if(user.getNewsletter == false){

            getNewsletter = " (non abonné à la newsletter)";

        }

        let infoP = document.createElement("p");
        infoP.innerHTML = user.pseudo
            + "<br />Statut : " + user.status
            + "<br />Email : " + user.email + getNewsletter
            + "<br />Date d'inscription : " + converter.datetimeToText(user.registrationDate);
        contentDiv.append(infoP);

        if(category == "newUsers"){

            let validateUserButton = document.createElement("button");
            validateUserButton.innerHTML = "Valider";
            validateUserButton.addEventListener("click", function(e){

                if(confirm("Voulez-vous valider ce profil utilisateur ?")){

                    usersHandler.validateUser(user.id);
                    usersHandler.getUsersList("newUsers");
                    usersHandler.getUsersList("validatedUsers");

                }

            });
            buttonsDiv.append(validateUserButton);

        }

        if(category == "validatedUsers"){

            let updateUserButton = document.createElement("button");
            updateUserButton.innerHTML = "Modifier";
            updateUserButton.addEventListener("click", function(e){

                usersHandler.displayUdapteUserForm(user);

            });
            buttonsDiv.append(updateUserButton);

        }

        let deleteUserButton = document.createElement("button");
        deleteUserButton.innerHTML = "Supprimer";
        deleteUserButton.addEventListener("click", function(e){

            if(confirm("Voulez-vous supprimer ce profil utilisateur ?")){

                usersHandler.deleteUser(user.id);
                usersHandler.getUsersList("newUsers");
                usersHandler.getUsersList("validatedUsers");

            }
        });
        buttonsDiv.append(deleteUserButton);

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

            let welcomeP = document.createElement("p");
            welcomeP.innerHTML = "Bonjour ";

            if(userInSession.pseudo != (undefined || "")){

                usersHandler.getUserFromPseudo(userInSession.pseudo, function(userData){

                    welcomeP.innerHTML = welcomeP.innerHTML + userInSession.pseudo + ", ravi de vous revoir.";
                    $(usersHandler.welcomeLocation).append(welcomeP);

                    usersHandler.displayDisconnectButton();

                    if(userInSession.status == "reader"){

                        let updateUserButton = $("<button>").html("Modifier mon profil");
                        updateUserButton.on("click", function(){

                            usersHandler.displayUdapteUserForm(userData);

                        });
                        $(usersHandler.welcomeLocation).append(updateUserButton);

                    }

                    if(userInSession.status == "writer"){

                        usersHandler.displayDashboardLink();

                    }

                });

            }
            else {

                welcomeP.innerHTML = welcomeP.innerHTML + "cher lecteur, bienvenue.";
                $(usersHandler.welcomeLocation).append(welcomeP);

                usersHandler.displayConnectButton();
                usersHandler.displayAddUserButton();

            }
        });
    }


    displayDisconnectButton(){

        let logoutButton = $("<button>").html("Se déconnecter");

        logoutButton.on("click", function(){

            if(confirm("Etes-vous sûr de vouloir vous déconnecter ?")){

                usersHandler.closeUserSession();

            }
        });

        $(usersHandler.welcomeLocation).append(logoutButton);

    }


    displayDashboardLink(){

        $("<a>").html("Gestion du blog").attr("href", "authorView.php").appendTo(usersHandler.welcomeLocation);

    }


    closeUserSession(){

        let query = new FormData();
        query.append("action", "closeUserSession");

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            usersHandler.displayWelcomeMessage();
            episodesHandler.getLastPublishedEpisode();

        });

    }


    //a button that triggers connectUser form on click
    displayConnectButton(){

        let connectButton = document.createElement("button");
        connectButton.innerHTML = "Se connecter";
        connectButton.addEventListener("click", function(){

            //window.location.pathname = "ocp4/view/loginView.php";
            usersHandler.displayConnectForm();

        });
        $(usersHandler.welcomeLocation).append(connectButton);

    }


    //a form that triggers connectUser function on submit
    displayConnectForm(){

        let connectDiv = $("<div>");

        connectDiv.append($("<h3>").html("Connexion au blog"));

        let connectForm = $("<form>", {
            id: "connectForm"
        });

        $("<label>", {
            for: "pseudo",
            html: "Pseudo : "
        }).appendTo(connectForm);
        let pseudoInput = $("<input>", {
            type: "text",
            name: "pseudo",
            required: true
        });
        pseudoInput.on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        });
        pseudoInput.appendTo(connectForm);

        $("<br>").appendTo(connectForm);

        $("<label>", {
            for: "password",
            html: "Mot de passe : "
        }).appendTo(connectForm);
        let passwordInput = $("<input>", {
            type: "password",
            name: "password",
            required: true
        });
        passwordInput.on("input", function(e){
            e.target.value = converter.deleteHtml(e.target.value);
        });
        passwordInput.appendTo(connectForm);

        $("<br>").appendTo(connectForm);

        $("<input>", {
            type: "submit",
            value: "Se connecter"
        }).appendTo(connectForm);

        connectForm.on("submit", function(e){

            usersHandler.openUserSession(e.target.pseudo.value, e.target.password.value);

            e.preventDefault();
        });

        connectDiv.append(connectForm);

        let cancelButton = $("<button>");
        cancelButton.html("Annuler");
        cancelButton.on("click", function(){

            $(usersHandler.welcomeLocation).html("");
            usersHandler.displayWelcomeMessage();

        });
        connectDiv.append(cancelButton);

        $(usersHandler.welcomeLocation).html("");
        $(usersHandler.welcomeLocation).append(connectDiv);

    }


    openUserSession(pseudo, password){

        var query = new FormData;
        query.append("action", "openUserSession");
        query.append("pseudo", pseudo);
        query.append("password", password);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            //if we got a status, it means the combination pseudo/password is correct
            if((response == "reader") || (response == "writer")){

                usersHandler.displayWelcomeMessage();

                commentsHandler.displayAddCommentButton();

                episodesHandler.getLastPublishedEpisode();

            }
            else{

                alert(response);

            }

        });
    }


    updatePseudoInSession(pseudo){

        var query = new FormData;
        query.append("action", "updatePseudoInSession");
        query.append("pseudo", pseudo);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        });
    }


    getUserInSession(callback){

        let query = new FormData;
        query.append("action", "getUserInSession");

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

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

        $("<h5>").html('Mise à jour du profil de ' + user.pseudo).appendTo(updateUserDiv);

        let updateUserForm = $("<form>", {
            id: "updateUserForm",
            action: "#"
        });

        $("<label>", {
            for: "pseudo",
            html: "Pseudo : "
        }).appendTo(updateUserForm);
        $("<input>", {
            type: "text",
            name: "pseudo",
            value: user.pseudo,
            required: true
        }).appendTo(updateUserForm);

        $("<br>").appendTo(updateUserForm);

        if(usersHandler.side == "author"){

            $("<label>", {
                for: "status",
                html: "Statut : "
            }).appendTo(updateUserForm);
            let statusSelect = $("<select>", {
                name: "status"
            });
            $("<option>", {
                value: "reader",
                html: "lecteur"
            }).appendTo(statusSelect);
            $("<option>", {
                value: "author",
                html: "auteur"
            }).appendTo(statusSelect);
            statusSelect.appendTo(updateUserForm);

            $("<br>").appendTo(updateUserForm);

        }

        $("<label>", {
            for: "email",
            html: "Email : "
        }).appendTo(updateUserForm);
        $("<input>", {
            type: "email",
            name: "email",
            value: user.email,
            required: true
        }).appendTo(updateUserForm);

        $("<br>").appendTo(updateUserForm);

        $("<input>", {
            type: "checkbox",
            name: "newsletter",
            checked: user.getNewsletter
        }).appendTo(updateUserForm);
        $("<label>", {
            for: "newsletter",
            html: "Etre averti lors de la publication d'un nouvel épisode."
        }).appendTo(updateUserForm);

        $("<br>").appendTo(updateUserForm);

        if(usersHandler.side == "reader"){

            $("<label>", {
                for: "newPassword",
                html: "Nouveau mot de passe : "
            }).appendTo(updateUserForm);
            let newPasswordInput = $("<input>", {
                type: "password",
                name: "newPassword",
                placeholder: "Pas de changement"
            });
            newPasswordInput.one("focus", function(e){

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

            });
            newPasswordInput.appendTo(updateUserForm);

        }

        $("<br>").appendTo(updateUserForm);

        $("<input>", {
            type: "submit",
            value: "Envoyer les modifications"
        }).appendTo(updateUserForm);

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

        let cancelButton = $("<button>").html("Annuler");
        cancelButton.on("click", function(){

            $(usersHandler.addLocation).html("");

            if(usersHandler.side == "reader"){

                usersHandler.displayWelcomeMessage();

            }
            else if(usersHandler.side == "author"){

                usersHandler.displayAddUserButton();

            }
        });
        updateUserForm.append(cancelButton);

        updateUserForm.appendTo(updateUserDiv);

        $(usersHandler.addLocation).html("");
        updateUserDiv.appendTo($(usersHandler.addLocation));

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

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

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

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        });
    }


    //DELETE

    deleteUser(id){

        let query = new FormData();
        query.append("action", "deleteUser");
        query.append("id", id);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            usersHandler.getUsersList("#usersList");

        });
    }

}
