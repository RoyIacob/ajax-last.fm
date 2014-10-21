var scrobbleTemplateFunction = Handlebars.compile($("#scrobble_template").html());

var ajax_scrobble = function() {
    $('#ajaxResponse').html("loading");
    var user = $("#search-bar").val().trim();
    if (user.indexOf(" ") != -1) {
        $('#ajaxResponse').html("No results found (no space in username)");
        return;
    }

    return $.ajax({
        url: 'main.php',
        type: 'GET',
        data: {
            searchTerm: encodeURIComponent(user)
        },
        success: function(html) {
            var scrobble_html = "";
            var scrobble_json = jQuery.parseJSON( html );
            if (scrobble_json['error'] == null && scrobble_json['topartists']['artist'] != null ) {
                var artists = scrobble_json['topartists']['artist'];
                for (var i = 0; i < artists.length; i++) {
                    var scrobble = {
                        "index": (i+1),
                        "artist": artists[i]['name'],
                        "play_count": artists[i]['playcount']
                    }
                    scrobble_html += scrobbleTemplateFunction(scrobble);
                }
            } else {
                scrobble_html += "No results found";
            }
            $('#ajaxResponse').html(scrobble_html);
        }
    });
};

$("form").on('submit', function(e) {
    e.preventDefault(); //so it doesn't refresh the page
    var searchTerm = $('#search-bar').val();
    console.log("result: " + searchTerm);
    ajax_scrobble();
});

var ajaxReq = null;
$("form").keyup($.debounce(350, function(e){
    e.preventDefault(); //so it doesn't refresh the page
    searchword = $("#search-bar").val();
    var code = (e.keyCode || e.which);
    if(code == 37 || code == 38 || code == 39 || code == 40) { //ignore arrows
        return;
    }

    if((searchword.length) > 3) {
        if (ajaxReq != null) ajaxReq.abort();
        var ajaxReq = ajax_scrobble();
    } else {
        $('#ajaxResponse').html("Examples: alphachino, john, jack");
    }
}));
