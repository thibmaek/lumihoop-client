// import fetch from 'isomorphic-fetch';

const init = () => {
  document.addEventListener(`touchend`, e => {
    const touch = e.changedTouches[0];
    console.log(`x: ${touch.pageX}, y: ${touch.pageY}`);
  });
};

init();
