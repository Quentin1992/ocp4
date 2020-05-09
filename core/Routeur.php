<?php

class Routeur{

    private $commentsController;
    private $episodesController;
    private $usersController;
    private $indexController;

    public function __construct(){
        $this->commentsController = new CommentsController();
        $this->episodesController = new EpisodesController();
        $this->usersController = new UsersController();
        $this->indexController = new IndexController();
    }

    public function routeQuery(){
        if (isset($_POST['action'])) {
            switch ($_POST['action']) {
                //COMMENTS ACTIONS
                //CREATE COMMENT
                case 'addComment':
                    $this->commentsController->addComment(null, $_POST['author'], null, $_POST['content'], $_POST['episodeId']);
                    break;
                //READ COMMENT
                case 'getEpisodeComments':
                    echo $this->commentsController->episodeCommentsList($_POST['episodeId'], $_POST['numberOfComments']);
                    break;
                case 'getComments':
                    echo $this->commentsController->commentsList($_POST['category']);
                    break;
                case 'countEpisodeComments':
                    echo $this->commentsController->numberOfEpisodeComments($_POST['episodeId']);
                    break;
                //UPDATE COMMENT
                case 'updateComment':
                    $this->commentsController->updateComment($_POST['id'], $_POST['content']);
                    break;
                case 'reportComment':
                    $this->commentsController->reportComment($_POST['commentId']);
                    break;
                case 'validateComment':
                    $this->commentsController->validateComment($_POST['commentId']);
                    break;
                //DELETE COMMENT
                case 'deleteComment':
                    $this->commentsController->deleteComment($_POST['commentId']);
                    break;
                //EPISODES ACTIONS
                //CREATE EPISODE
                case 'addEpisode':
                    $this->episodesController->addEpisode(null, $_POST['number'], null, $_POST['publicationDate'], $_POST['title'], $_POST['content']);
                    break;
                //READ EPISODE
                case 'getEpisode':
                    echo $this->episodesController->episode($_POST['episodeNumber']);
                    break;
                case 'getUpcomingEpisodes':
                    echo $this->episodesController->upcomingEpisodes($_POST['numberOfEpisodes']);
                    break;
                case 'getPublishedEpisodes':
                    echo $this->episodesController->publishedEpisodes(json_decode($_POST['numberOfEpisodes']), $_POST['sortOrder']);
                    break;
                //UPDATE EPISODE
                case 'updateEpisode':
                    $this->episodesController->updateEpisode($_POST['id'], $_POST['number'], null, $_POST['publicationDate'], $_POST['title'], $_POST['content']);
                    break;
                //DELETE EPISODE
                case 'deleteEpisode':
                    $this->episodesController->deleteEpisode($_POST['episodeId']);
                    break;
                //USERS ACTIONS
                //CREATE USERS
                case 'addUser':
                    $this->usersController->addUser(null, $_POST['pseudo'], null, $_POST['password'], $_POST['email'], null, null, $_POST['getNewsletter']);
                    break;
                // case 'sendConfirmationEmail':
                //READ USERS
                case 'getUserFromPseudo' :
                    echo $this->usersController->getUserFromPseudo($_POST['pseudo']);
                    break;
                case 'isPseudoAvailable' : //return a boolean
                    echo json_encode($this->usersController->isPseudoAvailable($_POST['pseudo']));
                break;
                case 'isEmailAvailable' : //return a boolean
                    echo json_encode($this->usersController->isEmailAvailable($_POST['email']));
                    break;
                case 'getUsersList' :
                    echo $this->usersController->usersList($_POST['category']);
                    break;
                case 'openUserSession':
                    echo $this->usersController->openUserSession($_POST['pseudo'], $_POST['password']);
                    break;
                case 'getUserInSession':
                    echo $this->usersController->userInSession();
                    break;
                case 'closeUserSession':
                    $this->usersController->closeUserSession();
                    break;
                //UPDATE USERS
                case 'updateUser' :
                    $this->usersController->updateUser($_POST['id'], $_POST['pseudo'], json_decode($_POST['status']), $_POST['password'], $_POST['email'], filter_var($_POST['getNewsletter'], FILTER_VALIDATE_BOOLEAN));
                    break;
                case 'updatePseudoInSession':
                    $this->usersController->updatePseudoInSession($_POST['pseudo']);
                    break;
                case 'validateUser' :
                    $this->usersController->validateUser($_POST['id']);
                    break;
                //DELETE USERS
                case 'deleteUser' :
                    $this->usersController->deleteUser($_POST['id']);
                    break;
                default:
                    break;
                //ROUTER
                // case 'authorView' :
                //     $this->indexController->author();
                //     break;
            }
        }
        elseif(isset($_GET['action'])){
            if($_GET['action'] == "authorView")
                $this->indexController->authorView();
        }
        else{
            $this->indexController->index();
        }
    }
}
