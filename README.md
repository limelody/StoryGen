Image Captioning & Story Generation
=========================================

Link to Google Colab notebook for image captioning and story generation:
https://colab.research.google.com/drive/1pvdBQilg-jG8V-qvB3k4QuFyQL7E-9ao

Link to Google Drive folder containing other necessary code and files:
https://drive.google.com/open?id=1j19xzpgDrP8IBJlMXMgAFQeBOal2Hd-3

Image captioning is based off of: https://github.com/yunjey/pytorch-tutorial/tree/master/tutorials/03-advanced/image_captioning
Story generation is based off of OpenAI's GPT-2. Specifically, based our code off of the code here: https://colab.research.google.com/github/ilopezfr/gpt-2/blob/master/gpt-2-playground_.ipynb

The image captioning uses the resnet-152 model pretrained on the ILSVRC-2012-CLS image classification dataset. The encoder is a convolutional neural network (CNN) and decoder a long short-term memory (LSTM) network. You can download a pretrained model here: https://www.dropbox.com/s/ne0ixz5d58ccbbz/pretrained_model.zip?dl=0. Extract pretrained_model.zip to image_captioning/models/.



Firebase SDK for Cloud Storage Quickstart
=========================================

Getting Started
---------------

 1. Please use Google Chrome and get the following [extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US).
 1. You must have the Firebase CLI installed. If you don't have it install it with `npm install -g firebase-tools` and then configure it with `firebase login`.
 1. On the command line run `firebase use --add storygen-849ff`.
 1. On the command line run `firebase serve` using the Firebase CLI tool to launch a local server.

Support
-------

- [Firebase Support](https://firebase.google.com/support/)

License
-------

© Google, 2016. Licensed under an [Apache-2](../LICENSE) license.

Base Source Code [here](https://github.com/firebase/quickstart-js/tree/master/storage).
