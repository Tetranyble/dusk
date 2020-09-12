'use strict'
const Notification = () => {
  const n = new Notification('title',{
    body: 'Dusk',
    badge: "",
    icon: "",
    image: "",
    tag: 'foo',
    renotify: false,
    data: {

    },
    requireInteraction: false,
    actions: [{
      action: 'id',
      title: 'action title',
      icon: '/path/to/image.text'
    }],
    silent: false,
    sound: '/path/to/audio.ext',
    vibrate: [200, 100, 200],
    dir: 'ltr',
    lang: 'en-US',
    timestamp: Date.now()


  })
  n.addEventListener('error', event =>{
    console.log('there was a problem', event)
  })
  n.addEventListener('click', event =>{
    console.log('Notification clicked' , event)
    n.close()
  })
  if (Notification.permission === 'granted'){
    showNotification();
    return;
  }
  if (Notification.permission !== 'denied'){
    Notification.requestPermission().then(p =>{
      if(p === 'granted') {
        showNotification()
      }
    });
    return;
  }
}



module.exports = Notification
