
var user_name = "";
var user_email = "";
var user_position = "";
var user_profile_picture = "";
var user_interest = ""; 
var user_fav_spot = "";
var user_fav_songs = []; 

var song_id = "";
var song_name = "";
var song_url = "";
var song_picture = "";

// Initialize Firebase
    var config = {
         apiKey: "AIzaSyARm7xKPSKNRunk49DwplrL7Sb3mA0wTa4",
         authDomain: "project-01-front-end-wit-39454.firebaseapp.com",
         databaseURL: "https://project-01-front-end-wit-39454.firebaseio.com",
         storageBucket: "project-01-front-end-wit-39454.appspot.com",
         messagingSenderId: "780675474319"
    };
    firebase.initializeApp(config);
    //Variables
    //Get a reference to the database service
    var database = firebase.database();   

// Capture Button Click
$("#submit-playlist").on("click", function(event) {
	debugger;
	event.preventDefault();
	
	name = $("#profile-name").val().trim();
	email = $("#profile-email").val().trim();
	position = $("#profile-position").val().trim();
	interest = $("#profile-interests").val().trim();
	fav_spot = $("#profile-fav-spot").val().trim();

	// Code to push songList array into the user_fav_songs array

	for (var k=0; k < songList.length; k++) {
		fav_song = songList[k];
		user_fav_songs.push(fav_song);
	}
	
	// Code for the push
	database.ref('users/').push({
			user_name : name,
			user_email : email,
			user_position : position,
			// user_profile_picture : profile,
			user_interest : interest, 
			user_fav_spot: fav_spot,
			user_fav_songs: fav_song
			    
	  	// dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	console.log(user_fav_songs);
	window.location.replace("personal_profile.html");
});


var index;
var songList = [];

$(document).ready(function() {

	function renderSongs(event) {

		$(".table #displayList").empty();

		for (var j=0; j < songList.length; j++) {

		var songDiv = $("<tr class='playlistSong'>");

		var newAdd = songList[j]

		songDiv.append("<td>" + newAdd + "</td>");
		// var newAdd = $("<iframe class='song'>").attr("src", songList[j]).attr("frameborder", 0).attr("allowtransparency", true);

		$(".table #displayList").prepend(songDiv);

		}

	}

	// Function to Display Spotify API Results
	function displayResults(event) {


		var fetchTracks = function (albumId, callback) {
		    $.ajax({
		        url: 'https://api.spotify.com/v1/albums/' + albumId,
		        success: function (response) {
		            callback(response);
		        }
		    });
		};

		var searchAlbums = function (query) {
		    $.ajax({
		        url: 'https://api.spotify.com/v1/search',
		        data: {
		            q: query,
		            type: 'album'
		        },
		        success: function (response) {
		            resultsPlaceholder.innerHTML = template(response);
		        }
		    });
		};




		// event.preventDefault();
		var query = $("#query").val().trim();
		// var queryUrl = "https://api.spotify.com/v1/search?type=track,artist&market=US&limit=10";
		var queryUrl = "https://api.spotify.com/v1/search";

		console.log(q)

		// queryUrl += '&' + $.param({
		// 	'q': q,
		// })



		
		$.ajax({

        	url: queryUrl,
      //   	headers: {
      //  			'Authorization': 'Bearer ' + accessToken
   			// },
					data: {
            q: query,
            type: 'track'
	        },
        	method: 'GET'

        })
        .done(function(response) {

        	console.log(response);
        	var data = response.tracks


        	for(var i = 0; i < data.items.length; i++) {
        	var tracks = $("<tr id='track'>");

        		var songName = "<br>" + data.items[i].name + "<br>";	
        		var artist = data.items[i].artists[0].name;
        		var albumArt = data.items[i].album.images[0].url;

        		var image = $("<img class='img-rounded' width='165px' height='150px'>").attr("src", albumArt);
        		var p = $("<p class='songInfo'>")
        		p = songName + "By:" + artist;

        		var uri = data.items[i].uri;

        		var trackUri = "https://embed.spotify.com/?uri=" + uri; 

        		var preview = data.items[i].preview_url;
        		var column = $("<td class='col-md-4'id='resultCol'>");
        		var playButton = $("<video width='300px' height='85px' class='preview' controls>").attr("src", preview);
        		
        		var playlistAdd = $("<button type='button' class='add btn-primary'>").text("Add To Playlist");
        		column.prepend(playButton);
        		tracks.append("<td class='col-md-2'>" + p + "</td>");
        		tracks.append(image);
        		
        		tracks.append(column);
        		tracks.append(playlistAdd);

        		// $(".song").on("load", function preventAutoPlay(event) {
        		// 	event.preventDefault();
        		// 	audio.pause()
        		// })

        		$(".table #searchResults").append(tracks);
        	}


        // function playPreview(snd) {
        // 	audio = new Audio(snd)
        // 	audio.play();
        // }

        // function pausePreview(snd) {
        // 	audio.pause();
        // }

        // $(".img").on("click", function() {


        //  	var index = ($(this).index('.img'));

        //  	var preview = "";
        //  	preview = data.items[index].preview_url;

        //  	playPreview(preview);

	       //   	if(preview =! "") {
	       //   		$(".img").on("click", ".img", pausePreview)
	       //   	}


	   // Playlist Add Button
		$(".add").on("click", function () {

				index = ($(this).index('.add'));
				console.log(index)
				id = data.items[index].id;
				url = data.items[index].preview_url;
				name = data.items[index].name;
				artist = data.items[index].artists[0].name
				
				picture = data.items[index].album.images[0].url;
				     	
				// Code for the push
				database.ref('songs/').push({
					song_id: id,
					song_name: name,
					song_artist: artist,
					song_url: url,
					song_picture: picture
				})

				// database.ref('users/').push({
				// 	user_fav_songs: id,
				// })

				var trackName = data.items[index].name;
				// var trackArtist = data.items[index].artists[0].name;
				// trackName += "By:" + trackArtist;
				console.log(trackName);
				songList.push(trackName);
	     		renderSongs();
				
			});

		// $("#submit-playlist").on("click", function() {
			


		// 	// Code for the push
		// 	database.ref('users/').push({
		// 		user_fav_songs: fav_song
			    
		//   	// dateAdded: firebase.database.ServerValue.TIMESTAMP
		// 	});

		// })
       })
    };
 
// Exceutes the Function to Display Results from Spotify API
$(document).on("click", "#search", displayResults);

$("#clr").on("click", function(event) {
        event.preventDefault();
       $("#search-form")[0].reset();
       $("#searchResults").empty();
  });

});

