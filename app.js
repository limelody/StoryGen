    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();

    async function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      var url_list = '';
      for (var i = 0; i < evt.target.files.length; i++) {
        var img = $('img')[i];
        img.src = URL.createObjectURL(this.files[i]);
        var file = evt.target.files[i];
        var metadata = {
          'contentType': file.type
        };

        var snapshot = await storageRef.child('images/' + file.name).put(file, metadata);
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log('File metadata:', snapshot.metadata);
        // Let's get a download URL for the file.
        var url = await snapshot.ref.getDownloadURL();
        console.log('File available at', url);
        url_list += '<li><a href="' + url + '">' + file.name + '</a></li>';
        console.log(url_list);
      }
      $('#messagesDiv > div.list-urls').html(url_list); 
    }

    window.addEventListener('load', function() {
      document.getElementById('file').addEventListener('change', handleFileSelect, false);
      document.getElementById('file').disabled = true;

      auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log('Anonymous user signed-in.', user);
          document.getElementById('file').disabled = false;
        } else {
          console.log('There was no anonymous session. Creating a new anonymous user.');
          // Sign the user in anonymously since accessing Storage requires the user to be authorized.
          auth.signInAnonymously().catch(function(error) {
            if (error.code === 'auth/operation-not-allowed') {
              window.alert('Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
                  'sign-in on your Firebase project.');
            }
          });
        }
      });
    });
      