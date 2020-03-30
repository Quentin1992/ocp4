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
                    </div>';

            if(isset($_GET['action']) && $_GET['action'] == "report" && $_GET['commentId'] == $comment->id()){

                $this->sendCommentReport($_GET['commentId']);
                echo "Ce commentaire a été signalé. Il sera vérifié par l'auteur.";

            }

            echo '</li>';

        }
        echo '</ol>';

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
                        <a href="authorView.php?action=checkComment&commentId=' . $comment->id() . '">
                            Valider
                        </a>
                        <a href="authorView.php?action=delete&commentId=' . $comment->id() . '">
                            Supprimer
                        </a>
                    </div>';

            if(isset($_GET['action'])){
                if($_GET['action'] == "checkComment" && $_GET['commentId'] == $comment->id()){

                    $this->sendCommentCheck($_GET['commentId']);
                    echo "Ce commentaire a été marqué comme lu et vérifié.";

                }
                if($_GET['action'] == "delete" && $_GET['commentId'] == $comment->id()){

                    $this->deleteComment($_GET['commentId']);
                    echo "Ce commentaire a été supprimé.";

                }

            }

            echo '</li>';
        }
        echo '</ol>';

        if(isset($_GET['action']) && $_GET['action'] == "checkAllComments"){

            $this->sendCheckAllComments();
            echo "Tous les commentaires ont été marqués comme lus et vérifiés.";

        }


    }


    public function addComment($id, $pseudo, $creationDate, $content, $episodeId){

        $comment = new Comment($id, $pseudo, $creationDate, $content, $episodeId);

        $this->sendComment($comment);

    }

}
