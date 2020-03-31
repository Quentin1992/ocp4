<?php
require_once('../model/CommentsManager.php');

class CommentsController extends CommentsManager{


    //methods for reader

    public function episodeCommentsList(int $episodeId){

        return $this->getEpisodeCommentsList($episodeId);

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

}
