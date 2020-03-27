<?php
require_once('../model/CommentsManager.php');

class CommentsController extends CommentsManager{


    //methods for reader

    public function episodeCommentsList(int $episodeId){

        $commentsList = $this->getEpisodeCommentsList($episodeId);

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

        $comments = $this->getAuthorCommentsList($category);

        echo '<ol>';
        foreach($comments as $comment){
            echo '<li>
                    <div>'
                        . $comment->author() . ' le ' . $comment->creationDate() .
                    '</div>

                    <p>' . $comment->content() . '</p>

                    <div>
                        <a href="#">Valider</a><a href="#">Supprimer</a>
                    </div>
                </li>';
        }
        echo '</ol>';

    }

}
