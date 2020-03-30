<?php
require_once('Database.php');
require_once('Comment.php');

class CommentsManager extends Database{


    //properties

    private $db;

    public function __construct(){

        $this->db = $this->setDbConnection();

    }


    //methods for reader

    public function getEpisodeCommentsList(int $episodeId){

        $comments = [];

        $sql = 'SELECT * FROM comments WHERE episode_id =' . $episodeId . ' ORDER BY comment_creation_date DESC';
        $query = $this->db->query($sql);

        $data = $query->execute();

        while ($data = $query->fetch(PDO::FETCH_ASSOC)){

            $comments[] = new Comment($data['comment_id'], $data['comment_author'], $data['comment_creation_date'], $data['comment_content'], $data['episode_id']);

        }

        return $comments;

    }


    //$category : 'comment_checked = false' or 'comment_reported = true'
    public function getAuthorCommentsList($category){

        $comments = [];

        if($category == "new"){
            $where = "comment_checked = false";

        }
        if($category == "reported"){
            $where = "comment_reported = true";
        }

        $sql = 'SELECT * FROM comments WHERE ' . $where . ' ORDER BY comment_creation_date DESC';
        $query = $this->db->query($sql);

        $data = $query->execute();

        while ($data = $query->fetch(PDO::FETCH_ASSOC)){

            $comments[] = new Comment($data['comment_id'], $data['comment_author'], $data['comment_creation_date'], $data['comment_content'], $data['episode_id']);

        }

        return $comments;

    }


    public function sendComment(Comment $comment){

        $sql = 'INSERT INTO comments(comment_author, comment_content, episode_id) VALUES(:author, :content, :episode_id)';
        $query = $this->db->prepare($sql);

        $query->bindValue(':author', $comment->author(), PDO::PARAM_STR);
        $query->bindValue(':content', $comment->content(), PDO::PARAM_STR);
        $query->bindValue(':episode_id', $comment->episodeId(), PDO::PARAM_INT);
        $query->execute();

    }


    public function sendCommentReport($commentId){

        $sql = 'UPDATE `comments` SET `comment_reported`= 1 WHERE `comment_id` = :commentId';

        $query = $this->db->prepare($sql);

        $query->bindValue(':commentId', $commentId, PDO::PARAM_INT);

        $query->execute();

    }


    public function sendCommentCheck($commentId){

        $sql = 'UPDATE `comments` SET `comment_checked` = 1, `comment_reported` = 0 WHERE `comment_id` = :commentId';

        $query = $this->db->prepare($sql);

        $query->bindValue(':commentId', $commentId, PDO::PARAM_INT);

        $query->execute();

    }


    public function sendCheckAllComments(){

        $sql = 'UPDATE `comments` SET `comment_checked` = 1, `comment_reported` = 0 WHERE `comment_checked` = 0 OR `comment_reported` = 1';

        $query = $this->db->query($sql);

        $query->execute();

    }


    public function deleteComment($commentId){
        var_dump($commentId);

        $sql = 'DELETE FROM comments WHERE comment_id = ' . $commentId;

        $query = $this->db->query($sql);

        $query->execute();

    }



    //maybe I delete these later





    public function get($id){

        $id= (int) $id;

        $q = $this->db->query('SELECT comment_id, comment_author, comment_creation_date, comment_content, episode_id FROM comments WHERE id = '.$id);

        $data = $q->fetch(PDO::FETCH_ASSOC);

        return new Comment($data);

    }


    //commentaires validés d'un épisode
    public function getList($episodeId){

        $comments = [];

        $q = $this->db->query('SELECT * FROM comments WHERE episode_id =' . $episodeId .' ORDER BY comment_creation_date DESC');

        $data = $q->execute();

        while ($data = $q->fetch(PDO::FETCH_ASSOC)){

            $comments[] = new Comment($data['comment_author'], $data['comment_content'], $data['episode_id']);

        }

        return $comments;

    }

    //tous les commentaires non-validés (nouveaux)
    //tous les commentaires signalés


    public function update(Comment $comment){

        $q = $this->_db->prepare('UPDATE comments SET comment_author = :author, comment_content = :content, comment_is_checked = :isChecked, comment_is_reported = :isReported WHERE comment_id = :id');

        $q->bindValue(':author', $comment->author(), PDO::PARAM_INT);
        $q->bindValue(':content', $comment->content(), PDO::PARAM_INT);
        $q->bindValue(':isChecked', $comment->isChecked(), PDO::PARAM_INT);
        $q->bindValue(':isReported', $comment->isReported(), PDO::PARAM_INT);
        $q->bindValue(':id', $comment->id(), PDO::PARAM_INT);

        $q->execute();

    }


    /*public function setDb(PDO $db){
        $this->_db = $db;
    }*/

    //methods

    public function getComments($episode_id, $numberOfComments){

        $comments = $db->query('SELECT comment_author, comment_date, comment_content FROM comments WHERE episode_id = ' . $episode_id . ' ORDER BY date_creation DESC LIMIT 0, ' . $numberOfComments . 'ORDER BY DESC episode_id');

        return $comments;

    }

    public function reportComment($commentId){

        $db->query('UPDATE `comments` SET `comment_reported`=true WHERE comment_id = ' . $commentId);

    }

}
