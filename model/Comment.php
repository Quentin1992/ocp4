<?php

class Comment{

    //properties

    private $_id;
    private $_author;
    private $_creation_date;
    private $_content;
    private $_is_checked;
    private $_is_reported;
    private $_episode_id;


    public function __construct($author, $content, $episodeId){
        $this->hydrate([
            'author' => $author,
            'content' => $content,
            'episodeId' => $episodeId
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

    public function id(){ return $this->_id; }
    public function author(){ return $this->_author; }
    public function creationDate(){ return $this->_creation_date; }
    public function content(){ return $this->_content; }
    public function isChecked(){ return $this->_is_checked; }
    public function isReported(){ return $this->_is_reported; }
    public function episodeId(){ return $this->_episode_id; }


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

    public function setContent($content){
        if(is_string($content))
            $this->_content = $content;
    }

    public function setIsChecked($isChecked){
        if($isChecked == "true" || $isChecked == "false"){
            $this->_is_checked = $isChecked;
        }
    }

    public function setIsReported($isReported){
        if($isReported == "true" || $isReported == "false"){
            $this->_is_reported = $isReported;
        }
    }

    public function setEpisodeId($episodeId){
        $episodeId = (int) $episodeId;

        if($episodeId > 0)
            $this->_episode_id = $episodeId;
    }

}
