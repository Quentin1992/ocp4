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

    <div>
        <h3>
            <?php
            $fullLastEpisode = $episodesController->fullLastEpisode();
            echo $fullLastEpisode['post_id'] . ': ' . $fullLastEpisode['post_title'];
            ?>
        </h3>

        <p>
            <?php echo $fullLastEpisode['post_content']; ?>
        </p>
    </div>

    <div>

        <h4>Commenter</h4>

        <form method="post" action="?">

            <input type="text" name="pseudo">
            <textarea name="content"></textarea>
            <input type="submit" label="envoyer">

        </form>

        <h4>Commentaires</h4>

        <?php $commentsController->episodeCommentsList($episodeId); ?>

    </div>

</article>
