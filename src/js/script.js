import io from 'socket.io-client';
import { colors, shape, minScale, scaleMultiplier } from './config.js';

const socket = io(`/`);

const init = () => {
  //wacht op socket - bal in hoop
  socket.on(`newTurn`, handleWSNewTurn);

  const canvas = document.querySelector(`.canvas`);
  canvas.setAttribute(`width`, window.innerWidth);
  canvas.setAttribute(`height`, window.innerHeight);
  let canPlaceHoop = true;

  document.addEventListener(`touchmove`, e => e.preventDefault());

  const drawHoop = ({ pageX, pageY, scale }) => {
    const ctx = canvas.getContext(`2d`);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill = colors.bg;
    ctx.beginPath();
    ctx.arc(pageX, pageY, scale * scaleMultiplier, 0, Math.PI * 2, false);
    ctx.lineWidth = shape.stroke;
    ctx.strokeStyle = colors.pink;
    ctx.stroke();

    ctx.shadowBlur = shape.glow;
    ctx.shadowColor = colors.pink;
  };

  canvas.addEventListener(`gesturechange`, e => {
    if (e.scale > minScale && canPlaceHoop) drawHoop(e);
    requestAnimationFrame();
  });

  canvas.addEventListener(`gestureend`, e => {
    const { pageX, pageY, scale } = e;
    socket.emit(`hoopPlaced`, { pageX, pageY, scale });

    const alert = document.querySelector(`.circle-is-placed`);
    alert.classList.toggle(`is-hidden`);

    canPlaceHoop = false;
  });

  //start nieuwe beurt
  const handleWSNewTurn = () => {
    canPlaceHoop = true;
    alert.classList.toggle(`is-hidden`);
  };

};

init();
