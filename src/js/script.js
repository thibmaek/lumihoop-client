import io from 'socket.io-client';

const socket = io(`/`);

const init = () => {

  document.addEventListener(`touchmove`, e => {
    e.preventDefault();
  });

  const canvas = document.querySelector(`.canvas`);

  canvas.addEventListener(`gesturechange`, e => {
    const { pageX, pageY, scale } = e;
    const ctx = canvas.getContext(`2d`);

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill = `black`;
    ctx.beginPath();
    ctx.arc(pageX, pageY, scale * 100, 0, Math.PI * 2, false);
    ctx.lineWidth = 5;
    ctx.strokeStyle = `#ff69b4`;
    ctx.stroke();

    console.log(pageX, pageY);
    requestAnimationFrame();
  });

  canvas.addEventListener(`gestureend`, e => {
    const { pageX, pageY, scale } = e;

    socket.emit(`hoopPlaced`, { pageX, pageY, scale });
  });

};



init();
