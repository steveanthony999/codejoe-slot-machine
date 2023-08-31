const iconWidth = 79;
const iconHeight = 79;
const numIcons = 9;
const timePerIcon = 100;
const indexes = [0, 0, 0];
const iconMap = [
  'banana',
  'seven',
  'cherry',
  'plum',
  'orange',
  'bell',
  'bar',
  'lemon',
  'melon',
];

const roll = (reel, offset = 0) => {
  const delta = (offset + 2) * numIcons + Math.round(Math.random() * numIcons);
  const style = getComputedStyle(reel);
  const backgroundPositionY = parseFloat(style['background-position-y']);
  const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
  const normalTargetBackgroundPositionY =
    targetBackgroundPositionY % (numIcons * iconHeight);

  return new Promise((resolve, reject) => {
    reel.style.transition = `background-position-y ${
      8 + delta * timePerIcon
    }ms cubic-bezier(.45, .05, .58, 1.09)`;
    reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

    setTimeout(() => {
      reel.style.transition = 'none';
      reel.style.backgroundPositionY = `${normalTargetBackgroundPositionY}px`;
      resolve(delta % numIcons);
    }, 8 + delta * timePerIcon);
  });
};

const rollAll = () => {
  const reelsList = document.querySelectorAll('.container > .reel');
  Promise.all([...reelsList].map((reel, i) => roll(reel, i))).then((deltas) => {
    deltas.forEach(
      (delta, i) => (indexes[i] = (indexes[i] + delta) % numIcons)
    );
    indexes.map((i) => console.log(iconMap[i]));

    if (indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
      console.log('win');
    }
    setTimeout(rollAll, 3000);
  });
};

rollAll();
