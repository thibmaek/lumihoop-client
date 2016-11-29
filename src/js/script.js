// import fetch from 'isomorphic-fetch';

const init = () => {
  const canvas = document.getElementById(`canvas`);

  canvas.addEventListener(`gestureend`, e => {
    console.log(`scale: ${e.scale}`);
    console.log(e);

    // const data = {
    //   x,
    //   y,
    //   scale
    // };
    //
    // fetch(`https://<url>`, {
    //   method: `POST`,
    //   body: data,
    // });
  });
};

init();
