<?php

class Episode{

    //properties

    private $id;
    private $author;
    private $publicationDate;
    private $title;
    private $content;


    public function __construct($id, $author, $publicationDate, $title, $content){
        $this->hydrate([
            'id' => $id,
            'author' => $author,
            'publicationDate' => $publicationDate,
            'title' => $title,
            'content' => $content
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
    public function author(){ return $this->author; }
    public function publicationDate(){ return $this->publicationDate; }
    public function title(){ return $this->title; }
    public function content(){ return $this->content; }


    //setters

    public function setId($id){
        $id = (int) $id;

        if($id > 0)
            $this->id = $id;
    }

    public function setAuthor($author){
        if(is_string($author))
            $this->author = $author;
    }

    public function setPublicationDate($publicationDate){
        //vérifier le type
        $this->publicationDate = $publicationDate;
    }

    public function setTitle($title){
        if(is_string($title))
            $this->title = $title;
    }

    public function setContent($content){
        if(is_string($content))
            $this->content = $content;
    }

}
