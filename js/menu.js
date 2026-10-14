'use strict';

// ハンバーガーメニュー：中の項目を押したら閉じる
{
  const toggle = document.querySelector('#menu-toggle');

  document.querySelectorAll('.header-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.checked = false;
    });
  });

  // ブラウザの「戻る」でこのページに戻ったとき、メニューが開いたまま復元されないようにする
  window.addEventListener('pageshow', () => {
    toggle.checked = false;
  });
}