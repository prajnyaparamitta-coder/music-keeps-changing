'use strict';

// トップページのプレイリスト：「Play All」で Works の曲を上から順に続けて再生する
// 曲の一覧は Works のグリッドから読み取るので、曲を増やしたときもここは直さなくていい
{
  const playAll = document.querySelector('#play-all');
  const player = document.querySelector('#player');

  if (playAll && player) {
    const audio = player.querySelector('.player__audio');
    const jacket = player.querySelector('.player__jacket');
    const title = player.querySelector('.player__title');
    const seek = player.querySelector('.player__seek');
    const toggle = player.querySelector('[data-action="toggle"]');
    const currentTime = player.querySelector('.player__current');
    const duration = player.querySelector('.player__duration');

    // 秒数を「分:秒」の形にする（例：213 → 3:33）
    const format = (sec) => {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${String(s).padStart(2, '0')}`;
    };

    // Works のリンク（songs/○○.html）から、曲のスラッグと曲名を集める
    const tracks = [...document.querySelectorAll('.works__link')].map((link) => ({
      slug: link.getAttribute('href').split('/').pop().replace('.html', ''),
      title: link.querySelector('.works__name').textContent.trim(),
    }));

    let current = 0;

    // i 番目の曲を読み込む
    const load = (i) => {
      current = i;
      const { slug, title: name } = tracks[i];
      audio.src = `audio/${slug}.mp3`;
      jacket.src = `images/jackets/${slug}.webp`;
      title.textContent = name;
      seek.value = 0;
      currentTime.textContent = '0:00';
      duration.textContent = '0:00';

      // ロック画面などに曲名とジャケットを出す（対応しているブラウザのみ）
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: name,
          artist: 'Hayato.M',
          artwork: [{ src: jacket.src, type: 'image/webp' }],
        });
      }
    };

    const playTrack = (i) => {
      load(i);
      audio.play();
    };

    const next = () => {
      if (current < tracks.length - 1) {
        playTrack(current + 1);
      }
    };

    const prev = () => {
      // 再生から3秒以上たっていれば、同じ曲の頭に戻る
      if (audio.currentTime > 3 || current === 0) {
        audio.currentTime = 0;
      } else {
        playTrack(current - 1);
      }
    };

    // 「Play All」：バーを出して1曲目から再生する
    playAll.addEventListener('click', () => {
      player.classList.add('is-active');
      playTrack(0);
    });

    // 前の曲・再生/一時停止・次の曲
    player.addEventListener('click', (e) => {
      const button = e.target.closest('[data-action]');
      if (!button) return;
      const action = button.dataset.action;
      if (action === 'toggle') audio.paused ? audio.play() : audio.pause();
      if (action === 'prev') prev();
      if (action === 'next') next();
    });

    // 1曲終わったら次の曲へ。最後の曲が終わったら1曲目に戻して止める
    audio.addEventListener('ended', () => {
      if (current < tracks.length - 1) {
        next();
      } else {
        load(0);
      }
    });

    // 再生中かどうかで、ボタンの表示を切り替える
    const updateToggle = () => {
      const playing = !audio.paused;
      player.classList.toggle('is-playing', playing);
      toggle.setAttribute('aria-label', playing ? '一時停止' : '再生');
    };
    audio.addEventListener('play', updateToggle);
    audio.addEventListener('pause', updateToggle);

    // 曲の長さがわかったら表示する
    audio.addEventListener('loadedmetadata', () => {
      duration.textContent = format(audio.duration);
    });

    // 再生位置のバーと経過時間
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        seek.value = (audio.currentTime / audio.duration) * 100;
      }
      currentTime.textContent = format(audio.currentTime);
    });

    seek.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (seek.value / 100) * audio.duration;
      }
    });

    // ロック画面などの「前へ」「次へ」ボタン
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('previoustrack', prev);
      navigator.mediaSession.setActionHandler('nexttrack', next);
    }
  }
}
