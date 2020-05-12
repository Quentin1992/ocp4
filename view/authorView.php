<?php
$title = "Tableau de bord - Billet simple pour l'Alaska";
$side = "author";
 ?>

<header>
    <img  src="public/images/alaska.PNG" alt="skylines" />

    <div id="headerText">
        <h1>Billet simple pour l'Alaska</h1>
            <h2>Tableau de bord</h2>
            <p>Pour publier de nouveaux épisodes, les modifier, gérer les commentaires et les comptes utilisateurs.</p>
            <a href="index.php">Retour à la page lecteur.</a>
    </div>
</header>

<div id="content">

    <div id="episodes">
        <h3>Episodes</h3>

        <div id="episodesDisplay">

            <div id="publishedEpisodes">
                <h4>Episodes publiés</h4>
                <ol></ol>
            </div>

            <div id="upcomingEpisodes">
                <h4>Episodes en attente</h4>
                <ol></ol>
            </div>

        </div>

        <div id="workOnEpisode">
            <h4>Travailler sur un épisode</h4>
            <div></div>
        </div>
    </div>

    <div id="comments">
        <h3>Commentaires</h3>

        <div id="commentsDisplay">

            <div id="newComments">
                <h4>Nouveaux commentaires</h4>
                <ol></ol>
            </div>

            <div id="reportedComments">
                <h4>Commentaires signalés</h4>
                <ol></ol>
            </div>

        </div>
    </div>

    <div id="users">
        <h3>Utilisateurs</h3>

        <div id="usersDisplay">

            <div id="validatedUsers">
                <h4>Utilisateurs vérifiés</h4>
                <ol></ol>
            </div>

            <div id="newUsers">
                <h4>Nouveaux utilisateurs</h4>
                <ol></ol>
            </div>

        </div>

        <div id="createUser">
            <h4>Créer ou modifier un profil utilisateur</h4>
            <div></div>
        </div>
    </div>

</div>
