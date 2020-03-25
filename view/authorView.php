<div>

    <h2>Episodes</h2>

    <div>
        <h3>Episodes publiés</h3>
        <?php echo $this->publishedList(); ?>
    </div>

    <div>
        <h3>Episodes en attente</h3>
        <?php $this->upcomingEpisodes(); ?>
    </div>

</div>


<div>

    <h2>Commentaires</h2>

    <div>
        <h3>Nouveaux commentaires</h3>
        <?php $newComments ?>
        <!--$cs = SELECT comment_date, post_id, comment_content FROM comments WHERE comment_checked === false;
            for($cs as comment){

                Créer un li avec

                en-tête :
                <div>
                    echo CONCAT "Le " . comment.comment_date . " par " . comment.comment_author;
                </div>

                contenu :
                <p>SUBSTRING(comment.comment_content, 1, 100)</p>
                Evènement au clic : comment.comment_content en entier et comment_checked = true;

                et bouton de suppression :
                <div>
                    <a>Supprimer le commentaire</a>
                    Evènement au clic : DELETE FROM comments WHERE id ===
                </div>
            }-->
    </div>

    <div>
        <h3>Commentaires signalés</h3>
        <?php $reportedComments ?>
        <ul></ul>
        <!--$cs = SELECT comment_date, post_id, comment_content FROM comments WHERE comment_reported === true;
            for($cs as comment){

                Créer un li avec

                en-tête :
                <div>
                    echo CONCAT "Le " . comment.comment_date . " par " . comment.comment_author;
                </div>

                contenu :
                <p>SUBSTRING(comment.comment_content, 1, 100)</p>
                Evènement au clic : comment.comment_content en entier et comment_checked = true;

                et bouton de suppression :
                <div>
                    <a>Supprimer le commentaire</a>
                    Evènement au clic : DELETE FROM comments WHERE id ===
                </div>
            }-->
    </div>

</div>


<div>
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
