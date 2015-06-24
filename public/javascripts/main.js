


$(document).ready(function() {
    console.log("document ready I guess");
    
    $("#analyze").click(function() {
        console.log("I have clicked the ANalyze button");
        inputValue = $('#inputtext').val().trim();
        console.log("input value is: " + inputValue);
        if (inputValue.length > 0) {
        // initiate an Ajax call to send the data
        console.log("text is: " + inputValue);
        fireAJAX(inputValue);
      }
    });
    
    
function parseData(data) {
    console.log("I am now in Parsedata");
    disableState();
    var html = '';
    
    $("#sentiment-area").html("<h3>Score is: " + data[data.length - 1].sentiment + "</h3><br>");
        
    var myAppendTable = "<table class='table table-bordered table-striped' style='max-width:600px;'>";
    
    // loop through the analyzed tweets
    for (var i = 0; i < data.length - 1; i++) {
      var s = data[i].sentiment,
          t = data[i].tweet,
          w = data[i].words;
        
        console.log("tweet is: " + t);
        
        // add html to main page
        
        myAppendTable += "<tr style='border:2px solid black;'><td style='width:350px;'>" + t 
                        + "</td><td><table style='background:none; width:100%;'><tr style='border-bottom:1px solid black;'><td style='width:80px;'>Score</td><td style='text-align:right;'>" + s 
                        + "</td></tr><tr><td>Words Matched</td><td style='text-align:right;'>" + w 
                        + "</td></tr></table></td></tr>"
    };
        
    myAppendTable += "</table>";
    $('#sentiment-area').append(myAppendTable);
    }

    function fireAJAX(text) {
        console.log("I am in the fireAJAX function");
        console.log("search text is: " + text);
    $.ajax({
      type: 'POST',
      url: '../search',
        //dataType: 'json',
        data: {
        search: text
      },
      beforeSend: function(xhr) {
          console.log("PRINTING OUT BEFORE SEND");
        //$('#sentiment-text').html('');
        //$('.results').show();
        //enableState();
      },
      success: parseData,
      error: oops
    });
  }
  
    
function oops(data) {
    console.log("I am in oops");
    $('.error').show();
    //disableState();
  }
 
  function disableState() {
      console.log("I am in disable state");
    //$('.status').hide();
    //$('#inputtext').prop('disabled', false);
  }
 
  function enableState() {
      console.log("I am in enableState");
    //$('.status').show();
    //$('#inputtext').prop('disabled', true);
  }
    
});

    
