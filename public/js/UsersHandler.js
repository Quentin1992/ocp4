class UsersHandler {

    //CREATE

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
