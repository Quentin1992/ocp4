<?php
class Comment{

    //properties
    private $id;
    private $author;
    private $creationDate;
    private $content;
    private $isChecked;
    private $isReported;
    private $episodeId;

    //methods

    public function __construct($id, $author, $creationDate, $content, $episodeId){
        $this->hydrate([
            'id' => $id,
            'author' => $author,
            'creationDate' => $creationDate,
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
    public function id(){ return $this->id; }
    public function author(){ return $this->author; }
    public function creationDate(){ return $this->creationDate; }
    public function content(){ return $this->content; }
    public function isChecked(){ return $this->isChecked; }
    public function isReported(){ return $this->isReported; }
    public function episodeId(){ return $this->episodeId; }

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

    public function setCreationDate($creationDate){
            $this->creationDate = $creationDate;
    }

    public function setContent($content){
        if(is_string($content))
            $this->content = $content;
    }

    public function setIsChecked($isChecked){
        if($isChecked == "true" || $isChecked == "false"){
            $this->isChecked = $isChecked;
        }
    }

    public function setIsReported($isReported){
        if($isReported == "true" || $isReported == "false"){
            $this->isReported = $isReported;
        }
    }

    public function setEpisodeId($episodeId){
        $episodeId = (int) $episodeId;
        if($episodeId > 0)
            $this->episodeId = $episodeId;
    }
}
