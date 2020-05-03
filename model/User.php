<?php

class User{

    //properties

    private $id;
    private $pseudo;
    private $status;
    private $password;
    private $email;
    private $registrationDate;
    private $isChecked;
    private $getNewsletter;


    public function __construct($id, $pseudo, $status, $password, $email, $registrationDate, $isChecked, $getNewsletter){
        $this->hydrate([
            'id' => $id,
            'pseudo' => $pseudo,
            'status' => $status,
            'password' => $password,
            'email' => $email,
            'registrationDate' => $registrationDate,
            'isChecked' => $isChecked,
            'getNewsletter' => $getNewsletter

        ]);
    }


    public function hydrate(array $donnees){

        foreach ($donnees as $key => $value){

            $method = 'set' . ucfirst($key);

            if (method_exists($this, $method)){
                $this->$method($value);
            }
        }
    }


    //getters

    public function id(){ return $this->id; }
    public function pseudo(){ return $this->pseudo; }
    public function status(){ return $this->status; }
    public function password(){ return $this->password; }
    public function email(){ return $this->email; }
    public function registrationDate(){ return $this->registrationDate; }
    public function isChecked(){ return $this->isChecked; }
    public function getNewsletter(){ return filter_var($this->getNewsletter, FILTER_VALIDATE_BOOLEAN); }


    //setters

    public function setId($id){
        $id = (int) $id;
        if($id > 0)
            $this->id = $id;
    }

    public function setPseudo($pseudo){
        if(is_string($pseudo))
            $this->pseudo = $pseudo;
    }

    public function setStatus($status){
        if(is_string($status))
            $this->status = $status;
    }

    public function setPassword($password){
        if(is_string($password))
            $this->password = $password;
    }

    public function setEmail($email){
        if(is_string($email))
            $this->email = $email;
    }

    public function setRegistrationDate($registrationDate){
        if(is_string($registrationDate))
            $this->registrationDate = $registrationDate;
    }

    public function setIsChecked($isChecked){
        if($isChecked == (true || false))
            $this->isChecked = $isChecked;
    }

    public function setGetNewsletter($getNewsletter){
        if($getNewsletter == (true || false))
            $this->getNewsletter = $getNewsletter;
    }

}
