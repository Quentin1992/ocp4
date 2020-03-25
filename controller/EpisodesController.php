<?php
require_once('../model/EpisodesManager.php');

class PostsController extends PostsManager{


  //methods for reader

  public function upcomingEpisode(){

    if(isset($episode)){

      echo 'Prochain épisode <span>' . $episode['episode_title'] .  '</span> le ' . $episode['episode_date'] . '.';

    }
    else echo 'Le prochain épisode arrive bientôt !';

  }


  public function publishedList(){

    $episodes = $this->getPublishedList();

    echo '<ol>';
    foreach($episodes as $episode){
      echo '<li><a>' . $episode['episode_id'] . ' : ' . $episode['episode_title'] . '</a></li>';
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


  public function readEpiodeView(){



  }


  public function editEpisodeView(){



  }




}
