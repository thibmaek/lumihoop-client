import io from 'socket.io-client';
import { colors, shape, minScale, scaleMultiplier } from './config.js';

const $canvas = document.querySelector(`.canvas`);
const $alert = document.querySelector(`.circle-is-placed`);

const socket = io(`/`);
let canPlaceHoop = true;

const newTurn = () => {
  canPlaceHoop = true;
  $alert.classList.toggle(`is-hidden`);
};

const drawHoop = ({ pageX, pageY, scale }) => {
  const ctx = $canvas.getContext(`2d`);
  ctx.fillRect(0, 0, $canvas.width, $canvas.height);
  ctx.fill = colors.bg;
  ctx.beginPath();
  ctx.arc(pageX, pageY, scale * scaleMultiplier, 0, Math.PI * 2, false);
  ctx.lineWidth = shape.stroke;
  ctx.strokeStyle = colors.pink;
  ctx.stroke();

  ctx.shadowBlur = shape.glow;
  ctx.shadowColor = colors.pink;
};

const init = () => {
  $canvas.setAttribute(`width`, window.innerWidth);
  $canvas.setAttribute(`height`, window.innerHeight);

  document.addEventListener(`touchmove`, e => e.preventDefault());

  $canvas.addEventListener(`gesturechange`, e => {
    if (e.scale > minScale && canPlaceHoop) drawHoop(e);
    requestAnimationFrame();
  });

  canvas.addEventListener(`gestureend`, e => {
    const { pageX, pageY, scale } = e;
    const relX = (pageX - (window.innerWidth / 2)) / (window.innerWidth / 2);
    const relY = (pageY - (window.innerHeight / 2)) / (window.innerHeight / 2);
    socket.emit(`hoopPlaced`, { relX, relY, scale });

      $alert.classList.toggle(`is-hidden`);
      canPlaceHoop = false;
    }
  });

  socket.on(`newTurn`, newTurn);
};

init();
