'use strict'
const WorkerNotification = () => {
  self.registration.showNotification('Dusk',{
    body: 'Dusk',
    badge: "/assets/android-chrome-512x512.png",
    icon: "/assets/android-chrome-192x192.png",
    image: "/assets/android-chrome-192x192.png",
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
  self.addEventListener('notificationclose', event =>{
    console.log('there was a problem', event)
  })
  self.addEventListener('notificationclick', event =>{
    console.log('Notification clicked' , event)
    event.notification.close()
    switch (event.action){
      case 'add':
        console.log('add clicked')
        break;
      case 'rate':
        console.log('rate clicked')
        break;
      default:
        console.log('notification clicked');
        break;
    }
  })
  /* if (Notification.permission === 'granted'){
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
  } */


}



module.exports = WorkerNotification()
