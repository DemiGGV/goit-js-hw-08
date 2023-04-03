import Storage from './storage.js';
import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

let curerrentTime = Storage.loadLS(STORAGE_KEY) ?? 0;
player.setCurrentTime(Number(curerrentTime));

player.on(
  'timeupdate',
  throttle(
    function (getAll) {
      curerrentTime = getAll.seconds;
      Storage.saveLS(STORAGE_KEY, curerrentTime);
    },
    1000,
    { trailing: false }
  )
);

player.on('ended', () => Storage.removeLS(STORAGE_KEY));
