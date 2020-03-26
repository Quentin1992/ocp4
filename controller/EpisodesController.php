<?php
require_once('../model/EpisodesManager.php');

class EpisodesController extends EpisodesManager{


    //methods for reader

    public function upcomingEpisode(){

        $upcomingEpisode = $this->getUpcomingEpisode();

        if($upcomingEpisode != null){

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


    public function fullLastEpisode(Episode $episode){

        echo '<h3>' . $episode['episode_id'] . ' - ' . $episode['episode_title'] . '</h3>';

        echo '<p>' . $episode['episode_content'] . '</p>';

    }


    //methods for author


    public function upcomingEpisodes(){

        $episodes = $this->getUpcomingList();

        echo '<ol>';
        foreach($episodes as $episode){
            echo '<li><a>' . $episode['episode_id'] . ' : ' . $episode['episode_title'] . '</a></li>';
        }
        echo '</ol>';

    }

}
