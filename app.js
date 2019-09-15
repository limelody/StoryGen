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

    //Download text function
    function downloadTextandRender(path, selector) {
        storageRef.child(path).getDownloadURL().then(function(url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('GET', url);
            xhr.onload = function(event) {
              var blob = xhr.responseText;
              $(selector).html(blob);
            };
            xhr.send();

          }).catch(function(error) {
            // Handle any errors
          });
    }
    //Download audio function
    function downloadAudioandRender(path, selector) {
        storageRef.child(path).getDownloadURL().then(function(url) {
            $(selector).html('<source src="' + url + '" type="audio/mpeg">')
        }).catch(function(error) {

        });
    }

    //Fetch all data to render webpage with
    document.getElementById('fetch-data').onclick = function() {
        downloadTextandRender('text_files/text_output_1.txt', '.text-one');
        downloadTextandRender('text_files/text_output_2.txt', '.text-two');
        downloadTextandRender('text_files/text_output_3.txt', '.text-three');
        downloadAudioandRender('audio_files/audio_output_1.mp3', '.audio-one');
        downloadAudioandRender('audio_files/audio_output_2.mp3', '.audio-two');
        downloadAudioandRender('audio_files/audio_output_3.mp3', '.audio-three');
    }