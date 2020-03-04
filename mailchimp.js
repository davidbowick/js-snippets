/*  Really only if mailchimp which is kind of rare these days but keeping for now
 * Mailchimp AJAX form submit VanillaJS
 * Vanilla JS
 * Author: Michiel Vandewalle
 * Github author: https://github.com/michiel-vandewalle
 * Github project: https://github.com/michiel-vandewalle/Mailchimp-AJAX-form-submit-vanillaJS
 */
(function() {
  var successMessage = 'Thanks for subscribing!';
  var errorMessage = 'Please enter a valid email';
  var forms = document.querySelectorAll('form.mailchimp-form');
  forms.forEach(function(form) {
    var response = form.querySelector('.mailchimp-response');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      response.classList.remove('success', 'error'); // Check for spam

      if (this.querySelector('.mailchimp-validate').value !== '') {
        return false;
      } // Get url for mailchimp


      var url = this.action.replace('/post?', '/post-json?');
      url = url + '&c=callback'; // Add form data to object

      var data = '';
      var inputs = this.querySelectorAll('.mailchimp-form input');

      for (var i = 0; i < inputs.length; i++) {
        data += '&' + inputs[i].name + '=' + encodeURIComponent(inputs[i].value);
      }

      var form = this; // Create & add post script to the DOM

      var script = document.createElement('script');
      script.src = url + data;
      document.body.appendChild(script); // Callback function

      var callback = 'callback';

      window[callback] = function(data) {
        // Remove post script from the DOM
        delete window[callback];
        document.body.removeChild(script); // Display response message

        var res = data.result;

        if (res == 'error') {
          response.innerHTML = errorMessage;
        } else {
          response.innerHTML = successMessage;
        } // response.innerHTML = data.msg;


        response.classList.add(res);
      };
    });
  });
})();
