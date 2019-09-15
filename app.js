
    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();

    function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      // Push to child path.
      // [START oncomplete]
      for (var i = 0; i < evt.target.files.length; i++) {
        var file = evt.target.files[i];
        var metadata = {
          'contentType': file.type
        };

        storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          console.log('File metadata:', snapshot.metadata);
          // Let's get a download URL for the file.
          snapshot.ref.getDownloadURL().then(function(url) {
            console.log('File available at', url);
          });
        }).catch(function(error) {
          // [START onfailure]
          console.error('Upload failed:', error);
          // [END onfailure]
        });
      // [END oncomplete]

      }
    }


    window.onload = function() {
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
    }