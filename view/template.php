<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title><?= $title ?></title>
    <link href="style.css" rel="stylesheet" />
</head>

<body>
    <?= $content ?>
    <?php echo $comments[1]->author(); ?>    
</body>

</html>
