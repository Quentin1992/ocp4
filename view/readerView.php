<?php
require_once('../controller/EpisodesController.php');
$episodesController = new EpisodesController;

require_once('../controller/CommentsController.php');
$commentsController = new CommentsController;

 ?>

<header>

    <h1>Nouveau roman de Jean Forteroche</h1>
    <!--<img>-->
    <p>Découvrez les épisodes du nouveau roman de Jean Forteroche au fur et à mesure de son écriture.</p>

</header>


<aside>

    <h2>Prochain épisode</h2>
    <?php $upcomingEpisode = $episodesController->upcomingEpisode();

    if($upcomingEpisode != null){ ?>

        <p>Prochain épisode : <?php echo $upcomingEpisode->id() ?> - <span><?php echo $upcomingEpisode->title() ?></span>, le <?php echo $upcomingEpisode->publicationDate() ?></p>

    <?php }else{ ?>

        <p>Le prochain épisode arrive bientôt</p>

    <?php } ?>

    <h2>Episodes publiés</h2>
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

</aside>


<article>

    <h2>Dernier épisode publié</h2>

    <div>
        <?php $fullLastEpisode = $episodesController->fullLastEpisode(); ?>
        <h3><?php echo $fullLastEpisode->id() ?> - <?php echo $fullLastEpisode->title() ?></h3>
        <p><?php echo $fullLastEpisode->content() ?></p>
    </div>

    <div>

        <h4>Commenter</h4>

        <form method="post" action="readerView.php">
            <input type="text" name="pseudo" required>
            <textarea name="content" required></textarea>
            <input type="submit" label="envoyer">
        </form>

        <h4>Commentaires</h4>

        <?php
        $episodeId = $episodesController->lastEpisodeId();

        if(isset($_POST['pseudo']) && isset($_POST['content'])){
            $commentsController->addComment(null, $_POST['pseudo'], "", $_POST['content'], $episodeId);
        }

        $comments = $commentsController->episodeCommentsList($episodeId);
        ?>

        <ol>
            <?php foreach($comments as $comment){ ?>
                    <li>
                        <div>
                            <?php echo $comment->author() ?>, le <?php echo $comment->creationDate() ?>
                        </div>

                        <p><?php echo $comment->content() ?></p>

                        <div>
                            <a href="readerView.php?action=report&commentId=<?php echo $comment->id() ?>">Signaler</a>
                        </div>

                        <?php
                        if(isset($_GET['action']) && $_GET['action'] == "report" && $_GET['commentId'] == $comment->id()){

                            $this->sendCommentReport($_GET['commentId']);
                            echo "Ce commentaire a été signalé. Il sera vérifié par l'auteur.";

                        }
                        ?>
                    </li>

            <?php } ?>
        </ol>
        
    </div>

</article>
