<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
$path = $root . '/ocp4/model/UsersManager.php';

require_once($path);

class UsersController extends UsersManager{

    //methods

    //CREATE

    public function addUser($id, $pseudo, $status, $password, $email, $registrationDate, $isChecked, $getNewsletter){

        $password = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($id, $pseudo, $status, $password, $email, $registrationDate, null, $getNewsletter);
        $this->sendNewUser($user);

    }


    //READ

    public function isPseudoAvailable($pseudo){

        if($this->checkPseudoAvailability($pseudo) == null)
            $pseudoAvailability = true;
        else $pseudoAvailability = false;

        return $pseudoAvailability;

    }


    public function isEmailAvailable($email){

        if($this->checkEmailAvailability($email) == null)
            $emailAvailability = true;
        else $emailAvailability = false;

        return $emailAvailability;

    }


    public function connectUser($pseudo, $password){

        $userData = $this->getUser($pseudo);

        //if pseudo exist in database
        if($userData != false){

            $user = new User($userData['user_id'], $userData['user_pseudo'], $userData['user_status'], $userData['user_password'], $userData['user_email'], $userData['user_registration_date'], $userData['user_is_checked'], $userData['user_get_newsletter']);

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


    public function usersList($category){

        return $this->getUsersList($category);

    }


    //UPDATE

    public function updateUser($id, $pseudo, $status, $email, $getNewsletter){
var_dump($getNewsletter);
        //$password = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($id, $pseudo, $status, null, $email, null, null, $getNewsletter);
        $this->sendUserUpdate($user);

    }


    public function validateUser($id){

        $user = new User($id, null, null, null, null, null, null, null);
        $this->sendUserValidation($user);

    }


    //DELETE

    public function deleteUser($id){

        $this->sendUserDeletion($id);

    }

}
