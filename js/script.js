(function (configuration) {
  function redirect() {
    var redirect = configuration.redirects[window.location.hash];
    if (redirect) {
      window.location.href = redirect;
    }
  }

  window.onhashchange = redirect;
  redirect();
})({
  redirects: {
    '#email': 'mailto:usergroup@vilniusjs.lt'
  }
});
