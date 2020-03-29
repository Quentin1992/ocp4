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
    <?php $episodesController->upcomingEpisode(); ?>

    <h2>Episodes publiés</h2>
    <?php $episodesController->publishedList(); ?>

</aside>


<article>

    <h2>Dernier épisode publié</h2>

    <div>
        <?php $fullLastEpisode = $episodesController->fullLastEpisode(); ?>
    </div>

    <div>

        <h4>Commenter</h4>

        <form method="post" action="?">
            <input type="text" name="pseudo">
            <textarea name="content"></textarea>
            <input type="submit" label="envoyer">
        </form>

        <h4>Commentaires</h4>

        <?php
        $episodeId = $episodesController->lastEpisodeId();
        $commentsController->episodeCommentsList($episodeId);
        ?>

    </div>

</article>
