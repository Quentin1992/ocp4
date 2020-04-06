<?php
require_once('../controller/EpisodesController.php');
require_once('../controller/CommentsController.php');

$episodesController = new EpisodesController;
$commentsController = new CommentsController;
?>

<div>

    <h2>Episodes</h2>

    <div>
        <h3>Episodes publiés</h3>
        <?php $publishedEpisodes = $episodesController->publishedList(); ?>

        <ol>
            <?php
            if(empty($publishedEpisodes)){ ?>
                <p>Auncun épisode publié pour le moment.</p>
            <?php
            } else{
                foreach($publishedEpisodes as $publishedEpisode){ ?>
                <li>
                    <a href="#"> <?php echo $publishedEpisode->id() . ' : ' . $publishedEpisode->title(); ?> </a>
                </li>
            <?php }
            } ?>
        </ol>
    </div>

    <div>
        <h3>Episodes en attente</h3>
        <?php $upcomingEpisodes = $episodesController->upcomingEpisodes(); ?>

        <ol>
            <?php
            if(empty($upcomingEpisodes)){ ?>
                <p>Auncun épisode en attente</p>
            <?php
            } else{
                foreach($upcomingEpisodes as $upcomingEpisode){ ?>
                <li>
                    <a href="#"> <?php echo $upcomingEpisode->id() . ' : ' . $upcomingEpisode->title(); ?> </a>
                </li>
            <?php }
            } ?>
        </ol>
    </div>

</div>


<div>

    <h2>Commentaires</h2>

    <div>
        <h3>Nouveaux commentaires</h3>
        <?php $comments = $commentsController->authorCommentsList("new");

        if(empty($comments)){ ?>
            <p>Aucun commentaire à afficher.</p>
        <?php }else{ ?>
            <ol>
                <?php foreach($comments as $comment){ ?>

                    <li>
                        <div>
                            <?php echo $comment->author() ?> le <?php echo $comment->creationDate() ?>
                        </div>

                        <p><?php echo $comment->content() ?></p>

                        <div>
                            <a href="authorView.php?action=checkComment&commentId=<?php echo $comment->id() ?>">
                                Valider
                            </a>
                            <a href="authorView.php?action=delete&commentId=<?php echo $comment->id() ?>">
                                Supprimer
                            </a>
                        </div>

                        <?php if(isset($_GET['action'])){
                            if($_GET['action'] == "checkComment" && $_GET['commentId'] == $comment->id()){

                                $commentsController->sendCommentCheck($_GET['commentId']);
                                echo "Ce commentaire a été marqué comme lu et vérifié.";

                            }

                            if($_GET['action'] == "delete" && $_GET['commentId'] == $comment->id()){

                                $this->deleteComment($_GET['commentId']);
                                echo "Ce commentaire a été supprimé.";

                            }

                        } ?>
                    </li>
                <?php }
                } ?>
            </ol>

            <?php if(isset($_GET['action']) && $_GET['action'] == "checkAllComments"){

                $this->sendCheckAllComments();
                echo "Tous les commentaires ont été marqués comme lus et vérifiés.";

            } ?>

    </div>

    <div>
        <h3>Commentaires signalés</h3>
        <?php $comments = $commentsController->authorCommentsList("reported");

        if(empty($comments)){ ?>
            <p>Aucun commentaire à afficher.</p>
        <?php }else{ ?>
            <ol>
                <?php foreach($comments as $comment){ ?>

                    <li>
                        <div>
                            <?php echo $comment->author() ?> le <?php echo $comment->creationDate() ?>
                        </div>

                        <p><?php echo $comment->content() ?></p>

                        <div>
                            <a href="authorView.php?action=checkComment&commentId=<?php echo $comment->id() ?>">
                                Valider
                            </a>
                            <a href="authorView.php?action=delete&commentId=<?php echo $comment->id() ?>">
                                Supprimer
                            </a>
                        </div>

                        <?php if(isset($_GET['action'])){
                            if($_GET['action'] == "checkComment" && $_GET['commentId'] == $comment->id()){

                                $commentsController->sendCommentCheck($_GET['commentId']);
                                echo "Ce commentaire a été marqué comme lu et vérifié.";

                            }

                            if($_GET['action'] == "delete" && $_GET['commentId'] == $comment->id()){

                                $this->deleteComment($_GET['commentId']);
                                echo "Ce commentaire a été supprimé.";

                            }

                        } ?>
                    </li>
                <?php }
                } ?>
            </ol>

            <?php if(isset($_GET['action']) && $_GET['action'] == "checkAllComments"){

                $this->sendCheckAllComments();
                echo "Tous les commentaires ont été marqués comme lus et vérifiés.";

            } ?>
    </div>

    <a href="authorView.php?action=checkAllComments">
        Tout valider
    </a>

</div>


<div>
    <h2>Rédaction d'un article</h2>
    <!--édition d'un article-->
    <form method="post" action="../controller/authorManager.php">
        <input type="number" name="episodeNumber">
        <input type="text" name="title">
        <textarea id="myTextArea" name="content"></textarea>
        <input type="datetime" name="date">
        <input type="submit">
    </form>
    <!--apparaît neutre

        envoi :
            si actualisé suite à un clic sur un épisode dans la liste, associé à son id
            sinon, nouvel id
        case "publier maintenant" -> isPublished true ou false
        date de publication-->
</div>
