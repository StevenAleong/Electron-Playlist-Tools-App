import state from '../state';
import { sources, jobTypes } from '../enums';
import { getPlaylist as Spotify_getPlaylist, movePlaylistTrack as Spotify_movePlaylistTrack } from './spotifyServices';

var isProcessing = false;

function setupJobTimer() {
    // Delayed start of 5 seconds
    // Check the job every 3.5 seconds
    // Check the processing every 5 seconds
    //globalJobInterval = 
    setTimeout(function() {
        window.setInterval(checkQueue, 3500);
        window.setInterval(checkProcessing, 5000);
    }, 5000);
}

function checkQueue() {
    if (state.data.jobQueue && state.data.jobQueue.length > 0 && state.data.processing == null) {
        state.processFirstInQueue();
    }
}

function checkProcessing() {
    if (state.data.processing !== null && isProcessing == false) {
        isProcessing = true;

        if (state.data.processing.source == sources.SPOTIFY) {
            var playlistInfo = Spotify_getPlaylist(state.data.processing.playlistId);
            playlistInfo
                .then(function(data) {
                    console.log('Some information about this playlist', data.body);

                    var totalTracks = data.body.tracks.total;
                    var playlistId = data.body.id;
                    state.updateProcessingTracks(totalTracks);

                    if (state.data.processing.jobType == jobTypes.SHUFFLE) {                        
                        var trackIndexes = Array.from(Array(totalTracks).keys());
                        trackIndexes = shuffle(trackIndexes);
                        processSpotifyShuffleMoveTrack(playlistId, 0, trackIndexes);
                        
                    } else if (state.data.processing.jobType == jobTypes.REVERSE) {
                        processSpotifyReverse(playlistId, 0, true);

                    }

                }, function(err) {
                    console.log('Something went wrong!', err);
                    isProcessing = false;
                });
                
            
        }

    }
}

async function processSpotifyReverse(playlistId, index, forward) {
    if (state.data.processing != null && state.data.processing.cancelProcessing === true) {
        state.clearProcessing();
        isProcessing = false;

    } else {
        var totalTracks = state.data.processing.totalTracks;

        try {
            if (forward) {
                console.log('Moving track from ' + index  + ' to ' + (totalTracks - index));
                var result = Spotify_movePlaylistTrack(playlistId, index, totalTracks - index);
                result.then(function(data) {
                    if (data.statusCode == 200) {
                        processSpotifyReverse(playlistId, index, false);
                    } else {
                        setTimeout(processSpotifyReverse(playlistId, index, forward), 5000);
                    }
                });
    
            } else {
                console.log('Moving track from ' + (totalTracks - index - 2) + ' to ' + index);
                var result2 = Spotify_movePlaylistTrack(playlistId, totalTracks - index - 2, index);
                result2.then(function(data2) {
                    if (data2.statusCode == 200) {
    
                        state.updateProcessingProgress((index / (totalTracks / 2)) * 100);
    
                        if (index < Math.floor(totalTracks / 2)) {
                            processSpotifyReverse(playlistId, index + 1, true);
    
                        } else {
                            state.clearProcessing();
                            isProcessing = false;
    
                        }
    
                    } else {
                        setTimeout(processSpotifyReverse(playlistId, index, forward), 5000);
                    }
                });
            }

        } catch {
            processSpotifyReverse(playlistId, index, forward);
        }
    }
}

async function processSpotifyShuffleMoveTrack(playlistId, index, trackIndexes) {
    if (state.data.processing != null && state.data.processing.cancelProcessing === true) {
        state.clearProcessing();
        isProcessing = false;

    } else {
        console.log('Moving track ' + index + ' to position ' + trackIndexes[index]);
        try {
            var result = Spotify_movePlaylistTrack(playlistId, index, trackIndexes[index]);
            result.then(function(data) {
                console.log(data);
    
                if (data.statusCode == 200) {
                    state.updateProcessingProgress((index / trackIndexes.length) * 100);
    
                    if ((index + 1) < trackIndexes.length) {
                        processSpotifyShuffleMoveTrack(playlistId, index + 1, trackIndexes);
    
                    } else {
                        state.clearProcessing();
                        isProcessing = false;
    
                    }
    
                } else {
                    setTimeout(processSpotifyShuffleMoveTrack(playlistId, index, trackIndexes), 5000);
                }
    
            }, function(err) {
                console.log(err);
                setTimeout(processSpotifyShuffleMoveTrack(playlistId, index, trackIndexes), 5000);
            });
            
        } catch (err) {
            setTimeout(processSpotifyShuffleMoveTrack(playlistId, index, trackIndexes), 5000);
    
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

export default {
    setupJobTimer,
    shuffle
}