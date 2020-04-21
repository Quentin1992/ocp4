class UsersHandler {

    constructor(side, welcomeLocation, loginLocation, listLocation) {
        this.side = side;
        //user informations :
        this.pseudo;
        this.status;
        //display locations :
        this.welcomeLocation = welcomeLocation;
        this.loginLocation = loginLocation;
    }

    //CREATE

    displayAddUserButton(){

        let addUserButton = document.createElement("button");
        addUserButton.innerHTML = "Créer un nouveau profil";
        addUserButton.id = "addUserButton";

        addUserButton.addEventListener("click", function(){

            usersHandler.displayAddUserForm();

        });

        $(usersHandler.welcomeLocation).append(addUserButton);
    }


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
        $("<input>", {
            type: "text",
            name: "pseudo"
        }).appendTo(addUserForm);

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

        }

        $("<label>", {
            for: "password",
            html: "Mot de passe : "
        }).appendTo(addUserForm);
        $("<input>", {
            type: "password",
            name: "password"
        }).appendTo(addUserForm);

        $("<label>", {
            for: "email",
            html: "Email : "
        }).appendTo(addUserForm);
        $("<input>", {
            type: "email",
            name: "email"
        }).appendTo(addUserForm);

        $("<input>", {
            type: "checkbox",
            name: "newsletter",
            value: "true"
        }).appendTo(addUserForm);
        $("<label>", {
            for: "newsletter",
            html: "Etre averti lors de la publication d'un nouvel épisode."
        }).appendTo(addUserForm);

        $("<input>", {
            type: "submit",
            value: "Créer le nouveau profil"
        }).appendTo(addUserForm);

        addUserForm.on("submit", function(e){

            let action = confirm("Voulez-vous créer ce profil utilisateur ?");
            if(action){

                usersHandler.addUser(e.target.pseudo.value, null, e.target.password.value, e.target.email.value);

                if(usersHandler.side == "reader"){

                    //send email with link to confirm
                    //confirmation on the same page with ask for click on the email link
                    //link to the next page

                }

            }

            e.preventDefault();

        });

        addUserForm.appendTo(addUserDiv);

        let cancelButton = $("<button>");
        cancelButton.html("Annuler");
        cancelButton.on("click", function(){

            $(usersHandler.welcomeLocation).html("");
            usersHandler.displayWelcomeMessage();

        });
        addUserDiv.append(cancelButton);

        $(usersHandler.welcomeLocation).html("");
        $(usersHandler.welcomeLocation).append(addUserDiv);

    }


    addUser(pseudo, status, password, email){

        let query = new FormData();
        query.append("action", "addUser");
        query.append("pseudo", pseudo);
        query.append("status", status);
        query.append("password", password);
        query.append("email", email);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            $("#addUserDiv").remove();

            if(usersHandler.side == "author")
                usersHandler.getUsersList();

            else if(usersHandler.side == "reader"){

                let confirmationDiv = $("<div>");
                $("<p>", {
                    html: "Le profil de " + pseudo + " a bien été créé."
                }).appendTo(confirmationDiv);
                $("<a>", {
                    html: "Retourner sur le blog.",
                    href: "http://localhost/ocp4/.php"
                }).appendTo(confirmationDiv);

            }

        });

    }


    //READ

    getUsersList(where){

        let query = new FormData();
        query.append("action", "getUsersList");

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let users = JSON.parse(response);

            $("#usersList").html("");

            users.forEach(function(user){
                usersHandler.displayUser(user, where);
            });
        });
    }


    displayUser(user, where){

        let li = document.createElement("li");

        let p = document.createElement("p");
        p.innerHTML = user.pseudo
            + "<br />Statut : " + user.status
            + "<br />Email : " + user.email
            + "<br />Date d'inscription : " + user.registrationDate;
        li.append(p);

        let updateUserButton = document.createElement("button");
        updateUserButton.class = "updateUserButton";
        updateUserButton.setAttribute("data-user-id", user.id);
        updateUserButton.innerHTML = "Modifier";
        updateUserButton.addEventListener("click", function(e){
            usersHandler.displayUdapteUserForm(e.target.parentElement, user);
        });
        li.append(updateUserButton);

        let deleteUserButton = document.createElement("button");
        deleteUserButton.class = "deleteUserButton";
        deleteUserButton.setAttribute("data-user-id", user.id);
        deleteUserButton.innerHTML = "Supprimer";
        deleteUserButton.addEventListener("click", function(e){

            let action = confirm("Voulez-vous supprimer ce profil utilisateur ?");
            if(action)
                usersHandler.deleteUser(user.id);
        });
        li.append(deleteUserButton);

        $(where).append(li);

    }


    displayWelcomeMessage(){

        //$(usersHandler.welcomeLocation).html("");

        let welcomeP = document.createElement("p");
        welcomeP.innerHTML = "Bonjour ";

        if(usersHandler.pseudo != undefined){

            welcomeP.innerHTML = welcomeP.innerHTML + usersHandler.pseudo + ", ravis de vous revoir.";
            $(usersHandler.welcomeLocation).append(welcomeP);
            //display logout button

        }
        else {

            welcomeP.innerHTML = welcomeP.innerHTML + "cher lecteur, bienvenue.";
            $(usersHandler.welcomeLocation).append(welcomeP);

        }

        usersHandler.displayConnectButton();
        usersHandler.displayAddUserButton();

    }


    displayConnectButton(){

        let connectButton = document.createElement("button");
        connectButton.innerHTML = "Se connecter";
        connectButton.addEventListener("click", function(){

            //window.location.pathname = "ocp4/view/loginView.php";
            usersHandler.displayConnectForm();

        });
        $(usersHandler.welcomeLocation).append(connectButton);

    }


    displayConnectForm(){

        let connectDiv = $("<div>");

        connectDiv.append($("<h4>").html("Connexion au blog"));

        let connectForm = $("<form>", {
            id: "connectForm"
        });

        $("<label>", {
            for: "pseudo",
            html: "Pseudo : "
        }).appendTo(connectForm);
        $("<input>", {
            type: "text",
            name: "pseudo"
        }).appendTo(connectForm);

        $("<label>", {
            for: "password",
            html: "Mot de passe : "
        }).appendTo(connectForm);
        $("<input>", {
            type: "password",
            name: "password"
        }).appendTo(connectForm);
        $("<input>", {
            type: "submit",
            value: "Se connecter"
        }).appendTo(connectForm);

        connectForm.on("submit", function(e){

            usersHandler.connectUser(e.target.pseudo.value, e.target.password.value);

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


    connectUser(pseudo, password){

        var query = new FormData;
        query.append("action", "connectUser");
        query.append("pseudo", pseudo);
        query.append("password", password);

        ajaxPost("http://localhost/ocp4/index.php", query, function(status){

            if(status == "reader"){

                window.location.pathname = "ocp4/view/readerView.php";

            }
            else if (response == "writer")
                window.location.pathname = "ocp4/view/authorView.php";
            else $("#loginForm p").html(status);

        });

        e.preventDefault();

    }


    //UDPATE

    displayUdapteUserForm(liElement, user){

        $(".updateUserDiv").remove();

        var updateUserDiv = $("<div>", {
            class: "updateUserDiv"
        });

        $("<h3>").html("Mise à jour du profil utilisateur.").appendTo(updateUserDiv);

        let updateUserForm = $("<form>", {
            id: "updateUserForm",
            method: "post",
            action: "#"
        });

        $("<input>", {
            type: "text",
            name: "pseudo",
            value: user.pseudo
        }).appendTo(updateUserForm);
        $("<input>", {
            type: "text",
            name: "status",
            value: user.status
        }).appendTo(updateUserForm);
        $("<input>", {
            type: "password",
            name: "password",
            value: user.password
        }).appendTo(updateUserForm);
        $("<input>", {
            type: "email",
            name: "email",
            value: user.email
        }).appendTo(updateUserForm);
        $("<input>", {
            type: "submit",
            value: "Envoyer les modifications"
        }).appendTo(updateUserForm);

        updateUserForm.on("submit", function(e){

            let action = confirm("Voulez-vous mettre à jour le profil utilisateur ?");
            if(action)
                usersHandler.updateUser(user.id, e.target.pseudo.value, e.target.status.value, e.target.password.value, e.target.email.value);
            else e.target.parentElement.remove();

            e.preventDefault();

        });

        updateUserForm.appendTo(updateUserDiv);

        updateUserDiv.appendTo(liElement);

    }


    updateUser($id, $pseudo, $status, $password, $email){

        let query = new FormData();
        query.append("action", "updateUser");
        query.append("id", $id);
        query.append("pseudo", $pseudo);
        query.append("status", $status);
        query.append("password", $password);
        query.append("email", $email);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            usersHandler.getUsersList("#usersList");

        });
    }


    //DELETE

    deleteUser($id){

        let query = new FormData();
        query.append("action", "deleteUser");
        query.append("id", $id);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            usersHandler.getUsersList("#usersList");

        });
    }

}
