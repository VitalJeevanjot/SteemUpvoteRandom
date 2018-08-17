$(document).ready(function() {
  $('select').formSelect();
  //console.log("Hello");
  localStorage.setItem("voter", "jeevanjot");

  if (localStorage.getItem("voter") !== null) {
    steem.api.getAccountVotes((localStorage.getItem("voter")), function(err, result) {
      var p_no;
      for (i = 0; i < result.length; i++) {
        p_no = i+1;
        $('ul').append("<li class='collection-item'><p>"+ p_no +".</p><a href='http://steemit.com/@" + result[i].authorperm + "'>" + result[i].authorperm + "</a><p><p>Percent:" + result[i].percent + "</p><p>Weight:" + result[i].weight + "</p></li>");
      }
    });
  }
});
