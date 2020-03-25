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

        <h4>Voir les commentaires</h4>

       <?php $commentsController-> ?>

        <!--On va chercher la liste des commentaires correspondant au post

            On crée les blocs de commentaires et on les affiche dans la liste :

                for($comments as comment){

                    Créer un nouveau li sur ce modèle :

                    <div>
                        <div>CONCAT $comment_author . ", le " . $comment_date <a UPDATE comment_reported = true>Signaler</a></div>
                        <p>echo $comment_content</p>
                    </div>

                    Et l'afficher dans la liste.

                }-->

        <ul id="commentsList">

        </ul>

    </div>

</article>
