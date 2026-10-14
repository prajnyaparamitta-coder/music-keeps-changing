'use strict';

// 最初の画面：16曲の中からランダムに3曲を選び、ジャケットとリンク先を入れ替える
{
  const songs = [
    { slug: 'one-sunny-day', title: "One Sunny Day" },
    { slug: 'gathering-your-pieces', title: "Gathering Your Pieces" },
    { slug: 'the-most-beautiful', title: "The Most Beautiful" },
    { slug: 'shes-just-turned-30-years-old', title: "She's Just Turned 30 Years Old" },
    { slug: 'then-ill-be-you', title: "Then I'll Be You" },
    { slug: 'moonlight-on-the-threshold', title: "Moonlight on the Threshold" },
    { slug: 'everything-you-do-while-youre-asleep', title: "Everything You Do While You're Asleep" },
    { slug: 'pale-mermaid', title: "Pale Mermaid" },
    { slug: 'only-sweet-songs-remain', title: "Only Sweet Songs Remain" },
    { slug: 'you-are-my-angel', title: "You Are My Angel" },
    { slug: 'dusk-takes-a-shape', title: "Dusk takes a shape" },
    { slug: 'drowning-in-blue-skies', title: "Drowning in Blue Skies" },
    { slug: 'watching-the-castle-tremble', title: "Watching the Castle Tremble" },
    { slug: 'like-a-feather', title: "Like a Feather" },
    { slug: 'a-song-of-definition', title: "A Song of Definition" },
    { slug: 'a-girl-goes-to-town-alone', title: "A Girl Goes to Town Alone" },
  ];

  // 順番をシャッフルする（フィッシャー–イェーツ法）
  const shuffled = [...songs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 先頭の3曲を、HTMLに置いた3つの枠に入れる
  document.querySelectorAll('.hero__link').forEach((link, i) => {
    const song = shuffled[i];
    const img = link.querySelector('.hero__jacket');
    link.href = `songs/${song.slug}.html`;
    img.src = `images/jackets/${song.slug}.webp`;
    img.alt = song.title;
  });
}