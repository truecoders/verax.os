<?php
function getSession(){
    if (!isset($_SESSION)) {
        session_start();
    }
    $sess = array();
    if(isset($_SESSION['uid']))
    {
        $sess["uid"] = $_SESSION['uid'];
        $sess["name"] = $_SESSION['name'];
        $sess["email"] = $_SESSION['email'];
        $sess["phone"] = $_SESSION['phone'];
        $sess["role"] = $_SESSION['role'];
    }
    else
    {
        $sess["uid"] = '';
        $sess["name"] = 'Гость';
        $sess["email"] = '';
    }
    return $sess;
};
function destroySession(){
    if (!isset($_SESSION)) {
        session_start();
    }
    if(isSet($_SESSION['uid']))
    {
        unset($_SESSION['uid']);
        unset($_SESSION['name']);
        unset($_SESSION['email']);
        unset($_SESSION['phone']);
        unset($_SESSION['role']);
        $info='info';
        if(isSet($_COOKIE[$info]))
        {
            setcookie ($info, '', time() - $cookie_time);
        }
        $msg="Не прощаемся?";
    }
    else
    {
        $msg = "Не авторизованы...";
    }
    return $msg;
}

?>