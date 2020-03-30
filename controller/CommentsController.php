<?php
require_once('../model/CommentsManager.php');

class CommentsController extends CommentsManager{


    //methods for reader

    public function episodeCommentsList(int $episodeId){

        $comments = $this->getEpisodeCommentsList($episodeId);

        echo '<ol>';
        foreach($comments as $comment){
            echo '<li>
                    <div>'
                        . $comment->author() . ', le ' . $comment->creationDate() .
                    '</div>

                    <p>' . $comment->content() . '</p>

                    <div>
                        <a href="readerView.php?action=report&commentId=' . $comment->id() . '">Signaler</a>
                    </div>
                </li>';

            if(isset($_GET['action']) && $_GET['action'] == "report" && $_GET['commentId'] == $comment->id())
                echo "Ce commentaire a été signalé. Il sera vérifié par l'auteur.";

        }
        echo '</ol>';

        if(isset($_GET['action']) && $_GET['action'] == "report"){

            $this->sendCommentReport($_GET['commentId']);

        }

    }


    //$category : comment_checked or comment_reported
    public function authorCommentsList($category){

        $comments = $this->getAuthorCommentsList($category);
        if(empty($comments))
            echo "Aucun commentaire à afficher.";

        echo '<ol>';
        foreach($comments as $comment){
            echo '<li>
                    <div>'
                        . $comment->author() . ', le ' . $comment->creationDate() .
                    '</div>

                    <p>' . $comment->content() . '</p>

                    <div>
                        <a href="#">Valider</a><a href="#">Supprimer</a>
                    </div>
                </li>';
        }
        echo '</ol>';

    }


    public function addComment($id, $pseudo, $creationDate, $content, $episodeId){

        $comment = new Comment($id, $pseudo, $creationDate, $content, $episodeId);

        $this->sendComment($comment);

    }

}
