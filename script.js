const page=document.getElementById('page')
function themeToggle(){
    const toggleSwitch=document.querySelector(".toggleButton").childNodes[0];
    if(toggleSwitch.classList.contains('fa-toggle-off')){
        toggleSwitch.classList.remove('fa-toggle-off');
        toggleSwitch.classList.add('fa-toggle-on');
        page.classList.add('dark-theme');
        console.log(page.classList)
        darkTheme();
    }
    else if(toggleSwitch.classList.contains('fa-toggle-on')){
        toggleSwitch.classList.remove('fa-toggle-on');
        toggleSwitch.classList.add('fa-toggle-off');
        page.classList.remove('dark-theme');
        darkTheme();
}}
function darkTheme(){
    if(page.classList.contains('dark-theme')){
        page.style.backgroundColor="black";
    }
    else{
        page.style.backgroundColor="white";
    }
}

let songs=[
    {
        id:1,
        name:'Adharanee',
        artist: 'A. R. Rahman',
        genre: "tamil",
        img: "images/Adharanee.jpg",
        source: "songs/Adharanee.mp3"
    },
    {
        id:2,
        name:'Love Elephantla',
        artist: 'Harris Jayaraj',
        genre: "tamil",
        img: "images/Love Elephent la.jpg",
        source: "songs/Love Elephant la.mp3"
    },
    {
        id:3,
        name:'Animals',
        artist: 'Martin Garrix',
        genre: "edm",
        img: "images/Animals.jpg",
        source: "songs/Animals.mp3"
    },
    {
        id:4,
        name:'Humble',
        artist: 'Skrillex',
        genre: "edm",
        img: "images/humbleSkrillex.jpg",
        source: "songs/Kendrick Lamar HUMBLE Skrillex Remix.mp3"
    },
    {
        id:5,
        name:'Kohinoor',
        artist: 'Divine',
        genre: "hiphop",
        img: "images/Kohinoor.jpg",
        source: "songs/kohinoor.mp3"
    },
    {
        id:6,
        name:'Paiya Dei',
        artist: 'Asal kolar',
        genre: "hiphop",
        img: "images/Paiya Dei.jpg",
        source: "songs/Paiya Dei Indie.mp3"
    },

]
let playlists=[];
let currentPlaylist;
let currentPlaylistSongs=[];
let genre;
let songList=songs
let songListByGenre=songs;
const genreSelection=document.getElementById('genre');
genreSelection.value="allsongs"
genreSelection.addEventListener('change',(e)=>{
    genre=e.target;
    if(genre.value=='allsongs'){
        songListByGenre=songs;
    }
    else{
        songListByGenre=songs.filter(song=>song.genre==genre.value)
    }
    showSongs(genre,songListByGenre);
})
const playlistInput=document.getElementById("playlistInput");
const createButton=document.getElementById('createBtn');
createButton.addEventListener('click',()=>{
    const playlistInputValue=playlistInput.value;
    console.log(playlistInputValue);
    if(playlistInputValue){
        createPlaylist(playlistInputValue);
    }
})
function showSongs(genre,songList){
    const genreDisplay=document.getElementById('genreDisplay');
    const genreSongs=document.getElementById('genreSongs');
    genreSongs.innerHTML='';
    if(!genre || genre.value==='allsongs'){
        genreDisplay.innerHTML='All Songs';
    }
    else{
        genreDisplay.innerHTML=`${genre.options[genre.selectedIndex].text} Songs`;
    }
        songList.forEach(song=>{
            const songName=document.createElement('button');
            songName.id=song.id;
            songName.addEventListener('click',(e)=>{
                songListByGenre=songList;
                playSong(Number(e.target.id),true)
            })
            songName.textContent=`${song.name}`;
            genreSongs.append(songName);
        })
}


function showPlaylistSongs(songIds){
    console.log(songIds);
    const currentSongs=document.getElementById('currentSongs');
    currentSongs.innerHTML="";
    currentPlaylistSongs=songs.filter(song=>songIds.includes(song.id));
    console.log(currentPlaylistSongs);
    currentPlaylistSongs.forEach(song=>
    {
        const songBtn=document.createElement('button');
        songBtn.textContent=`${song.name}`;
        songBtn.id=`${song.id}`;
        songBtn.addEventListener('click',()=>{
            songListByGenre=currentPlaylistSongs;
            playSong(Number(song.id),true);
        }
        );

        currentSongs.append(songBtn);
    }
    )

}


function playSong(songId,autoplay){
    
    const songCardContainer=document.getElementById('songCardContainer');
    songCardContainer.innerHTML="";
    const songCard=document.createElement('div');
    songCard.id='songCard';
    const selectedSong=songs.find(song=>song.id===songId);
    let currentIndex=songListByGenre.findIndex(song=>song==selectedSong);
    
    const cover=document.createElement('img');
    cover.setAttribute('src',`${selectedSong.img}`);
    songCard.append(cover);

    const songName=document.createElement('h2');
    songName.textContent=selectedSong.name;

    const artist=document.createElement('p');
    artist.textContent=selectedSong.artist;
    songCard.append(songName,artist);

    const audio=document.createElement('audio');
    audio.setAttribute('controls','true');
    audio.autoplay=autoplay;

    const source=document.createElement('source');
    source.setAttribute('src',`${selectedSong.source}`);
    source.setAttribute('type','audio/mpeg');
    audio.append(source);
    songCard.append(audio);

    const songCardButtons=document.createElement('div');
    songCardButtons.id="songCardButtons";

    const prevButton=document.createElement('button');
    prevButton.innerHTML='⏮';
    prevButton.id='prev';

    const nextButton=document.createElement('button');
    nextButton.innerHTML='⏭';
    nextButton.id='next';

    
    if(currentIndex===songListByGenre.length-1){
        nextButton.disabled=true;
        prevButton.addEventListener('click',()=>{
            prevSong(currentIndex);
        })
    }
    else if(currentIndex===0){
        prevButton.disabled=true;
        nextButton.addEventListener('click',()=>{
            nextSong(currentIndex);
        });
    }
    else{
        prevButton.disabled=false;
        nextButton.disabled=false;
        prevButton.addEventListener('click',()=>{
            prevSong(currentIndex);
        })
        nextButton.addEventListener('click',()=>{
            nextSong(currentIndex);
        });
    }

    const playlistButton=document.createElement('button');
    playlistButton.innerHTML="Add to Playlist";
    playlistButton.id="addPlaylist";
    playlistButton.addEventListener('click',()=>{
        if(currentPlaylist){
            addToPlaylist(currentPlaylist,currentIndex);
        }
    })

    songCardButtons.append(prevButton,nextButton);
    songCard.append(songCardButtons);
    songCardContainer.append(songCard,playlistButton)

}
function nextSong(current){
    nextIndex=current+1;
    playSong(songListByGenre[nextIndex].id,true)
}
function prevSong(current){
    nextIndex=current-1;
    playSong(songListByGenre[nextIndex].id,true)
}

function createPlaylist(playlistName){
    let newPlaylist
    if(playlists.length===0){
        newPlaylist={id:101,name:playlistName,songs:[]};
    }
    else{
        newPlaylist={id:(playlists[playlists.length-1].id)+1,name:playlistName,songs:[]};
    }

    playlistInput.value="";
    playlists.push(newPlaylist);
    console.log(playlists);

    showPlaylists();
}
function showPlaylists(){
    const allPlaylists=document.getElementById('playlists');
    allPlaylists.innerHTML="";
    playlists.forEach(playlist=>{
        const playlistName=document.createElement('button');
        playlistName.textContent=playlist.name;
        playlistName.id=playlist.id;
        playlistName.addEventListener('click',()=>{
            currentPlaylist=playlist.id;
            // showPlaylistSongs(currentPlaylist.)
            showPlaylistSongs(playlists.find(playlist=>playlist.id==currentPlaylist).songs);
        })
        allPlaylists.append(playlistName);

    })
}

function addToPlaylist(currentPlaylist,current){
    const currPlaylist=playlists.find(playlist=>playlist.id==currentPlaylist);
    const theSong=songListByGenre[current].id;
    let songInPlaylist=currPlaylist.songs.findIndex(song=>song==theSong);
    console.log(songInPlaylist);
    if(currPlaylist.songs.length===0){
        if(songInPlaylist==-1){
            currPlaylist.songs.push(theSong);
        }
    }
    else if(songInPlaylist==-1){
        currPlaylist.songs.push(theSong);
    }
    showPlaylistSongs(currPlaylist.songs);
}

showSongs(genre,songList);
playSong(1,false)