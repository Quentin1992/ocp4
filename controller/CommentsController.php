<?php
class CommentsController extends CommentsManager{

    //CREATE

    public function addComment($id, $pseudo, $creationDate, $content, $episodeId){
        $comment = new Comment($id, $pseudo, $creationDate, htmlspecialchars($content), $episodeId);
        $this->sendComment($comment);
    }

    //READ

    public function episodeCommentsList($episodeId, $numberOfComments){
        $comments = $this->getEpisodeComments($episodeId, $numberOfComments);
        $commentsData = [];
        foreach ($comments as $key => $comment) {
            $commentsData[] = $commentData = array(
                'id' => $comment->id(),
                'author' => $comment->author(),
                'creationDate' => $comment->creationDate(),
                'content' => $comment->content(),
                'episodeId' => $comment->episodeId()
            );
        }
        return json_encode($commentsData);
        //return $this->getComments($episodeId, null, $numberOfComments);
    }

    public function commentsList($category){
        $comments = $this->getAuthorCommentsList($category);
        $commentsData = [];
        foreach ($comments as $key => $comment) {
            $commentsData[] = $commentData = array(
                'id' => $comment->id(),
                'author' => $comment->author(),
                'creationDate' => $comment->creationDate(),
                'content' => $comment->content(),
                'episodeId' => $comment->episodeId()
            );
        }
        return json_encode($commentsData);
    }

    public function numberOfEpisodeComments($episodeId){
        return $this->countEpisodeComments($episodeId);
    }

    //UPDATE

    public function updateComment($commentId, $content){
        $this->sendCommentUpdate($commentId, htmlspecialchars($content));
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
