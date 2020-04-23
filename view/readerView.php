<?php session_start();
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

    <h1>Billet simple pour l'Alaska</h1>
    <p>Découvrez les épisodes du nouveau roman de Jean Forteroche au fur et à mesure de son écriture.</p>

    <p id="welcomeMessage"></p>


</header>


<aside>

    <div id="upcomingEpisode">

        <h2>Prochain épisode</h2>

    </div>


    <div id="publishedEpisodes">

        <h2>Episodes publiés</h2>

        <ol>

        </ol>

    </div>

</aside>


<article>

    <div id=currentEpisode>

    </div>

    <div id="comments">

        <div id="addCommentDiv">

        </div>

        <div>

            <h4>Commentaires</h4>

            <ol id="commentsList">

            </ol>

        </div>

    </div>

</article>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="../public/js/ajax.js"></script>
<script type="text/javascript" src="../public/js/Converter.js"></script>
<script type="text/javascript" src="../public/js/UsersHandler.js"></script>
<script type="text/javascript" src="../public/js/EpisodesHandler.js"></script>
<script type="text/javascript" src="../public/js/CommentsHandler.js"></script>
<script type="text/javascript" src="../public/js/reader.js"></script>
