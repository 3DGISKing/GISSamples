<?php

$json = $_POST["jsonstring"];
$fp = fopen('./../input.json', 'w');
fwrite($fp, $json);
fclose($fp);
