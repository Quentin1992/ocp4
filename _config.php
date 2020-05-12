<?php
// autoload all classes in model folder
function loadClass($class){
    if(file_exists('model/'.$class.'.php')) {
        include 'model/'.$class.'.php';
    } else if (file_exists('controller/'.$class.'.php')) {
        include 'controller/'.$class.'.php';
    } else {
        include 'core/'.$class.'.php';
    }
}

spl_autoload_register("loadClass");

$host = 'http://'.$_SERVER['HTTP_HOST'].'/';
$root =  $_SERVER['DOCUMENT_ROOT'].'/';

// CONSTANT
define('HOST', $host);
define('ROOT', $root);
define('ASSETS', ROOT."assets/");
define('VIEW', ROOT."view/");
