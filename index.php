<?php
require_once('controller/CommentsController.php');
$commentsController = new CommentsController;


if (isset($_POST['action'])) {

    if ($_POST['action'] == "addComment") {

        $commentsController->addComment(null, $_POST['author'], null, $_POST['content'], $_POST['episodeId']);

        $lastComment = $commentsController->episodeCommentsList($_POST['episodeId'], 1);

        $lastCommentData = array(
            'author' => $lastComment[0]->author(),
            'creationDate' => $lastComment[0]->creationDate(),
            'content' => $lastComment[0]->content()
        );

        echo json_encode($lastCommentData);

    }

    if($_POST['action'] == "reportComment"){

        $commentsController->reportComment($_POST['commentId']);

    }
}



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
// } -->
