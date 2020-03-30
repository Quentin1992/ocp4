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
        <?php echo $episodesController->publishedList(); ?>
    </div>

    <div>
        <h3>Episodes en attente</h3>
        <?php echo $episodesController->upcomingEpisodes(); ?>
    </div>

</div>


<div>

    <h2>Commentaires</h2>

    <div>
        <h3>Nouveaux commentaires</h3>
        <?php $commentsController->authorCommentsList("new"); ?>
    </div>

    <div>
        <h3>Commentaires signalés</h3>
        <?php $commentsController->authorCommentsList("reported"); ?>
    </div>

</div>


<div>
    <h2>Rédaction d'un article</h2>
    <!--édition d'un article-->
    <form method="post" action="../controller/authorManager.php">
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
