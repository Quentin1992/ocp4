<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
$path = $root . '/ocp4/model/CommentsManager.php';

require_once($path);
class CommentsController extends CommentsManager{


    //CREATE

    public function addComment($id, $pseudo, $creationDate, $content, $episodeId){

        $comment = new Comment($id, $pseudo, $creationDate, $content, $episodeId);

        $this->sendComment($comment);

    }


    //READ

    public function episodeCommentsList($episodeId, $numberOfComments){

        return $this->getEpisodeComments($episodeId, $numberOfComments);

        //return $this->getComments($episodeId, null, $numberOfComments);

    }


    public function commentsList($category){

        if($category == "new")
            $where = "comment_checked = false";

        if($category == "reported")
            $where = "comment_reported = true";

        return $this->getAuthorCommentsList($where);

    }


    public function numberOfEpisodeComments($episodeId){
        return $this->countEpisodeComments($episodeId);
    }


    //UPDATE

    public function updateComment($commentId, $content){
        $this->sendCommentUpdate($commentId, $content);
    }


    public function validateComment($commentId){
        $this->sendCommentValidation($commentId);
    }


    public function reportComment($commentId){
        $this->sendCommentReport($commentId);
    }


    //DELETE

    public function deleteComment($commentId){
        $this->sendCommentDeletion($commentId);
    }

}
