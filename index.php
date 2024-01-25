<?php
require 'vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'controller/LoginController.php';
require_once 'controller/EmailController.php';
require_once 'controller/NotificationController.php';
require_once 'controller/DataController.php';
require_once 'controller/HistoryController.php';
require_once 'controller/ErrorController.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

define ('base_url', $_ENV['WEBSITE_URL']);

$olduri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Remove testmvc from the URI
$uri = str_replace('/klinik-reservation', '', $olduri);

$routes = require 'routes.php';

$found = false;

foreach ($routes as $route => $action) {
    // Replace route parameters with regex
    $route = str_replace('/', '\/', $route);
    $route = preg_replace('/\{num\}/', '(\d+)', $route); // Matches numbers
    $route = preg_replace('/\{str\}/', '([a-zA-Z]+)', $route); // Matches strings

    // If the request matches the route
    if (preg_match("#^$route$#", $uri, $matches)) {
        // Remove the full match from the matches
        array_shift($matches);

        // Split the controller and method
        list($controller, $method) = explode('@', $action);

        // Instantiate the controller and call the method with the matches as parameters
        $controller = new $controller();
        call_user_func_array([$controller, $method], $matches);

        $found = true;
        break;
    }
}

if (!$found) {
    header("HTTP/1.0 404 Not Found");
    $controller = new ErrorController();
    $controller->index();
}