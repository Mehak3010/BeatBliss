console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemContainer = document.getElementsByClassName('songItemContainer')[0];

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
];

// Function to format duration in mm:ss format
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

// Function to load song durations
const loadSongDurations = () => {
    songs.forEach((song, index) => {
        let audio = new Audio(song.filePath);
        audio.addEventListener('loadedmetadata', () => {
            let songItem = document.querySelector(`.songItem:nth-child(${index + 1}) .timestamp`);
            songItem.innerText = formatTime(audio.duration);
        });
    });
};

// Dynamically create song items
songs.forEach((song, i) => {
    let songItem = document.createElement('div');
    songItem.classList.add('songItem');
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${i + 1}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay"><span class="timestamp">0:00</span> <i id="${i}" class="far songItemPlay fa-play-circle"></i></span>
    `;
    songItemContainer.appendChild(songItem);
});

let songItems = Array.from(document.getElementsByClassName('songItem'));

const updateSongInfo = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
    songItems.forEach((item) => {
        item.classList.remove('active');
    });
};

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;
        element.classList.add('active');
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        updateSongInfo(songIndex);
    });
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        songItems[songIndex].classList.add('active');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        songItems[songIndex].classList.remove('active');
    }
});
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    makeAllPlays();
    songItems[songIndex].classList.add('active');
    updateSongInfo(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    makeAllPlays();
    songItems[songIndex].classList.add('active');
    updateSongInfo(songIndex);
});

document.getElementById('shuffle').addEventListener('click', () => {
    songIndex = Math.floor(Math.random() * songs.length);
    makeAllPlays();
    songItems[songIndex].classList.add('active');
    updateSongInfo(songIndex);
});

// Load song durations and play the first song on page load
window.addEventListener('load', () => {
    loadSongDurations();
    playFirstSong();
});

const playFirstSong = () => {
    makeAllPlays();
    songIndex = 0;
    songItems[songIndex].classList.add('active');
    updateSongInfo(songIndex);
};

