//initially which song is being played
let songIndex = 0;
//the next song will be
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let progressBar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
//bcoz its not an array
let songItem = Array.from(document.getElementsByClassName('songItem'));


//array of objects
let songs = [
    {songName: "ITS ALWAYS BLUE", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "TRAP", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "THEY MAD", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Rich te kid", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"}
]

songItem.forEach((element, i) => {
    //we will change photos of audio
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    //we will change the song name
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;

});

//LISTEN TO EVENTS

//what will happen if someone clicks on play button
//handle play/pause click
//(when button is clicked either it will play or pause orrr audio hasn't started yet then we have to play)
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();   //audio will start playing
        masterPlay.classList.remove('fa-play-circle');//then we need to bring pause button
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();   //if audio is playing then pause it
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
audioElement.addEventListener('timeupdate', ()=>{
    //we will check how much audio percent has been played
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

//when we click anywhere on the playing line
progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//whenever we click on mini play icon
//we will get that element which is clicked with target
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        
        songIndex = parseInt(e.target.id); //to make index an integer
    
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;

        //audioElement.src = 'songs/2.mp3';
        //for updating the song
        audioElement.src = `songs/${songIndex+1}.mp3`; 
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//if someone clicks on next button

document.getElementById('next').addEventListener('click', () =>{
    if(songIndex >= 3){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`; 
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//if someone clicks on previous button

document.getElementById('previous').addEventListener('click', () =>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    //to change the name of the song title below
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})