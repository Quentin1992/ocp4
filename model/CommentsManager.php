<?php
require_once('Database.php');

class CommentsManager extends Database{


    //methods for reader

    public function getEpisodeCommentsList(int $episodeId){

        $commentsList = [];

        $sql = 'SELECT * FROM comments WHERE episode_id =' . $episodeId . ' ORDER BY comment_creation_date DESC';
        $query = $this->db->query($sql);

        $data = $q->execute();

        while ($data = $q->fetch(PDO::FETCH_ASSOC)){

            $commentsList[] = new Comment($data['comment_author'], $data['comment_content'], $data['episode_id']);

        }

        return $commentsList;

    }


    //$category : 'comment_checked = false' or 'comment_reported = true'
    public function getAuthorCommentsList($category){

        $commentsList = [];

        if($category = "new")
            $where = "comment_checked = false";
        else if($category = "reported")
                $where = "comment_reported = true";
        else throw new \Error("Error Processing Request", 1);

        $sql = 'SELECT * FROM comments WHERE ' . $where . ' = true ORDER BY comment_creation_date DESC';
        $query = $this->db->query($sql);

        $data = $query->execute();

        while ($data = $q->fetch(PDO::FETCH_ASSOC)){

            $commentsList[] = new Comment($data['comment_author'], $data['comment_content'], $data['episode_id']);

        }

        return $commentsList;

    }









    public function add(Comment $comment){

        $bdd = $this->db;
        $query = "INSERT INTO comments(comment_author, comment_content, episode_id) VALUES(:author, :content, :episode_id)";
        $q = $bdd->prepare($query);


        $q->bindValue(':author', $comment->author(), PDO::PARAM_STR);
        $q->bindValue(':content', $comment->content(), PDO::PARAM_STR);
        $q->bindValue(':episode_id', $comment->episodeId(), PDO::PARAM_INT);
        $q->execute();

    }


    public function delete(Comment $comment){

        $q = $this->db->exec('DELETE FROM comments WHERE id = '.$perso->_id());

    }


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
