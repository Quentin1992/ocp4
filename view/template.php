<!DOCTYPE html>

<html lang="fr">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?= $title ?></title>

    <link rel="icon" href="public/images/ticket.ico" />

    <link rel="stylesheet" href="public/css/style.css" />
    <link rel="stylesheet" media="screen and (max-width: 426px)" href="public/css/style-smartphone.css">
    <link rel="stylesheet" media="screen and (max-width: 768px)" href="public/css/style-tablet.css">
    <link rel="stylesheet" media="screen and (max-width: 1024px)" href="public/css/style-small.css">
    <link rel="stylesheet" media="screen and (max-width: 1440px)" href="public/css/style-medium.css">

    <link rel="stylesheet" href="public/css/<?= $side ?>Style.css" />
    <link rel="stylesheet" media="screen and (max-width: 1440px)" href="public/css/<?= $side ?>Style-medium.css">
    <link rel="stylesheet" media="screen and (max-width: 1024px)" href="public/css/<?= $side ?>Style-small.css">
    <link rel="stylesheet" media="screen and (max-width: 768px)" href="public/css/<?= $side ?>Style-tablet.css">
    <link rel="stylesheet" media="screen and (max-width: 426px)" href="public/css/<?= $side ?>Style-smartphone.css">

    <?php if($side == "author"){ ?>
    <script src="https://cdn.tiny.cloud/1/v2g0h9wqfo8n3etwh8p7qj0qe1n27c5bwe99wdegs4rq6u1a/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <?php } ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <script type="text/javascript" src="public/js/ajax.js"></script>
    <script type="text/javascript" src="public/js/Converter.js"></script>
    <script type="text/javascript" src="public/js/UsersHandler.js"></script>
    <script type="text/javascript" src="public/js/EpisodesHandler.js"></script>
    <script type="text/javascript" src="public/js/CommentsHandler.js"></script>
    <script type="text/javascript" src="public/js/<?= $side ?>.js"></script>
</head>


<body>
    <?= $content ?>
</body>

</html>
