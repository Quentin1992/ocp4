<?php
$title = "Billet simple pour l'Alaska";
$side = "reader";
 ?>

<div id="welcomeMessage"></div>

<header>

    <img src="public/images/alaska.PNG" alt="skylines" />

    <div>
        <h1>Billet simple pour l'Alaska</h1>
        <h2>Le nouveau roman de Jean Forteroche.</h2>
        <p>Découvrez les épisodes au fur et à mesure de son écriture.</p>
    </div>

</header>

<div id="content">

    <aside>

        <div id="upcomingEpisode">
            <h3>Prochain épisode</h3>
            <div></div>
        </div>

        <div id="publishedEpisodes">
            <h3>Episodes publiés</h3>
            <ol></ol>
        </div>

    </aside>

    <article>

        <div id=currentEpisode>
        </div>

        <div id="comments">

            <div>
                <h4>Publier un commentaire</h4>
                <div id="addCommentDiv"></div>
            </div>

            <div>
                <h4>Commentaires</h4>
                <ol id="commentsList"></ol>
            </div>

        </div>

    </article>

</div>
