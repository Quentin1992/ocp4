<?php
require_once('controller/CommentsController.php');
$commentsController = new CommentsController;
require_once('controller/EpisodesController.php');
$episodesController = new EpisodesController;
require_once('controller/UsersController.php');
$usersController = new UsersController;


//actions handler
if (isset($_POST['action'])) {

    switch ($_POST['action']) {

        //COMMENTS ACTIONS
        //CREATE COMMENT

        case 'addComment':

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

            break;

        //READ COMMENT

        case 'getEpisodeComments':

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

            break;

        //UPDATE COMMENT

        case 'reportComment':
            $commentsController->reportComment($_POST['commentId']);
            break;

        case 'validateComment':
            $commentsController->validateComment($_POST['commentId']);
            break;

        //DELETE COMMENT

        case 'deleteComment':
            $commentsController->deleteComment($_POST['commentId']);
            break;

        //EPISODES ACTIONS
        //CREATE EPISODE

        case 'addEpisode':
            $episodesController->addEpisode(null, $_POST['number'], null, $_POST['publicationDate'], $_POST['title'], $_POST['content']);
            break;

        //READ EPISODE

        case 'getEpisode':

            $episode = $episodesController->episode($_POST['episodeNumber']);

            $episodeData = array(
                'id' => $episode->id(),
                'number' => $episode->number(),
                'publicationDate' => $episode->publicationDate(),
                'title' => $episode->title(),
                'content' => $episode->content()
            );
            echo json_encode($episodeData);
            break;

        //UPDATE EPISODE

        case 'updateEpisode':
            $episodesController->updateEpisode($_POST['id'], $_POST['number'], null, $_POST['publicationDate'], $_POST['title'], $_POST['content']);
            break;

        //DELETE EPISODE

        case 'deleteEpisode':
            $episodesController->deleteEpisode($_POST['episodeId']);
            break;

        //USERS ACTIONS
        //CREATE USERS

        case 'addUser':
            $usersController->addUser(null, $_POST['pseudo'], null, $_POST['password'], $_POST['email'], null);
            break;

        //READ USERS

        case 'connectUser':
            $status = $usersController->connectUser($_POST['pseudo'], $_POST['password']);

            if($status == "reader"){
                session_start();
                $_SESSION['pseudo'] = $_POST['pseudo'];
                $_SESSION['status'] = $status;
                echo $status;
            }

            break;

        case 'getUsersList' :

            $users = $usersController->usersList();
            $usersData = [];

            foreach ($users as $key => $user) {

                $date = date_create($user->registrationDate());
                $registrationDate = 'le ' . date_format($date, 'd/m/Y') . ' à ' . date_format($date, 'H\hi');

                $usersData[] = array(
                    'id' => $user->id(),
                    'pseudo' => $user->pseudo(),
                    'status' => $user->status(),
                    'password' => $user->password(),
                    'email' => $user->email(),
                    'registrationDate' => $user->registrationDate()
                );

            }
            echo json_encode($usersData);

            break;

        //UPDATE USERS

        case 'updateUser' :
            $usersController->updateUser($_POST['id'], $_POST['pseudo'], $_POST['status'], $_POST['password'], $_POST['email']);
            break;

        //DELETE USERS

        case 'deleteUser' :
            $usersController->deleteUser($_POST['id']);

        default:
            // code...
            break;
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
