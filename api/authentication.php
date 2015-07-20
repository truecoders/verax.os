<?php
$app->post('/login', function() use ($app) {
    global $db;
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    $db->verifyRequiredParams($r->customer,array('email', 'password'));
    $response = array();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $qu = $db->select("customers_auth", "*", array("email" => $email));
    $user = $qu['data'][0];
    $response['u'] = $user;
    if ($user['uid']) {
        $response['u'] = $user['uid'];
        $response['p'] = $user->uid;
        if(passwordHash::check_password($user['password'],$password)){
            $response['status'] = "success";
            $response['message'] = 'Удачная авторизация.';
            $response['name'] = $user['name'];
            $response['uid'] = $user['uid'];
            $response['email'] = $user['email'];
            $response['phone'] = $user['phone'];
            $response['address'] = $user['address'];
            $response['city'] = $user['city'];
            $response['createdAt'] = $user['created'];
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $user['uid'];
            $_SESSION['email'] = $email;
            $_SESSION['name'] = $user['name'];
            $_SESSION['role'] = $user['role'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Войти не удалось. Неверные данные.';
        }
    }else {
        $response['status'] = "error";
        $response['message'] = 'Нет такого пользователя';
    }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    global $db;
    $response = array();
    $r = json_decode($app->request->getBody());
    require_once 'passwordHash.php';
    $phone = $r->customer->phone;
    $name = $r->customer->name;
    $email = $r->customer->email;
    $address = $r->customer->address;
    $password = $r->customer->password;
    unset($r->customer->password2);
    $isUserExists = $db->select("customers_auth", "uid", array("email" => $email));
    if($isUserExists['status'] == 'warning'){
        $r->customer->password = passwordHash::hash($password);
        $result = $db->insert("customers_auth", $r->customer, array('email', 'password'));
        if ($result['data']) {
            $response["status"] = "success";
            $response["message"] = "Вы успешно зарегистрировались!";
            $response["uid"] = $result['data'];
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['phone'] = $phone;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['role'] = 1;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Не удалось зарегистрировать Вас. Повторите позже. Спасибо.";
            echoResponse(201, $response);
        }
    }else{
        $response["status"] = "error";
        $response["message"] = "Пользователь с таким email уже зарегистрирован.";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function() {
    $session = destroySession();
    $response["status"] = "success";
    $response["message"] = "Вы успешно вышли!";
    echoResponse(200, $response);
});
?>