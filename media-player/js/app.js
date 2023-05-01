import MEDIA from './media.js'; 

const APP = {
  audio: new Audio(),
  currentTrack: 0, 
  init: () => {
    APP.buildPlaylist();
    APP.one();
    APP.loadCurrentTrack();
    APP.addListeners();
  },
  addListeners: () => {
    APP.audio.addEventListener('error', APP.errorHandler);
    APP.audio.addEventListener('play', APP.play);
    APP.audio.addEventListener('pause', APP.pause);
    APP.audio.addEventListener('durationchange', APP.durationchange);
    APP.audio.addEventListener('timeupdate', APP.timeupdate);
    APP.audio.addEventListener('ended', APP.ended);
    document.getElementById('controls').addEventListener('click', APP.controls);
    document.querySelector('ul').addEventListener('click',APP.selectAudio);
  },
  buildPlaylist: () => {
    document.getElementById('playlist').innerHTML +=
    MEDIA.map((element)=>{
      // console.log(element)
        return`<li class="track__item" data-src='${element.track}' id='${element.track}'>
                <div class="track__thumb">
                    <img src="./img/${element.thumbnail}" alt="${element.artist} album art thumbnail" />
                </div>
                <div class="songs"> 
                <div class="track__details">
                    <p class="track__title">${element.title}</p>
                    <p class="track__artist">${element.artist}</p>
                </div>
                <div class="track__time">
                    <time datetime="">00:00</time>
                </div>
                </div>
            </li>`;
    }).join('');
  },
  buildAlbum:()=>{
   document.getElementById('album_art__full').innerHTML = `<img src=./img/${MEDIA[APP.currentTrack].large} alt="full album art" />`;
  },
  controls:(ev)=>{
    switch(ev.target.innerText){
      case 'play_arrow':
        APP.play();
      break;

      case 'pause':
        APP.pause();
        document.getElementById('btnPlay').innerHTML = '<i class="material-symbols-rounded">play_arrow</i>';
      break;

      case 'skip_next':
        APP.next();
      break;

      case 'skip_previous':
        APP.previous();
      break;

    }
  },
  loadCurrentTrack: () => {
    APP.audio.src = `./media/${MEDIA[APP.currentTrack].track}`;
    APP.buildAlbum();
    APP.albumValidation();
  },
  play: (ev) => {
    console.log('play');
    if(APP.audio.src){
      document.getElementById('btnPlay').innerHTML = '<i class="material-symbols-rounded">pause</i>';
      APP.audio.play();
      document.querySelector('.album_art__full img').style.animationPlayState = 'running';
      document.querySelector('.album_art__full img').style.scale = '1';
    }else{
        console.log('No audio loaded');
    }

  },
  pause: (ev) => {
    APP.audio.src?APP.audio.pause(): console.log('No audio loaded');
    document.querySelector('.album_art__full img').style.animationPlayState = 'paused';
    document.querySelector('.album_art__full img').style.scale = '90%';
  },
  next:()=>{
    console.log('next');
    APP.pause();
    document.getElementById(MEDIA[APP.currentTrack].track).classList.remove('li-selected');
    document.getElementById('btnPlay').innerHTML = '<i class="material-symbols-rounded">play_arrow</i>';
    APP.currentTrack++;
    if(APP.currentTrack>= MEDIA.length) APP.currentTrack = 0;
    document.getElementById(MEDIA[APP.currentTrack].track).classList.add('li-selected');
    APP.loadCurrentTrack();
    APP.play(); 

  },
  previous:()=>{
    console.log('previous');
    APP.pause();
    document.getElementById(MEDIA[APP.currentTrack].track).classList.remove('li-selected');
    document.getElementById('btnPlay').innerHTML = '<i class="material-symbols-rounded">play_arrow</i>';
    APP.currentTrack--;
    console.log(MEDIA.length)
    if(APP.currentTrack<=-1) APP.currentTrack = MEDIA.length-1;
    document.getElementById(MEDIA[APP.currentTrack].track).classList.add('li-selected');
    APP.loadCurrentTrack();
    APP.play();

  },
  durationchange:(ev)=>{
    document.querySelector('.total-time').textContent = APP.convertTimeDisplay(APP.audio.duration);
  },
  timeupdate:(ev)=>{
     document.querySelector('.current-time').textContent = APP.convertTimeDisplay(APP.audio.currentTime);
     let percentage = APP.audio.currentTime / APP.audio.duration;
     let barWidth = parseInt(document.getElementById('progress-bar').clientWidth);
     document.querySelector('.played').style.width = `${(percentage * barWidth)}px`;
          // console.log(percentage)
  },
  convertTimeDisplay: (seconds) => {
    let minute = Math.floor((seconds/60) % 60);
    let second = Math.floor(seconds% 60);
    let time = `${minute.toString().padStart(2, '0')}:
    ${second.toString().padStart(2, '0')}`;
    return time;
  },
  one:()=> {
  MEDIA.forEach((track) => {
    let tempAudio = new Audio(`./media/${track.track}`);
    tempAudio.addEventListener('durationchange', (ev) => {
      let duration = ev.target.duration;
      track['duration'] = duration;
      let thumbnails = document.querySelectorAll('.track__thumb img');
      thumbnails.forEach((thumb, index) => {
        if (thumb.src.includes(track.thumbnail)) {
          let timeString = APP.convertTimeDisplay(duration);
          thumb.closest('.track__item').querySelector('time').textContent = timeString;
        }
      });
    });
  });
},
  selectAudio:(ev)=>{
    let src = ev.target.closest('li').getAttribute('data-src');
    document.getElementById(MEDIA[APP.currentTrack].track).classList.remove('li-selected');
    APP.pause();
    APP.currentTrack = MEDIA.findIndex(element=>element.track==src);
    console.log(APP.currentTrack)
    document.getElementById(MEDIA[APP.currentTrack].track).classList.add('li-selected');
    APP.loadCurrentTrack();
    APP.play();
},
  ended:()=>{
    document.getElementById(MEDIA[APP.currentTrack].track).classList.remove('li-selected');
    APP.currentTrack++;
    if(APP.currentTrack>= MEDIA.length) APP.currentTrack = 0;
    APP.loadCurrentTrack();
    document.getElementById(MEDIA[APP.currentTrack].track).classList.add('li-selected');
    APP.play();
  },
  albumValidation:()=>{
    let artist = MEDIA[APP.currentTrack].track.replace('.mp3', '');
    document.body.style.background = `linear-gradient(to bottom, var(--${artist}-one), var(--${artist}-two))`;
  },
  errorHandler: (ev)=>{
    document.getElementById('error').textContent = 'The audio is not available';
  }
};

document.addEventListener('DOMContentLoaded', APP.init)