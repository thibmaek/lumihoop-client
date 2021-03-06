import io from 'socket.io-client';
const socket = io(`/`);

import {
  colors, shape, minScale, scaleMultiplier,
  $canvas, $alert, $notificationBounds, $notificationScale,
} from './config.js';

const ctx = $canvas.getContext(`2d`);

let stopEmit = false;
let canDraw = true;

const newTurn = () => {
  canDraw = true;
  $alert.classList.add(`is-hidden`);
  ctx.fillRect(0, 0, $canvas.width, $canvas.height);
};

const drawHoop = ({ pageX, pageY, scale }) => {
  const naturalScale = scale * scaleMultiplier;

  ctx.fillRect(0, 0, $canvas.width, $canvas.height);
  ctx.fill = colors.bg;
  ctx.beginPath();
  ctx.arc(pageX, pageY, naturalScale, 0, Math.PI * 2, false);
  ctx.lineWidth = shape.stroke;
  ctx.stroke();

  if (pageX - naturalScale < 0 || pageX + naturalScale > window.innerWidth ||
    pageY - naturalScale < 0 || pageY + naturalScale > window.innerHeight) {
    stopEmit = true;
    $notificationBounds.classList.remove(`is-hidden`);
    ctx.strokeStyle = colors.bg;
    ctx.shadowBlur = `none`;
  } else {
    stopEmit = false;
    $notificationBounds.classList.add(`is-hidden`);
    $notificationScale.classList.add(`is-hidden`);
    ctx.strokeStyle = colors.pink;
    ctx.shadowBlur = shape.glow;
    ctx.shadowColor = colors.pink;
  }

  if (scale < minScale) {
    $notificationScale.classList.remove(`is-hidden`);
    ctx.strokeStyle = colors.bg;
    ctx.shadowBlur = `none`;
  }
};

const init = () => {
  $canvas.setAttribute(`width`, window.innerWidth);
  $canvas.setAttribute(`height`, window.innerHeight);

  document.addEventListener(`touchmove`, e => e.preventDefault());

  $canvas.addEventListener(`gesturechange`, e => {
    if (canDraw) drawHoop(e);
    requestAnimationFrame();
  });

  $canvas.addEventListener(`gestureend`, e => {
    if (!stopEmit) {
      const { pageX, pageY, scale } = e;
      const relX = (pageX - (window.innerWidth / 2)) / (window.innerWidth / 2);
      const relY = (pageY - (window.innerHeight / 2)) / (window.innerHeight / 2);
      socket.emit(`hoopPlaced`, { relX, relY, scale });

      canDraw = false;
      $alert.classList.remove(`is-hidden`);
      stopEmit = true;
    }
  });

  socket.on(`newTurn`, newTurn);
};

init();
