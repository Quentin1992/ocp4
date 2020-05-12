<?php
class UsersManager extends Database{

    //properties
    private $db;
    public function __construct(){
        $this->db = $this->setDbConnection();
    }

    //methods

    //CREATE

    public function sendNewUser(User $user){
        $sql = 'INSERT INTO users(user_pseudo, user_password, user_email, user_get_newsletter) VALUES(:pseudo, :password, :email, :getNewsletter)';
        $query = $this->db->prepare($sql);
        $query->bindValue(':pseudo', $user->pseudo(), PDO::PARAM_STR);
        $query->bindValue(':password', $user->password(), PDO::PARAM_STR);
        $query->bindValue(':email', $user->email(), PDO::PARAM_STR);
        $query->bindValue(':getNewsletter', $user->getNewsletter(), PDO::PARAM_BOOL);
        $query->execute();
    }

    //READ
    public function goGetUserFromPseudo($pseudo){
        $sql = 'SELECT * FROM users WHERE user_pseudo = "' . $pseudo . '"';
        $query = $this->db->query($sql);
        $data = $query->fetch(PDO::FETCH_ASSOC);
        $user = new User($data['user_id'], $data['user_pseudo'], $data['user_status'], null, $data['user_email'], $data['user_registration_date'], $data['user_is_checked'], $data['user_get_newsletter']);
        return $user;
    }

    public function checkPseudoAvailability($pseudo){
        $sql = 'SELECT user_pseudo FROM users WHERE user_pseudo = "' . $pseudo . '"';
        $query = $this->db->query($sql);
        $data = $query->fetch(PDO::FETCH_ASSOC);
        return $data['user_pseudo'];
    }

    public function checkEmailAvailability($email){
        $sql = 'SELECT * FROM users WHERE user_email = "' . $email . '"';
        $query = $this->db->query($sql);
        $data = $query->fetch(PDO::FETCH_ASSOC);
        return $data['user_email'];
    }

    public function getUsersList($category){
        $users = [];
        $sql = 'SELECT * FROM users';
        if($category == "newUsers"){
            $sql = $sql . " WHERE user_is_checked = 0";
        }
        else if($category == "validatedUsers"){
            $sql = $sql . " WHERE user_is_checked = 1";
        }
        $query = $this->db->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $users[] = new User($data['user_id'], $data['user_pseudo'], $data['user_status'], $data['user_password'], $data['user_email'], $data['user_registration_date'], $data['user_is_checked'], $data['user_get_newsletter']);
        }
        return $users;
    }

    public function getUser($pseudo){
        $sql = 'SELECT * FROM users WHERE user_pseudo = "' . $pseudo . '"';
        $query = $this->db->query($sql);
        $data = $query->fetch(PDO::FETCH_ASSOC);
        return $data;
    }

    //UPDATE
    public function sendUserUpdate($user){
        $sql = 'UPDATE users SET user_pseudo = :pseudo, ';
        if($user->status() != null){
            $sql = $sql . 'user_status = :status, ';
        }
        if($user->password() != ""){
            $sql = $sql . 'user_password = :password, ';
        }
        $sql = $sql . 'user_email = :email, user_get_newsletter = :getNewsletter WHERE user_id = :id';
        $query = $this->db->prepare($sql);
        $query->bindValue(':pseudo', $user->pseudo(), PDO::PARAM_STR);
        if($user->status() != null){
            $query->bindValue(':status', $user->status(), PDO::PARAM_STR);
        }
        if($user->password() != ("")){
            $query->bindValue(':password', $user->password(), PDO::PARAM_STR);
        }
        $query->bindValue(':email', $user->email(), PDO::PARAM_STR);
        $query->bindValue(':getNewsletter', $user->getNewsletter(), PDO::PARAM_BOOL);
        $query->bindValue(':id', $user->id(), PDO::PARAM_INT);
        $query->execute();
    }

    public function sendUserValidation($user){
        $sql = 'UPDATE users SET user_is_checked = :isChecked WHERE user_id = :id';
        $query = $this->db->prepare($sql);
        $query->bindValue(':isChecked', 1, PDO::PARAM_INT);
        $query->bindValue(':id', $user->id(), PDO::PARAM_INT);
        $query->execute();
    }

    //DELETE
    public function sendUserDeletion($id){
        $sql = 'DELETE FROM users WHERE user_id = ' . $id;
        $query = $this->db->exec($sql);
    }
}
