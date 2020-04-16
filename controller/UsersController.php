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


    public function usersList(){

        return $this->getUsersList();

    }


    //UPDATE

    public function updateUser($id, $pseudo, $status, $password, $email){

        $password = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($id, $pseudo, $status, $password, $email, null);
        $this->sendUserUpdate($user);

    }


    //DELETE

    public function deleteUser($id){

        $this->sendUserDeletion($id);

    }

}
