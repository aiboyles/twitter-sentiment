$(document).ready(function() {

    $("#analyze").click(function() {
        var inputValue = $('#inputtext').val().trim();
        if (inputValue.length > 0) {
            // initiate an Ajax call to send the data
            fireAJAX(inputValue);
      }
    });
    
// parse the data returned from the twitter search and
// format it into a table to add to the page
    function parseData(data) {
        disableState();
        var html = '';
        $("#sentiment-area").html("<h3>Score is: " + data[data.length - 1].sentiment + "</h3><br>");
        var myAppendTable = "<table class='table table-bordered table-striped' style='max-width:600px;'>";
    
        // loop through the analyzed tweets
        for (var i = 0; i < data.length - 1; i++) {
            var s = data[i].sentiment,
                t = data[i].tweet,
                w = data[i].words;
        
                // add html table to main page
                myAppendTable += "<tr style='border:2px solid black;'><td style='width:350px;'>" + t 
                        + "</td><td><table style='background:none; width:100%;'><tr style='border-bottom:1px solid black;'>"
                        + "<td style='width:80px;'>Score</td><td style='text-align:right;'>" + s 
                        + "</td></tr><tr><td>Words Matched</td><td style='text-align:right;'>" + w 
                        + "</td></tr></table></td></tr>";
        };
        
        myAppendTable += "</table>";
        $('#sentiment-area').append(myAppendTable);
    }

    // sends an AJAX call to the search route
    function fireAJAX(text) {
        $.ajax({
            type: 'POST',
            url: '../search',
            data: {
                search: text
            },
            beforeSend: function(xhr) {
                enableState();
            },
            success: parseData,
            error: oops
        });
    }
  
    function oops(data) {
        $('.error').show();
        disableState();
    }
 
    function disableState() {
        $('#inputtext').prop('disabled', false);
        $('#analyze').prop('disabled', false);
    }
 
    function enableState() {
        $('#inputtext').prop('disabled', true);
        $('#analyze').prop('disabled', true);
    }
    
});

    
