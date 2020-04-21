let usersHandler = new UsersHandler("reader", "#welcomeMessage", "#loginDiv");

usersHandler.displayConnectForm();


//"create account" event
$(document).on("submit", "#createAccountForm", function(e){

    //check if password1 = password 2 -> let password
    if(e.target.password1.value == e.target.password2.value){

        var password = e.target.password1.value;

        var query = new FormData();
        query.append("action", "addUser");
        query.append("pseudo", e.target.pseudo.value);
        query.append("password", password);
        query.append("email", e.target.email.value);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            //si ok : confirmation
            console.log(response);
            //sinon : dire pourquoi

        });
    } else $("<p>").html("La confirmation du mot de passe est incorrecte.").appendTo($("#createAccountForm"));

    e.preventDefault();

});
