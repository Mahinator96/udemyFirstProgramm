<?php
// Декодирование из JSON т.к. PHP с ним не работает
$_POST = json_encode(file_get_contents("php://input"), true);
echo var_dump($_POST);