<?php
require './libs/Slim/Slim.php';
require_once 'dbHelper.php';
require_once 'session.php';
require_once 'passwordHash.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

require_once 'authentication.php';
/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/

// настройки сайта
$app->get('/site-settings', function() {
    global $db;
    $rows['settings'] = $db->select("site_settings",'*',array(),"ORDER BY id");
    $rows['customersRoles'] = $db->select("customers_roles",'*',array(),"ORDER BY id");
    echoResponse(200, $rows);

});

//$app->get('/site-settings', function() {
//    global $db;
//    $rows = $db->select("site_settings",'*',array(),"ORDER BY id");
//    echoResponse(200, $rows);
//
//});


$app->post('/select', function() use ($app){
    $data = json_decode($app->request->getBody());
    $table = $data->table;
    $searchQueryArray = isset($data->search) ? $data->search : array();
    $rows = isset($data->rows) ? $data->rows : '*';
    global $db;
    $rows = $db->select($table, $rows, $searchQueryArray);
    echoResponse(200, $rows);
});

$app->post('/user-data', function() use ($app){
    $data = json_decode($app->request->getBody());
    global $db;
    $rows = $db->select("customers_auth", 'uid,name, email, phone, address, city, created, role, active', $data);
    echoResponse(200, $rows);
});



$app->post('/vx-update-data/:tableName/:searchBy/:id', function($tableName, $searchRow, $id) use ($app){
    $data = json_decode($app->request->getBody());
    $condition = array($searchRow=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update($tableName, $data, $condition, $mandatory);
    echoResponse(200, $rows);
});

$app->put('/products/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("products", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Продукт обновлен!";
    echoResponse(200, $rows);
});

$app->delete('/products/:id', function($id) { 
    global $db;
    $rows = $db->delete("products", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});

$app->get('/session', function() {
    $session = getSession();
    echoResponse(200, $session);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}
$app->run();
?>