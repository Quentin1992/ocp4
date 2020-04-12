<?php
require_once('controller/CommentsController.php');
$commentsController = new CommentsController;
require_once('controller/EpisodesController.php');
$episodesController = new EpisodesController;
require_once('controller/UsersController.php');
$usersController = new UsersController;


//actions handler
if (isset($_POST['action'])) {

    //COMMENTS ACTIONS
    //CREATE COMMENT

    if ($_POST['action'] == "addComment") {

        $commentsController->addComment(null, $_POST['author'], null, $_POST['content'], $_POST['episodeId']);

        //send back the comment to display with creation date
        $lastComment = $commentsController->episodeCommentsList($_POST['episodeId'], 1);

        $date = date_create($lastComment[0]->creationDate());
        $creationDate = 'le ' . date_format($date, 'd/m/Y') . ' à ' . date_format($date, 'H\hi');

        $lastCommentData = array(
            'author' => $lastComment[0]->author(),
            'creationDate' => $creationDate,
            'content' => $lastComment[0]->content()
        );
        echo json_encode($lastCommentData);

    }

    //READ COMMENT

    if($_POST['action'] == "getEpisodeComments"){

        $comments = $commentsController->episodeCommentsList($_POST['episodeNumber'], $_POST['numberOfComments']);
        $commentsData = [];

        foreach ($comments as $key => $comment) {

            $date = date_create($comment->creationDate());
            $creationDate = 'le ' . date_format($date, 'd/m/Y') . ' à ' . date_format($date, 'H\hi');

            $commentsData[] = $commentData = array(
                'id' => $comment->id(),
                'author' => $comment->author(),
                'creationDate' => $creationDate,
                'content' => $comment->content()
            );

        }
        echo json_encode($commentsData);
    }

    //UPDATE COMMENT

    if($_POST['action'] == "reportComment"){
        $commentsController->reportComment($_POST['commentId']);
    }

    if($_POST['action'] == "validateComment"){
        $commentsController->validateComment($_POST['commentId']);
    }

    //DELETE COMMENT

    if($_POST['action'] == "deleteComment"){
        $commentsController->deleteComment($_POST['commentId']);
    }


    //EPISODES ACTIONS
    //CREATE EPISODE

    if ($_POST['action'] == "addEpisode") {
        $episodesController->addEpisode(null, $_POST['number'], null, $_POST['publicationDate'], $_POST['title'], $_POST['content']);
    }

    //READ EPISODE

    if($_POST['action'] == "getEpisode"){

        $episode = $episodesController->episode($_POST['episodeNumber']);

        $episodeData = array(
            'id' => $episode->id(),
            'number' => $episode->number(),
            'publicationDate' => $episode->publicationDate(),
            'title' => $episode->title(),
            'content' => $episode->content()
        );
        echo json_encode($episodeData);
    }

    //UPDATE EPISODE

    if ($_POST['action'] == "updateEpisode") {
        $episodesController->updateEpisode($_POST['id'], $_POST['number'], null, $_POST['publicationDate'], $_POST['title'], $_POST['content']);
    }

    //DELETE EPISODE

    if($_POST['action'] == "deleteEpisode"){
        $episodesController->deleteEpisode($_POST['episodeId']);
    }

    //USERS ACTIONS
    //CREATE USERS

    if ($_POST['action'] == "addUser") {
        //on a les bonnes infos qui arrivent
        $usersController->addUser(null, $_POST['pseudo'], null, $_POST['password'], $_POST['email'], null);
    }

    //READ USERS

    if($_POST['action'] == "connectUser"){

        echo $usersController->connectUser($_POST['pseudo'], $_POST['password']);

    }


}
else header("Location: http://localhost/ocp4/view/readerView.php");

// if(isset($_SESSION['login']) && isset($_SESSION['password'])){
//
//     $allowed = $usersController->checkIdentity($_SESSION['login'], $_SESSION['password']);
//     if($allowed){
//
//         require_once('view/authorView.php');
//
//     }
//
// }
// else{
//
//     require_once('view/readerView.php');
//
// }
