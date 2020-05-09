<?php
session_start();
include_once('_config.php');

$routeur = new Routeur();
$routeur->routeQuery();
