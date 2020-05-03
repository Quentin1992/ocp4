<?php
require_once('Database.php');
require_once('Comment.php');

class CommentsManager extends Database{


    //properties

    private $db;

    public function __construct(){

        $this->db = $this->setDbConnection();

    }


    //methods

    //CREATE

    public function sendComment(Comment $comment){

        $sql = 'INSERT INTO comments(comment_author, comment_content, episode_id) VALUES(:author, :content, :episode_id)';
        $query = $this->db->prepare($sql);

        $query->bindValue(':author', $comment->author(), PDO::PARAM_STR);
        $query->bindValue(':content', $comment->content(), PDO::PARAM_STR);
        $query->bindValue(':episode_id', $comment->episodeId(), PDO::PARAM_INT);
        $query->execute();

    }


    //READ

    public function getEpisodeComments($episodeId, $numberOfComments){

        $comments = [];

        $sql = 'SELECT * FROM comments WHERE episode_id = ' . $episodeId . ' ORDER BY comment_creation_date DESC LIMIT ' . $numberOfComments;
        $query = $this->db->query($sql);

        while ($data = $query->fetch(PDO::FETCH_ASSOC)){

            $comments[] = new Comment($data['comment_id'], $data['comment_author'], $data['comment_creation_date'], $data['comment_content'], $data['episode_id']);

        }

        return $comments;

    }


    //$category : 'comment_checked = false' or 'comment_reported = true'
    public function getAuthorCommentsList($where){

        $comments = [];

        $sql = 'SELECT * FROM comments WHERE ' . $where . ' ORDER BY comment_creation_date ASC';
        $query = $this->db->query($sql);

        $data = $query->execute();

        while ($data = $query->fetch(PDO::FETCH_ASSOC)){

            $comments[] = new Comment($data['comment_id'], $data['comment_author'], $data['comment_creation_date'], $data['comment_content'], $data['episode_id']);

        }

        return $comments;

    }


    public function countEpisodeComments($episodeId){

        $sql = 'SELECT COUNT(*) AS number_of_comments FROM comments WHERE episode_id = ' . $episodeId;
        $query = $this->db->query($sql);

        $data = $query->fetch(PDO::FETCH_ASSOC);

        return $data['number_of_comments'];

    }


    //UPDATE

    public function sendCommentUpdate($commentId, $content){

        $sql = 'UPDATE comments SET comment_content = :content WHERE comment_id = :id';
        $query = $this->db->prepare($sql);

        $query->bindValue(':content', $content, PDO::PARAM_STR);
        $query->bindValue(':id', $commentId, PDO::PARAM_INT);

        $query->execute();

    }


    public function sendCommentReport($commentId){

        $sql = 'UPDATE `comments` SET `comment_reported`= 1 WHERE `comment_id` = :commentId';

        $query = $this->db->prepare($sql);

        $query->bindValue(':commentId', $commentId, PDO::PARAM_INT);

        $query->execute();

    }


    public function sendCommentValidation($commentId){

        $sql = 'UPDATE `comments` SET `comment_checked` = 1, `comment_reported` = 0 WHERE `comment_id` = :commentId';

        $query = $this->db->prepare($sql);

        $query->bindValue(':commentId', $commentId, PDO::PARAM_INT);

        $query->execute();

    }


    //DELETE

    public function sendCommentDeletion($commentId){

        $sql = 'DELETE FROM `comments` WHERE `comment_id` = ' . $commentId;

        $query = $this->db->query($sql);

        $query->execute();

    }


    // public function getComments($episodeId, $category, $numberOfComments){
    //
    //     $sql = 'SELECT * FROM comments';
    //
    //     if(isset($episodeId) || isset($category)){
    //         //if isset where condition
    //         $sql = $sql . ' WHERE ';
    //         //if isset episodeId condition
    //         if(isset($episodeId))
    //             $sql = $sql . 'episode_id = ' . $episodeId;
    //         //if there are two where conditions
    //         if(isset($episodeId) && isset($category))
    //             $sql = $sql . ' AND ';
    //
    //         if(isset($category)){
    //             //if isset category condition
    //             if($category == "new")
    //                 $sql = $sql . 'comment_checked = 0';
    //             elseif($category == "reported")
    //                 $sql = $sql . 'comment_reported = 1';
    //         }
    //     }
    //
    //     $sql = $sql . ' ORDER BY comment_creation_date DESC';
    //     //if isset limit number
    //     if(isset($numberOfComments))
    //         $sql = $sql . ' LIMIT ' . $numberOfComments;
    //
    //     $query = $this->db->query($sql);
    //
    //     $data = $query->execute();
    //
    //     while ($data = $query->fetch(PDO::FETCH_ASSOC)){
    //
    //         $comments[] = new Comment($data['comment_id'], $data['comment_author'], $data['comment_creation_date'], $data['comment_content'], $data['episode_id']);
    //
    //     }
    //
    //     return $comments;
    //
    // }


}
