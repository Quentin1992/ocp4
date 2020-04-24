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

        $userData = $this->getUser($pseudo);

        //if pseudo exist in database
        if($userData != false){

            $user = new User($userData['user_id'], $userData['user_pseudo'], $userData['user_status'], $userData['user_password'], $userData['user_email'], $userData['user_registration_date']);

        }
        //if pseudo doesn't exist in database
        else return "Mot de passe ou pseudo incorrect.";

        //if pseudo exist but password doesn't match
        if(!password_verify($password, $user->password())){

            return "Mot de passe ou pseudo incorrect.";

        }
        //if pseudo exist and password matches
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
