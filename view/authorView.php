<?php
session_start();
?>
<!DOCTYPE html>

<html lang="fr">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Un billet simple pour l'Alaska - Tableau de bord</title>

        <link rel="icon" href="../public/images/ticket.ico" />

        <link rel="stylesheet" href="../public/css/style.css" />
        <link rel="stylesheet" href="../public/css/authorStyle.css" />

        <script src="https://cdn.tiny.cloud/1/v2g0h9wqfo8n3etwh8p7qj0qe1n27c5bwe99wdegs4rq6u1a/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    </head>


    <body>

        <header>

            <img  src="../public/images/alaska.png" alt="skylines" />

            <div id="headerText">
                <h1>Billet simple pour l'Alaska</h1>
                <h2>Tableau de bord</h2>
                <p>Pour publier de nouveaux épisodes, les modifier, gérer les commentaires et les comptes utilisateurs.</p>
                <a href="readerView.php">Retour à la page lecteur.</a>
            </div>

        </header>

        <div id="content">

            <div id="episodes">

                <h3>Episodes</h3>

                <div id="episodesDisplay">

                    <div id="publishedEpisodes">
                        <h4>Episodes publiés</h4>

                        <ol>
                        </ol>
                    </div>

                    <div id="upcomingEpisodes">
                        <h4>Episodes en attente</h4>

                        <ol>
                        </ol>
                    </div>

                </div>

                <div id="workOnEpisode">
                    <h4>Travailler sur un épisode</h4>

                    <div>
                    </div>
                </div>

            </div>


            <div id="comments">

                <h3>Commentaires</h3>

                <div id="commentsDisplay">

                    <div id="newComments">
                        <h4>Nouveaux commentaires</h4>

                        <ol>
                        </ol>
                    </div>

                    <div id="reportedComments">
                        <h4>Commentaires signalés</h4>

                        <ol>
                        </ol>
                    </div>

                </div>

            </div>


            <div id="users">

                <h3>Utilisateurs</h3>

                <div id="usersDisplay">

                    <div id="validatedUsers">
                        <h4>Utilisateurs vérifiés</h4>

                        <ol>
                        </ol>
                    </div>

                    <div id="newUsers">
                        <h4>Nouveaux utilisateurs</h4>

                        <ol>
                        </ol>
                    </div>

                </div>

                <div id="createUser">
                    <h4>Créer ou modifier un profil utilisateur</h4>

                    <div>
                    </div>
                </div>

            </div>

        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <script src="../public/js/ajax.js"></script>

        <script src="../public/js/Converter.js"></script>
        <script src="../public/js/CommentsHandler.js"></script>
        <script src="../public/js/EpisodesHandler.js"></script>
        <script src="../public/js/UsersHandler.js"></script>

        <script src="../public/js/author.js"></script>

    </body>

</html>
