require(`isomorphic-fetch`);
import apiHelper from 'api-helper';

const server = apiHelper(`send`, {
  base: `http://178.119.183.177:3000/api`,
});

console.log(window);

const init = () => {
  const canvas = document.querySelector(`.canvas`);

  canvas.addEventListener(`gesturechange`, e => {
    const { pageX, pageY, scale } = e;
    const ctx = canvas.getContext(`2d`);

    ctx.beginPath();
    ctx.arc(pageX, pageY, scale * 100, 0, Math.PI * 2, false);
    ctx.lineWidth = 5;
    ctx.strokeStyle = `#ff69b4`;
    ctx.stroke();

    console.log(pageX, pageY);
  });

  canvas.addEventListener(`gestureend`, e => {
    const { pageX, pageY, scale } = e;
    server.insert({ pageX, pageY, scale })
      .then(d => console.log(d))
      .catch(e => console.error(e));
  });
};

init();
