<?php
    $url_array = explode('/', $_SERVER['REQUEST_URI']);
    $search_term = $url_array[2];
    if (strlen($search_term) == 0) {
        $search_term = $_GET['searchTerm'];
    }
    $url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=". $search_term . "&api_key=d03757b94f2a74e1a115a3ddae1babaa&format=json";
    echo file_get_contents($url);
?>