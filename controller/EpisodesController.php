<?php
require_once('../model/EpisodesManager.php');

class EpisodesController extends EpisodesManager{


    //methods for reader

    public function upcomingEpisode(){

        $upcomingEpisode = $this->getUpcomingEpisode();

        if(!empty($upcomingEpisode)){

            echo 'Prochain épisode : <span>' . $upcomingEpisode->title() .  '</span>, le ' . $upcomingEpisode->publicationDate() . '.';

        }
        else echo 'Le prochain épisode arrive bientôt !';

    }


    public function publishedList(){

        $publishedEpisodes = $this->getPublishedList();

        echo '<ol>';
        foreach($publishedEpisodes as $publishedEpisode){
            echo '<li><a>' . $publishedEpisode->id() . ' : ' . $publishedEpisode->title() . '</a></li>';
        }
        echo '</ol>';

    }


    public function fullLastEpisode(){

        $fullLastEpisode = $this->getFullLastEpisode();

        echo '<h3>' . $fullLastEpisode->id() . ' - ' . $fullLastEpisode->title() . '</h3>';

        echo '<p>' . $fullLastEpisode->content() . '</p>';

    }


    public function lastEpisodeId(){

        $fullLastEpisode = $this->getFullLastEpisode();

        return $fullLastEpisode->id();

    }


    //methods for author


    public function upcomingEpisodes(){


        $upcomingEpisodes = $this->getUpcomingEpisodes();
        if(empty($upcomingEpisodes))
            echo "Aucun épisode en attente.";

        echo '<ol>';
        foreach($upcomingEpisodes as $upcomingEpisode){
            echo '<li><a>' . $upcomingEpisode->id() . ' : ' . $upcomingEpisode->title() . '</a></li>';
        }
        echo '</ol>';

    }

}
