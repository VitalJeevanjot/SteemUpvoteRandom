var author_all = [];
var permlink_all = [];
var rand;
var global_val = 50;
$(document).ready(function() {
  $('.modal').modal({
    dismissible: false
  });
  console.log(localStorage.getItem("voter") + "__" + localStorage.getItem("pass"));
  check_sign_in();

  //console.log("Hello");

  steem.api.getDiscussionsByCreated({
    "limit": 100
  }, function(err, result) {
    for (var i = 0; i < result.length; i++) {
      author_all[i] = result[i].author;
      permlink_all[i] = result[i].permlink;
    }
  });



});


function check_sign_in() {
  if (localStorage.getItem("voter") === null || localStorage.getItem("pass") === null || localStorage.getItem("voter") === "" || localStorage.getItem("pass") === "") {
    $('.modal').modal('open');
  }

  if (localStorage.getItem("voter") !== null || localStorage.getItem("voter") !== "") {
    steem.api.getAccountVotes((localStorage.getItem("voter")), function(err, result) {
      var p_no;
      $('ul').empty();
      for (var i = 0; i < result.length; i++) {
        p_no = i + 1;
        $('ul').append("<li class='collection-item'><p>" + p_no + ".</p><a href='http://steemit.com/@" + result[i].authorperm + "'>" + result[i].authorperm + "</a><p><p>Percent:" + result[i].percent + "</p><p>Weight:" + result[i].weight + "</p></li>");
      }
      if (result == "" || err != null) {
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
      if (result == "" || err != null) {
        $('.modal').modal('open');
      }
    });
  }

  console.log(localStorage.getItem("voter") + "__" + localStorage.getItem("pass"));
}

function reSignin() {
  $('.modal').modal('open');
}


function weight(val) {
  global_val = val;

}

function upvote() {

  rand = Math.floor(Math.random() * (99 - 1 + 1) + 1);
  // Still have to implement the function that if already a vote done over index on array or permlink....

  var activeWif = steem.auth.toWif(localStorage.getItem("voter"), localStorage.getItem("pass"), 'posting');


  steem.broadcast.vote(activeWif, localStorage.getItem("voter"), author_all[rand], permlink_all[rand], global_val * 100, function(err, result) {
    console.log(author_all[rand] + "--" + permlink_all[rand]);
    if (!err) {
      M.toast({
        html: 'Done, You are so kind for new Posts!'
      })
    }
    if (err) {
      M.toast({
        html: err
      })
    }

  });

}
