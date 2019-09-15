    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();

    //Upload everything to Firebase
    async function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      var url_list = '';
      var image_list = '';

      for (var i = 0; i < evt.target.files.length; i++) {
        var src = URL.createObjectURL(this.files[i]);
        image_list += '<li><img id="myImg" src="'+ src + '"></li>';
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
      $('#messagesDiv > div.image-lists').html(image_list);
      storageRef.putString(image_name_list);
    }

    //Initialization
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
    
    //Clear all of Firebase
    document.getElementById('back-and-clear').onclick = function() {
        var to_delete = ['audio_files/audio_output_1.mp3', 'audio_files/audio_output_2.mp3', 'audio_files/audio_output_3.mp3',
        'text_files/text_output_1.txt','text_files/text_output_2.txt', 'text_files/text_output_3.txt']
        to_delete.forEach((element) => {
            var fileRef = storageRef.child(element);
            fileRef.delete().then(function() {
            }).catch((error) => {

            });
        });
    }

    document.getElementById('fetch-data').onclick = function() {
        storageRef.child('text_files/text_output_1.txt').getDownloadURL().then(function(url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('GET', url);
            xhr.onload = function(event) {
              var blob = xhr.responseText;
              $('.text-one').html(blob);
            };
            xhr.send();

          }).catch(function(error) {
            // Handle any errors
          });

        storageRef.child('text_files/text_output_2.txt').getDownloadURL().then(function(url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.open('GET', url);
        xhr.onload = function(event) {
            var blob = xhr.responseText;
            $('.text-two').html(blob);
        };
        xhr.send();

        }).catch(function(error) {
        // Handle any errors
        });

        storageRef.child('text_files/text_output_3.txt').getDownloadURL().then(function(url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('GET', url);
            xhr.onload = function(event) {
              var blob = xhr.responseText;
              $('.text-three').html(blob);
            };
            xhr.send();

        }).catch(function(error) {
        // Handle any errors
        });

        storageRef.child('audio_files/audio_output_1.mp3').getDownloadURL().then(function(url) {
            $('.audio-one').html('<source src="' + url + '" type="audio/mpeg">')
        }).catch(function(error) {

        });

        storageRef.child('audio_files/audio_output_2.mp3').getDownloadURL().then(function(url) {
            $('.audio-two').html('<source src="' + url + '" type="audio/mpeg">')
        }).catch(function(error) {

        });

        storageRef.child('audio_files/audio_output_3.mp3').getDownloadURL().then(function(url) {
            $('.audio-three').html('<source src="' + url + '" type="audio/mpeg">')
        }).catch(function(error) {

        });
    }