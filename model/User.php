<?php

class User{

    //properties

    private $id;
    private $name;
    private $status;


    public function __construct($id, $name, $status){
        $this->hydrate([
            'id' => $id,
            'name' => $name,
            'status' => $status
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
    public function name(){ return $this->name; }
    public function status(){ return $this->status; }


    //setters

    public function setId($id){
        $id = (int) $id;

        if($id > 0)
            $this->id = $id;
    }

    public function setName($name){
        if(is_string($name))
            $this->name = $name;
    }

    public function setName($status){
        if(is_string($status))
            $this->status = $status;
    }

}
