<?php

class Database{

  //properties

  private $host = "localhost";
  private $dbname = "minichat";
  private $user = "root";
  private $pass = "";


    //method

    protected function setDbConnection(){

      $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname . ';charset=utf8';

      try{
	       $db = new PDO($dsn, $this->user, $this->pass);
      }
      catch(Exception $e){
          die('Erreur : '.$e->getMessage());
      }

      // $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

      return $db;

    }

}
