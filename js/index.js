$(document).ready(function() {
  $('select').formSelect();
  $('.modal').modal({
    dismissible: false
  });
  console.log(localStorage.getItem("voter") + "__" + localStorage.getItem("pass"));
  check_sign_in();

  //console.log("Hello");



});

function check_sign_in() {
  if (localStorage.getItem("voter") === null || localStorage.getItem("pass") === null || localStorage.getItem("voter") === "" || localStorage.getItem("pass") === "") {
    $('.modal').modal('open');
  }

  if (localStorage.getItem("voter") !== null || localStorage.getItem("voter") !== "") {
    steem.api.getAccountVotes((localStorage.getItem("voter")), function(err, result) {
      var p_no;
      $('ul').empty();
      for (i = 0; i < result.length; i++) {
        p_no = i + 1;
        $('ul').append("<li class='collection-item'><p>" + p_no + ".</p><a href='http://steemit.com/@" + result[i].authorperm + "'>" + result[i].authorperm + "</a><p><p>Percent:" + result[i].percent + "</p><p>Weight:" + result[i].weight + "</p></li>");
      }
      if(result == "" || err != null)
      {
          $('.modal').modal('open');
      }
    });
  }
}

function sign_in() {
  localStorage.setItem("voter", $('#user_name').val());
  localStorage.setItem("pass", $('#password').val());

  if (localStorage.getItem("voter") !== null || localStorage.getItem("voter") !== "") {
    steem.api.getAccountVotes((localStorage.getItem("voter")), function(err, result) {
      var p_no;
        $('ul').empty();
      for (i = 0; i < result.length; i++) {
        p_no = i + 1;
        $('ul').append("<li class='collection-item'><p>" + p_no + ".</p><a href='http://steemit.com/@" + result[i].authorperm + "'>" + result[i].authorperm + "</a><p><p>Percent:" + result[i].percent + "</p><p>Weight:" + result[i].weight + "</p></li>");
      }
      if(result == "" || err != null)
      {
          $('.modal').modal('open');
      }
    });
  }

  console.log(localStorage.getItem("voter") + "__" + localStorage.getItem("pass"));
}

function reSignin() {
  $('.modal').modal('open');
}
