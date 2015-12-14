var CLIENT_ID = '897817624771-ck0lm7r96noop3piiokv60j4rdj6c6vr.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

      var sHTML;

      var num=0;


     

      function refreshPreview(){
        var preview = document.getElementById("preview");
          sHTML = $('#summernote').code();
          preview.innerHTML = sHTML;
      }

    setInterval('refreshPreview()',500);
    
      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
       // var authorizeDiv = document.getElementById('authorize-div');

        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          //authorizeDiv.style.display = 'none';
          loadCalendarApi();

        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          //authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              console.log(when);
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary,when)
            }
          } else {
            appendPre('No upcoming events found.');
          }

        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */

    function appendPre(message, date) {
      var myDate = new Date(date);
      var ul = document.getElementById("listEvents");
      var li = document.createElement('tr');
      var colCheck = document.createElement("td");
      var colText = document.createElement("td");
      var colDate = document.createElement("td");
      var colTime = document.createElement("td");
      var colPlace = document.createElement("td");
      var input = document.createElement("input");

      //li.setAttribute('class', 'row');
      li.setAttribute('id', "numList-" + num);

      input.setAttribute("type", "checkbox");
      input.setAttribute("value", "");
      input.setAttribute("label", "Hola");
      input.setAttribute("id", "numCheck-"+num);

      //colCheck.setAttribute("class","col-sm-1");
      colCheck.setAttribute("align","center");
      //colText.setAttribute("class","col-sm-7");
      //colDate.setAttribute("class","col-sm-1");
      //colTime.setAttribute("class","col-sm-1");
      //colPlace.setAttribute("class","col-sm-2");

      colText.innerHTML = message;
      colDate.innerHTML = myDate.getDate()+"/"+(myDate.getMonth()+1)+"/"+myDate.getFullYear();
      colTime.innerHTML = myDate.getHours()+":"+myDate.getMinutes();
      colPlace.innerHTML = "null";

      colCheck.appendChild(input);
      li.appendChild(colCheck);
      li.appendChild(colText);
      li.appendChild(colDate);
      li.appendChild(colTime);
      li.appendChild(colPlace);
      ul.appendChild(li);

      num++;
      $("#numEvents").text(num);

      }

      function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      }

      function signOut(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });
      }

   
