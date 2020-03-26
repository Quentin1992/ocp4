<?php
require_once('Database.php');

class EpisodesManager extends Database{


    //properties

    private $_db;

    public function __construct(){

        this->db = $this->setDbConnection($db);

    }


    //methods for reader

    public function getUpcomingEpisode(){

        $sql = 'SELECT episode_id, episode_publication_date, episode_title FROM episodes WHERE episode_publication_date < date() ORDER BY episode_id ASC';
        $data = $this->_db->query($sql);

        $upcomingEpisode = new Episode($data);

        return $upcomingEpisode;

    }


    public function getPublishedList(){

        $sql = 'SELECT episode_id, episode_publication_date, episode_title FROM episodes WHERE episode_publication_date > date() ORDER BY episode_publication_date DESC LIMIT 1, 1';
        $query = $this->_db->prepare($sql);

        while($data = $query->fetch(PDO::FETCH_ASSOC)){

            $publishedEpisodes[] = new Episode($data['episode_id'], $data['episode_publication_date'], $data['episode_title']);

        }

        return $publishedEpisodes;

    }






    public function sendEpisode(Episode $episode){

        $q = $this->_db->prepare('INSERT INTO episodes(author, title, content) VALUES(:author, :title, :content)');

        $q->bindValue(':author', $comment->author());
        $q->bindValue(':title', $comment->title());
        $q->bindValue(':content', $comment->content());

        $q->execute();

    }


    public function delete(Episode $episode){

        $q = $this->_db->exec('DELETE FROM episodes WHERE id = '.$comment->_id());

    }


    public function get($id){

        $id= (int) $id;

        $q = $this->_db->query('SELECT episode_id, episode_author, episode_publication_date, episode_content, episode_id FROM episodes WHERE id = '.$id);

        $data = $q->fetch(PDO::FETCH_ASSOC);

        return new Episode($data);

    }


    public function getList(){

        $episodes = [];

        $q = $this->_db->query('SELECT episode_id, episode_author, episode_publication_date, episode_content FROM episodes ORDER BY ASC episode_publication_date');

        while ($data = $q->fetch(PDO::FETCH_ASSOC)){

            $episodes[] = new Episode($data);

        }

        return $episodes;

    }


    public function update(Episode $episode){

        $q = $this->_db->prepare('UPDATE episodes SET episode_author = :author, episode_publication_date = :publicationDate, episode_title = :title, episode_content = :content WHERE comment_id = :id');

        $q->bindValue(':author', $comment->author(), PDO::PARAM_INT);
        $q->bindValue(':publicationDate', $comment->publicationDate(), PDO::PARAM_INT);
        $q->bindValue(':title', $comment->title(), PDO::PARAM_INT);
        $q->bindValue(':content', $comment->content(), PDO::PARAM_INT);
        $q->bindValue(':id', $comment->id(), PDO::PARAM_INT);

        $q->execute();

    }


    public function setDb(PDO $db){
        $this->_db = $db;
    }

}
