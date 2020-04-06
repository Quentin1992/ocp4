<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
$path = $root . '/ocp4/model/CommentsManager.php';

require_once($path);

class CommentsController extends CommentsManager{


    //methods for reader

    public function episodeCommentsList(int $episodeId, $numberOfComments){

        return $this->getEpisodeCommentsList($episodeId, $numberOfComments);

    }


    //$category : comment_checked or comment_reported
    public function authorCommentsList($category){

        if($category == "new")
            $where = "comment_checked = false";

        if($category == "reported")
            $where = "comment_reported = true";

        return $this->getAuthorCommentsList($where);

    }


    public function addComment($id, $pseudo, $creationDate, $content, $episodeId){

        $comment = new Comment($id, $pseudo, $creationDate, $content, $episodeId);

        $this->sendComment($comment);

    }


    public function checkComment($commentId){

        $this->sendCommentCheck($commentId);

    }


    public function reportComment($commentId){

        $this->sendCommentReport($commentId);

    }

}
