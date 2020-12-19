<?php

    $config = parse_ini_file("config.ini", true);

    $cookie_name = "WFSServiceURL";
    $cookie_value = $config['EdfSysConfig']['WFSServiceURL'];

    setcookie($cookie_name, $cookie_value, time() + (60 * 10), "/"); // 10 min