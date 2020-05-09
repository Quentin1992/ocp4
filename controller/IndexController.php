<?php

class IndexController {

    public function index(){
        $view = new View();
        $view->render('readerView');
    }

    public function authorView(){
        $view = new View();
        $view->render('authorView');
    }
}
