<?php
class View
{
    // view title (defined in view file)
    protected $title;
    protected $side;

    // render function allows view display -> called in each controller
    public function render($view, $params = null) {
        if($params) {
            foreach ($params as $name => $value) {
                ${$name} = $value;
            }
        }
        if(!isset($title)) $title = $view;
        ob_start();
        include_once(VIEW . $view . '.php');
        $content = ob_get_clean();
        include_once(VIEW . 'template.php');
    }
}
