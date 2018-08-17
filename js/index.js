$(document).ready(function() {
  $('select').formSelect();
  //console.log("Hello");
  localStorage.setItem("voter", "genievot");
//If localstorage name and password is not null.{
  steem.api.getAccountVotes((localStorage.getItem("voter")), function(err, result) {
    console.log(err, result);
  });
  //}
});
