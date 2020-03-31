<?php
require_once('../model/EpisodesManager.php');

class EpisodesController extends EpisodesManager{


    //methods for reader

    public function upcomingEpisode(){

        return $this->getUpcomingEpisode();

    }


    public function publishedList(){

        return $this->getPublishedList();

    }


    public function fullLastEpisode(){

        return $this->getFullLastEpisode();

    }


    public function lastEpisodeId(){

        $fullLastEpisode = $this->getFullLastEpisode();

        return $fullLastEpisode->id();

    }


    //methods for author


    public function upcomingEpisodes(){

        return $this->getUpcomingEpisodes();

    }

}
