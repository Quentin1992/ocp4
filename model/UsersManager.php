<?php
require_once('Database.php');
require_once('User.php');

class UsersManager extends Database{


    //properties

    private $db;

    public function __construct(){

        $this->db = $this->setDbConnection();

    }


    public function sendNewUser($id, $name, $status, $hashedPassword){

        //requête insert dans users

    }


    public function goCheckIdentity($name, $hashedPassword){

        //requête select dans users

    }

}
