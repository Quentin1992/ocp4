<?php
class EpisodesManager extends Database{

    //properties
    private $db;
    public function __construct(){
        $this->db = $this->setDbConnection();
    }

    //CREATE

    public function sendNewEpisode(Episode $episode){
        $sql = 'INSERT INTO episodes(episode_number, episode_publication_date, episode_title, episode_content) VALUES(:number, :publicationDate, :title, :content)';
        $query = $this->db->prepare($sql);
        $query->bindValue(':number', $episode->number(), PDO::PARAM_INT);
        $query->bindValue(':publicationDate', $episode->publicationDate(), PDO::PARAM_STR);
        $query->bindValue(':title', $episode->title(), PDO::PARAM_STR);
        $query->bindValue(':content', $episode->content(), PDO::PARAM_STR);
        $query->execute();
    }

    //READ

    public function getEpisode($episodeNumber){
        $sql = 'SELECT * FROM episodes WHERE episode_number = ' . $episodeNumber;
        $query = $this->db->query($sql);
        $data = $query->fetch(PDO::FETCH_ASSOC);
        $episode = new Episode($data['episode_id'], $data['episode_number'], $data['episode_author'], $data['episode_publication_date'], $data['episode_title'], $data['episode_content']);
        return $episode;
    }

    public function getPublishedEpisodes($numberOfEpisodes, $sortOrder){
        $publishedEpisodes = [];
        $sql = 'SELECT * FROM episodes WHERE episode_publication_date < now() ORDER BY episode_publication_date';
        if(isset($sortOrder)){
            if($sortOrder == "asc")
                $sql = $sql . ' ASC';
            elseif($sortOrder == "desc")
                $sql = $sql . ' DESC';
        }
        if(isset($numberOfEpisodes))
            $sql = $sql . ' LIMIT ' . $numberOfEpisodes;
        $query = $this->db->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $publishedEpisodes[] = new Episode($data['episode_id'], $data['episode_number'], $data['episode_author'], $data['episode_publication_date'], $data['episode_title'], $data['episode_content']);
        }
        return $publishedEpisodes;
    }

    public function getFullLastEpisode(){
        $sql = 'SELECT * FROM episodes WHERE episode_publication_date < now() ORDER BY episode_publication_date DESC LIMIT 1';
        $query = $this->db->query($sql);
        $data = $query->fetch(PDO::FETCH_ASSOC);
        return new Episode($data['episode_id'], $data['episode_number'], $data['episode_author'], $data['episode_publication_date'], $data['episode_title'], $data['episode_content']);
    }

    public function getUpcomingEpisodes($numberOfEpisodes){
        $upcomingEpisodes = [];
        $sql = 'SELECT * FROM episodes WHERE episode_publication_date > now() ORDER BY episode_publication_date DESC LIMIT ' . $numberOfEpisodes;
        $query = $this->db->query($sql);
        while ($data = $query->fetch(PDO::FETCH_ASSOC)){
            $upcomingEpisodes[] = new Episode($data['episode_id'], $data['episode_number'], $data['episode_author'], $data['episode_publication_date'], $data['episode_title'], $data['episode_content']);
        }
        return $upcomingEpisodes;
    }

    //UPDATE

    public function sendUpdateEpisode(Episode $episode){
        $sql = 'UPDATE episodes SET episode_number = :number, episode_publication_date = :publicationDate, episode_title = :title, episode_content = :content WHERE episode_id = :id';
        $query = $this->db->prepare($sql);
        $query->bindValue(':number', $episode->number(), PDO::PARAM_INT);
        $query->bindValue(':publicationDate', $episode->publicationDate(), PDO::PARAM_STR);
        $query->bindValue(':title', $episode->title(), PDO::PARAM_STR);
        $query->bindValue(':content', $episode->content(), PDO::PARAM_STR);
        $query->bindValue(':id', $episode->id(), PDO::PARAM_INT);
        $query->execute();
    }

    //DELETE
    public function sendDeleteEpisode($episodeId){
        $query = $this->db->exec('DELETE FROM episodes WHERE episode_id = ' . $episodeId);
    }
}
