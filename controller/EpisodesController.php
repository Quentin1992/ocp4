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


    public function lastEpisodeNumber(){

        $fullLastEpisode = $this->getFullLastEpisode();

        return $fullLastEpisode->number();

    }


    //methods for author


    public function upcomingEpisodes(){

        return $this->getUpcomingEpisodes();

    }

}
