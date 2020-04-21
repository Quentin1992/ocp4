<?php
require_once('Database.php');
require_once('User.php');

class UsersManager extends Database{


    //properties

    private $db;

    public function __construct(){

        $this->db = $this->setDbConnection();

    }


    //methods

    //CREATE

    public function sendNewUser(User $user){

        $sql = 'INSERT INTO users(user_pseudo, user_password, user_email) VALUES(:pseudo, :password, :email)';
        $query = $this->db->prepare($sql);

        $query->bindValue(':pseudo', $user->pseudo(), PDO::PARAM_STR);
        $query->bindValue(':password', $user->password(), PDO::PARAM_STR);
        $query->bindValue(':email', $user->email(), PDO::PARAM_STR);
        $query->execute();

    }


    //READ

    public function getUsersList(){

        $users = [];

        $sql = 'SELECT * FROM users';

        $query = $this->db->query($sql);

        while($data = $query->fetch(PDO::FETCH_ASSOC)){

            $users[] = new User($data['user_id'], $data['user_pseudo'], $data['user_status'], $data['user_password'], $data['user_email'], $data['user_registration_date']);

        }

        return $users;

    }


    public function getUser($pseudo){

        $sql = 'SELECT * FROM users WHERE user_pseudo = "' . $pseudo . '"';
        $query = $this->db->query($sql);

        $data = $query->fetch(PDO::FETCH_ASSOC);

        $user = new User($data['user_id'], $data['user_pseudo'], $data['user_status'], $data['user_password'], $data['user_email'], $data['user_registration_date']);

        return $user;

    }


    //UPDATE

    public function sendUserUpdate($user){

        $sql = 'UPDATE users SET user_pseudo = :pseudo, user_status = :status, user_password = :password, user_email = :email WHERE user_id = :id';
        $query = $this->db->prepare($sql);

        $query->bindValue(':pseudo', $user->pseudo(), PDO::PARAM_STR);
        $query->bindValue(':status', $user->status(), PDO::PARAM_STR);
        $query->bindValue(':password', $user->password(), PDO::PARAM_STR);
        $query->bindValue(':email', $user->email(), PDO::PARAM_STR);
        $query->bindValue(':id', $user->id(), PDO::PARAM_INT);

        $query->execute();

    }


    //DELETE

    public function sendUserDeletion($id){

        $sql = 'DELETE FROM users WHERE user_id = ' . $id;
        $query = $this->db->exec($sql);

    }

}
