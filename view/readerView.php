<?php
require_once('../controller/EpisodesController.php');
$episodesController = new EpisodesController;

require_once('../controller/CommentsController.php');
$commentsController = new CommentsController;

 ?>

 <head>
     <link rel="stylesheet" type="text/css" href="../public/css/style.css">
 </head>

<header>

    <h1>Nouveau roman de Jean Forteroche</h1>
    <!--<img>-->
    <p>Découvrez les épisodes du nouveau roman de Jean Forteroche au fur et à mesure de son écriture.</p>

    <a href="../loginView.php">Se connecter en tant qu'auteur</a>

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

        <form id="commentForm" method="post" action="#">
            <input hidden type="number" name="episodeId" value="<?php echo $fullLastEpisode->id() ?>" >
            <input type="text" name="author" required>
            <textarea name="content" required></textarea>
            <input type="submit" value="Envoyer mon commentaire">
        </form>

        <h4>Commentaires</h4>

        <?php
        $episodeNumber = $episodesController->lastEpisodeNumber();
        $comments = $commentsController->episodeCommentsList($episodeNumber, 10);
        ?>

        <ol id="commentsList">
            <?php foreach($comments as $comment){ ?>
                    <li>
                        <div>
                            <?php echo $comment->author() ?>, le <?php echo $comment->creationDate() ?>
                        </div>

                        <p><?php echo $comment->content() ?></p>

                        <button id="reportButton">Signaler</button>
                        <!-- utiliser info par formulaire et input caché ? -->

                    </li>

            <?php } ?>
        </ol>

    </div>

</article>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="../public/js/ajax.js"></script>
<script type="text/javascript" src="../public/js/form.js"></script>
