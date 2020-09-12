// index.worker.js
const worker = {

  message: (e) => {
      try {
          postMessage({ message: `From worker: ${e.data.message}` });
      } catch(ex) {
          postMessage({ type: 'error', message: ex });
      }
  }
};

addEventListener('message', worker.message);
