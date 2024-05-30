// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Astronaut In The Ocean - Masked Wolf", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Perfect - Ed Sheeran", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Shape Of You  - Ed Sheeran", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Let Me Love You - DJ Snake, Justin Bieber", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Believer - Imagine Dragons", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sajni - Ram Sampath, Arijit Singh, Prashant Pandey", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Soulmate - Badshah, Arijit Singh", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Naina - Badshah, Diljit Dosanjh, Raj Ranjodh", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "O Mahi - Pritam, Arijit Singh, Irshad Kamil", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "With You - AP Dhillon", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        updateActiveSong();
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        removeActiveSong();
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

const removeActiveSong = () => {
    songItems.forEach((element) => {
        element.classList.remove('active-song');
    });
}

const updateActiveSong = () => {
    removeActiveSong();
    songItems[songIndex].classList.add('active-song');
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updateActiveSong();
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateActiveSong();
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateActiveSong();
});
