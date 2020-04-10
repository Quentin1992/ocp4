<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);

$path = $root . '/ocp4/controller/EpisodesController.php';
require_once($path);
$episodesController = new EpisodesController;

$path = $root . '/ocp4/controller/CommentsController.php';
require_once($path);
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

        <p>Prochain épisode : <?php echo $upcomingEpisode->number() ?> - <span><?php echo $upcomingEpisode->title() ?></span>, le <?php echo $upcomingEpisode->publicationDate() ?></p>

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
                <a class="episodeLink" href="#" data-episode-number="<?php echo $publishedEpisode->number() ?>"> <?php echo $publishedEpisode->number() . ' : ' . $publishedEpisode->title(); ?> </a>
            </li>
        <?php }
        } ?>
    </ol>

</aside>


<article>

    <?php $fullLastEpisode = $episodesController->fullLastEpisode(); ?>
    <h2><?php echo $fullLastEpisode->number() ?> - <?php echo $fullLastEpisode->title() ?></h2>
    <p><?php echo $fullLastEpisode->content() ?></p>

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

                        <form class="reportForm" method="post" action="#">
                            <input hidden type="number" name="commentId" value="<?php echo $comment->id() ?>">
                            <input type="submit" value="Signaler">
                        </form>

                    </li>

            <?php } ?>
        </ol>

    </div>

</article>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="../public/js/ajax.js"></script>
<script type="text/javascript" src="../public/js/reader.js"></script>
