<?php

class Episode{

    //properties

    private $_id;
    private $_author;
    private $_publication_date;
    private $_title;
    private $_content;


    public function hydrate(array $donnees){

        foreach ($donnees as $key => $value){

            $method = 'set' . ucfirst($key);

            if (method_exists($this, $method)){
                $this->$method($value);
            }
        }
    }


    //getters

    public function id(){ return this->_id; }
    public function author(){ return this->_author; }
    public function publicationDate(){ return this->_publication_date; }
    public function title(){ return this->_title; }
    public function content(){ return this->_content; }


    //setters

    public function setId($id){
        $id = (int) $id;

        if($id > 0)
            $this->_id = $id;
    }

    public function setAuthor($author){
        if(is_string($author))
            $this->_author = $author;
    }

    public function setPublicationDate($publicationDate){
        //vérifier le type
        $this->_publication_date = $publicationDate;
    }

    public function setTitle($title){
        if(is_string($author))
            $this->_title = $title;
    }

    public function setContent($content){
        if(is_string($content))
            $this->_content = $content;
    }

}
