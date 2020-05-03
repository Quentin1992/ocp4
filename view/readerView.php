<?php
session_start();
?>
<!DOCTYPE html>

<html>

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Un billet simple pour l'Alaska</title>

        <link rel="icon" href="../public/images/ticket.ico" />

        <link rel="stylesheet" href="../public/css/style.css" />
        <link rel="stylesheet" href="../public/css/readerStyle.css" />
    </head>

    <body>

        <div id="welcomeMessage"></div>

        <header>

            <img src="../public/images/alaska.png" alt="skylines" />

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

                    <p></p>

                </div>

                <div id="publishedEpisodes">

                    <h3>Episodes publiés</h3>

                    <ol>

                    </ol>

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

                        <ol id="commentsList">

                        </ol>

                    </div>

                </div>

            </article>

        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script type="text/javascript" src="../public/js/ajax.js"></script>
        <script type="text/javascript" src="../public/js/Converter.js"></script>
        <script type="text/javascript" src="../public/js/UsersHandler.js"></script>
        <script type="text/javascript" src="../public/js/EpisodesHandler.js"></script>
        <script type="text/javascript" src="../public/js/CommentsHandler.js"></script>
        <script type="text/javascript" src="../public/js/reader.js"></script>

    </body>

</html>
