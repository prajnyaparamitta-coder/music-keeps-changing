'use strict';

// 曲ページ：再生している間だけ、ジャケットの裏のレコード盤を回す
{
  const audio = document.querySelector('.song__audio');
  const jacket = document.querySelector('.song__jacket');

  if (audio && jacket) {
    // 再生中なら is-playing を付け、止まっていれば外す
    const update = () => {
      jacket.classList.toggle('is-playing', !audio.paused);
    };

    audio.addEventListener('play', update);
    audio.addEventListener('pause', update);
    audio.addEventListener('ended', update);
  }
}