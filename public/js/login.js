//USERS
//CREATE USERS

//display "create account" form event
$("#createAccountButton").on("click", function(){

    $("h1").html("Création d'un compte");

    var createAccountForm = $("<form>", {
        id: "createAccountForm"
    });
    $("<input>", {
        type: "text",
        name: "pseudo"
    }).appendTo(createAccountForm);
    $("<input>", {
        type: "password",
        name: "password1"
    }).appendTo(createAccountForm);
    $("<input>", {
        type: "password",
        name: "password2"
    }).appendTo(createAccountForm);
    $("<input>", {
        type: "email",
        name: "email"
    }).appendTo(createAccountForm);
    $("<input>", {
        type: "submit",
        value: "Créer un compte"
    }).appendTo(createAccountForm);

    $("#loginDiv").replaceWith(createAccountForm);

});


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


//READ USERS

//connect user event
$("#loginForm").on("submit", function(e){

    var query = new FormData;
    query.append("action", "connectUser");
    query.append("pseudo", e.target.pseudo.value);
    query.append("password", e.target.password.value);

    ajaxPost("http://localhost/ocp4/index.php", query, function(response){

        if(response == "reader"){

            window.location.pathname = "ocp4/view/readerView.php";

        }
        else if (response == "writer")
            window.location.pathname = "ocp4/view/authorView.php";
        else $("#loginForm p").html(response);

    });

    e.preventDefault();

});
