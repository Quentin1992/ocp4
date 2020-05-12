<?php
class Database{

  //properties
  private $host = "qbogfrldogqbog.mysql.db";
  private $dbname = "qbogfrldogqbog";
  private $user = "qbogfrldogqbog";
  private $pass = "Kant1BKant1B";

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
