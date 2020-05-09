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

    // public function sendConfirmationEmail(){    //
    //     $message = 'Bonjour ' . $_POST['pseudo'] . ', meric d\'avoir créé un compte sur le blog de "Billet simple pour l\'Alaska".\r\n
    //                 Pour rappel, votre mot de passe est ' . $_POST['password'] . '.\r\n
    //                 Bienvenue dans l\'aventure !';
    //     // In case any of our lines are larger than 70 characters, we should use wordwrap()
    //     $message = wordwrap($message, 70, "\r\n");
    //     // Send
    //     mail($_POST['email'], 'En route pour l\'Alaska', $message);
    // }

    //READ

    public function getUserFromPseudo($pseudo){
        $user = $this->goGetUserFromPseudo($pseudo);
        $userData = array(
            'id' => $user->id(),
            'pseudo' => $user->pseudo(),
            'status' => $user->status(),
            'email' => $user->email(),
            'registrationDate' => $user->registrationDate(),
            'isChecked' => $user->isChecked(),
            'getNewsletter' => $user->getNewsletter()
        );
        return json_encode($userData);
    }

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

    public function usersList($category){
        $users = $this->getUsersList($category);
        $usersData = [];
        foreach ($users as $key => $user) {
            $usersData[] = array(
                'id' => $user->id(),
                'pseudo' => $user->pseudo(),
                'status' => $user->status(),
                'password' => $user->password(),
                'email' => $user->email(),
                'registrationDate' => $user->registrationDate(),
                'isChecked' => $user->isChecked(),
                'getNewsletter' => $user->getNewsletter()
            );
        }
        return json_encode($usersData);
    }

    public function openUserSession($pseudo, $password){
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
            $status = $user->status();
            $_SESSION['pseudo'] = $_POST['pseudo'];
            $_SESSION['status'] = $status;
            return $status;
        }
    }

    public function userInSession(){
        if(isset($_SESSION['pseudo']) && isset($_SESSION['status'])){
            $pseudo = $_SESSION['pseudo'];
            $status = $_SESSION['status'];
        }
        else {
            $pseudo = "";
            $status = "";
        }
        $sessionUser = array(
            'pseudo' => $pseudo,
            'status' => $status
        );
        return json_encode($sessionUser);
    }

    public function closeUserSession(){
        session_unset();
    }

    //UPDATE

    public function updateUser($id, $pseudo, $status, $password, $email, $getNewsletter){
        if($password != ""){
            $password = password_hash($password, PASSWORD_DEFAULT);
        }
        $user = new User($id, $pseudo, $status, $password, $email, null, null, $getNewsletter);
        $this->sendUserUpdate($user);
    }

    public function updatePseudoInSession($pseudo){
        $_SESSION['pseudo'] = $pseudo;
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
