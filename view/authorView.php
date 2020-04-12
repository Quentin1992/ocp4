<?php
require_once('../controller/EpisodesController.php');
require_once('../controller/CommentsController.php');

$episodesController = new EpisodesController;
$commentsController = new CommentsController;
?>

<!-- listing published and upcoming episodes -->
<div id=episodes>

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
                foreach($publishedEpisodes as $publishedEpisode){
                    $date = date_create($publishedEpisode->publicationDate());?>
                <li>
                    <a class="episodeLink" href="#" data-episode-number="<?php echo $publishedEpisode->number() ?>"> <?php echo $publishedEpisode->number() . ' : ' . $publishedEpisode->title() . ', le ' . date_format($date, 'd/m/Y') . ' à ' . date_format($date, 'H\hi'); ?></a>
                    <button class="deleteEpisodeButton" data-episode-id="<?php echo $publishedEpisode->id() ?>">Supprimer l'épisode</button>
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
                    <a class="episodeLink" href="#" data-episode-number="<?php echo $upcomingEpisode->number() ?>"> <?php echo $upcomingEpisode->number() . ' : ' . $upcomingEpisode->title() . ', le ' . $upcomingEpisode->publicationDate(); ?></a>
                    <button class="deleteEpisodeButton" data-episode-id="<?php echo $upcomingEpisode->id() ?>">Supprimer l'épisode</button>
                </li>
            <?php }
            } ?>
        </ol>
    </div>

    <button id="newEpisodeButton">Créer un nouvel épisode</button>

</div>


<!-- listing new and reported comments -->
<div>

    <h2>Commentaires</h2>

    <div>
        <h3>Nouveaux commentaires</h3>
        <?php $comments = $commentsController->authorCommentsList("new");

        if(empty($comments)){ ?>
            <p>Aucun commentaire à afficher.</p>
        <?php }else{ ?>
            <ol>
                <?php foreach($comments as $comment){

                    $date = date_create($comment->creationDate());?>

                    <li>
                        <div>
                            <?php echo $comment->author() ?> le <?php echo date_format($date, 'd/m/Y') ?> à <?php echo date_format($date, 'H\hi') ?>
                        </div>

                        <p><?php echo $comment->content() ?></p>

                        <div>
                            <button class="validateCommentButton" data-comment-id="<?php echo $comment->id() ?>">
                                Valider
                            </button>
                            <button class="deleteCommentButton" data-comment-id="<?php echo $comment->id() ?>">
                                Supprimer
                            </button>
                        </div>
                    </li>
                <?php }
                } ?>
            </ol>
    </div>

    <div>
        <h3>Commentaires signalés</h3>
        <?php $comments = $commentsController->authorCommentsList("reported");

        if(empty($comments)){ ?>
            <p>Aucun commentaire à afficher.</p>
        <?php }else{ ?>
            <ol>
                <?php foreach($comments as $comment){

                    $date = date_create($comment->creationDate());?>

                    <li>
                        <div>
                            <?php echo $comment->author() ?> le <?php echo date_format($date, 'd/m/Y') ?> à <?php echo date_format($date, 'H\hi') ?>
                        </div>

                        <p><?php echo $comment->content() ?></p>

                        <div>
                            <button class="validateCommentButton" data-comment-id="<?php echo $comment->id() ?>">
                                Valider
                            </button>
                            <button class="deleteCommentButton" data-comment-id="<?php echo $comment->id() ?>">
                                Supprimer
                            </button>
                        </div>
                    </li>
                <?php }
                } ?>
            </ol>
    </div>
</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="../public/js/ajax.js"></script>
<script type="text/javascript" src="../public/js/author.js"></script>
