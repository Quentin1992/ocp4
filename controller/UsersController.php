<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
$path = $root . '/ocp4/model/UsersManager.php';

require_once($path);

class UsersController extends UsersManager{

    //methods

    //CREATE

    public function addUser($id, $pseudo, $status, $password, $email, $registrationDate){

        $password = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($id, $pseudo, $status, $password, $email, $registrationDate);
        $this->sendNewUser($user);

    }


    //READ

    public function connectUser($pseudo, $password){

        $user = $this->getUser($pseudo);

        if(!password_verify($password, $user->password())){

            return "Cette association mot de passe et utilisateur est incorrecte.";

        }
        else{

            return $user->status();

        }

    }

}
