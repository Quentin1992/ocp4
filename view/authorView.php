<!DOCTYPE html>
<head>
    <meta charset="utf-8" />
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
</head>

<?php
require_once('../controller/EpisodesController.php');
require_once('../controller/CommentsController.php');

$episodesController = new EpisodesController;
$commentsController = new CommentsController;
?>

<!-- listing published and upcoming episodes -->
<div id=episodes>

    <h2>Episodes</h2>

    <div id="publishedEpisodes">

        <h3>Episodes publiés</h3>

        <ol>

        </ol>

    </div>

    <div id="upcomingEpisodes">

        <h3>Episodes en attente</h3>

        <ol>

        </ol>

    </div>

    <div>

        <h3>Travailler sur un épisode</h3>

        <div id="workOnEpisode">

            <!-- <button id="newEpisodeButton">Créer un nouvel épisode</button> -->

        </div>

    </div>

</div>


<!-- listing new and reported comments -->
<div id="comments">

    <h2>Commentaires</h2>

    <div id="newComments">

        <h3>Nouveaux commentaires</h3>

            <ol>

            </ol>

    </div>

    <div id="reportedComments">

        <h3>Commentaires signalés</h3>

            <ol>

            </ol>

    </div>

</div>


<div id="users">

    <h2>Utilisateurs</h2>

    <ol id="usersList">

    </ol>

</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="../public/js/ajax.js"></script>
<script type="text/javascript" src="../public/js/Converter.js"></script>
<script type="text/javascript" src="../public/js/CommentsHandler.js"></script>
<script type="text/javascript" src="../public/js/EpisodesHandler.js"></script>
<script type="text/javascript" src="../public/js/UsersHandler.js"></script>
<script type="text/javascript" src="../public/js/author.js"></script>
