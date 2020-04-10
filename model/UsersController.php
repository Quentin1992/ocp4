<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
$path = $root . '/ocp4/model/CommentsManager.php';

require_once($path);

class CommentsController extends CommentsManager{


    public function addUser($id, $name, $status, $password){

        //hash $password puis $this->sendNewUser()

    }


    public function checkIdentity($name, $password){

        //hash $password puis $this->goCheckIdentity()

    }
