<?php
require_once('../model/CommentsManager.php');

class CommentsController extends CommentsManager{


    //methods for reader

    public function episodeCommentsList(int $episodeId){

        $commentsList = $this->getEpisodeCommentsList(int $episodeId);

        echo '<ol>';
        foreach($commentsList as $comment){
            echo '<li>
                    <div>'
                        . $comment->author() . ' le ' . $comment->creationDate() .
                    '</div>

                    <p>' . $comment->content() . '</p>

                    <div>
                        <a href="#">Signaler</a>
                    </div>
                </li>';
        }
        echo '</ol>';

    }


    //$category : comment_checked or comment_reported
    public function authorCommentsList($category){

        $comments = $this->getCommentsList($category);

        echo '<ol>';
        foreach($comments as $comment){
            echo '<li>
                    <div>'
                        . $comment->author() . ' le ' . $comment->creationDate() .
                    '</div>

                    <p>' . SUBSTRING($comment->content(), 1, 100) . '</p>

                    <div>
                        <a href="#">Valider</a><a href="#">Supprimer</a>
                    </div>
                </li>';
        }
        echo '</ol>';

    }






    public function upcomingEpisode(){

        if(isset($episode)){

            echo 'Prochain épisode <span>' . $episode['episode_title'] .  '</span> le ' . $episode['episode_date'] . '.';

        }
        else echo 'Le prochain épisode arrive bientôt !';

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
