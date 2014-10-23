<?php
    $search_term = $_GET['searchTerm'];
    $url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=". $search_term . "&api_key=d03757b94f2a74e1a115a3ddae1babaa&format=json";
    echo file_get_contents($url);
?>
