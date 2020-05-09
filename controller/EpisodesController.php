<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
$path = $root . '/ocp4/model/EpisodesManager.php';

require_once($path);

class EpisodesController extends EpisodesManager{

    //CREATE

    public function addEpisode($id, $number, $author, $publicationDate, $title, $content){
        $episode = new Episode($id, $number, $author, $publicationDate, $title, $content);
        $this->sendNewEpisode($episode);
    }


    //READ

    public function episode($episodeNumber){
        $episode = $this->getEpisode($episodeNumber);
        $episodeData = array(
            'id' => $episode->id(),
            'number' => $episode->number(),
            'author' => $episode->author(),
            'publicationDate' => $episode->publicationDate(),
            'title' => $episode->title(),
            'content' => $episode->content()
        );
        return json_encode($episodeData);
    }

    public function upcomingEpisodes($numberOfEpisodes){
        $upcomingEpisodes = $this->getUpcomingEpisodes($numberOfEpisodes);
        $upcomingEpisodesData = [];
        foreach ($upcomingEpisodes as $key => $episode) {
            $upcomingEpisodesData[] = array(
                'id' => $episode->id(),
                'number' => $episode->number(),
                'author' => $episode->author(),
                'publicationDate' => $episode->publicationDate(),
                'title' => $episode->title(),
                'content' => $episode->content(),
            );
        }
        return json_encode($upcomingEpisodesData);
    }

    public function publishedEpisodes($numberOfEpisodes, $sortOrder){
        $publishedEpisodes = $this->getPublishedEpisodes($numberOfEpisodes, $sortOrder);
        $publishedEpisodesData = [];
        foreach ($publishedEpisodes as $key => $episode) {
            $publishedEpisodesData[] = array(
                'id' => $episode->id(),
                'number' => $episode->number(),
                'author' => $episode->author(),
                'publicationDate' => $episode->publicationDate(),
                'title' => $episode->title(),
                'content' => $episode->content(),
            );
        }
        return json_encode($publishedEpisodesData);
    }

    public function fullLastEpisode(){
        return $this->getFullLastEpisode();
    }

    public function lastEpisodeNumber(){
        $fullLastEpisode = $this->getFullLastEpisode();
        return $fullLastEpisode->number();
    }

    //UPDATE

    public function updateEpisode($id, $number, $author, $publicationDate, $title, $content){
        $episode = new Episode($id, $number, $author, $publicationDate, $title, $content);
        $this->sendUpdateEpisode($episode);
    }

    //DELETE

    public function deleteEpisode($episodeId){
        $this->sendDeleteEpisode($episodeId);
    }
}
