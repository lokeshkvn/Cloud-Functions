
'use strict';

const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')();
admin.initializeApp(functions.config().firebase);

exports.writeToDatabase = functions.storage.object().onChange(event => {
  const object = event.data;
  const filePath = object.name;
  const filePathSplit = filePath.split('/');
  const userName = filePathSplit.pop();
  const userNameSplit = userName.split('/');
  const Music = userNameSplit.pop();
  const MusicSplit = Music.split('/');
  const Genre = MusicSplit.pop()
  const GenreSplit = Genre.split('/');  
  const fileName = GenreSplit.pop();
  const fileNameSplit = fileName.split('.');
  const fileExtension = fileNameSplit.pop();
  const baseFileName = fileNameSplit.join('.');
  const fileDir = filePathSplit.join('/') + (filePathSplit.length > 0 ? '/' : '');
  const picture = "sample.jpeg"
  
  if (!object.contentType.startsWith('audio/mpeg')) {
    console.log('This is not an music.');
    return;
  }


   if (object.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
	return firebase.database().ref('Lokesh/music/English/{key}').remove();
  }
  
  if (Genre === 'English'){
	  const url = getURL(filePath);
	  console.log('This is a English audio');
	  return writeNewSongEnglish(fileName,picture,url);
  }
  
  else if (Genre === 'Hindi'){
	  const url = getURL(filePath);
	  console.log('This is a Hindi audio');
	  return writeNewSongHindi(filename,picture,url);
  }
  
  else (Genre === 'Melody'){
	  const url = getURL(filePath);
	  console.log('This is a Melody audio');
	  return writeNewSongMelody(filename,picture,url)
  }
	  
});


function writeNewSongEnglish(name, picture, url) {
	var database = firebase.database();
	var ref = database.ref('Lokesh/music/English/');
	
	var addData = {
	title: name,
    img: picture,
    url:url
	};

	ref.push(addData);
}


function writeNewSongHindi(name, picture, url) {
	var database = firebase.database();
	var ref = database.ref('Lokesh/music/Hindi/');
	
	var addData = {
    title: name,
    img: picture,
    url:url
  };

	ref.push(addData);
}

function writeNewSongMelody(name, picture, url) {
	var database = firebase.database();
	var ref = database.ref('Lokesh/music/Melody/');
	
	var addData = {
    title: name,
    img: picture,
    url:url
  };

	ref.push(addData);

}

function getURL(filename) {
	const bucket = gcs.bucket(bucket);
	const file = bucket.file(fileName);
	const action = 'read';
	const expires = '03-09-2491';
	return file.getSignedUrl({action, expires}).then(signedUrls => {
	});
}