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
};

init();
