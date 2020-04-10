<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
$path = $root . '/ocp4/model/EpisodesManager.php';

require_once($path);

class EpisodesController extends EpisodesManager{


    //CREATE

    public function addEpisode($id, $number, $author, $publicationDate, $title, $content){

        $episode = new Episode($id, $number, $author, $publicationDate, $title, $content);

        $this->sendNewEpisode($episode);

    }


    //READ

    public function episode($episodeNumber){

        return $this->getEpisode($episodeNumber);

    }


    public function upcomingEpisode(){

        return $this->getUpcomingEpisode();

    }


    public function publishedList(){

        return $this->getPublishedList();

    }


    public function fullLastEpisode(){

        return $this->getFullLastEpisode();

    }


    public function lastEpisodeNumber(){

        $fullLastEpisode = $this->getFullLastEpisode();

        return $fullLastEpisode->number();

    }


    public function upcomingEpisodes(){

        return $this->getUpcomingEpisodes();

    }


    //UPDATE

    public function updateEpisode($id, $number, $author, $publicationDate, $title, $content){

        $episode = new Episode($id, $number, $author, $publicationDate, $title, $content);

        $this->sendUpdateEpisode($episode);

    }


    //DELETE

    public function deleteEpisode($episodeId){

        $this->sendDeleteEpisode($episodeId);

    }

}
