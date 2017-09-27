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
    '#newsletter': 'http://us16.campaign-archive1.com/home/?u=e28fb96898cdc44a1454748d7&id=7bdc1913da'
  }
});
