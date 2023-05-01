const APP = {
  isOnline: 'onLine' in navigator && navigator.onLine,
  init() {
    APP.registerWorker();
    APP.addListeners();
   APP.getTopScores();
  },
  addListeners() {
    window.addEventListener('offline', (event) => {
      document.querySelector('.offline').textContent = 'CURRENTLY OFFLINE';
    });
    window.addEventListener('online', (event) => {
      document.querySelector('.offline').textContent = ' ';
    });
    if(!APP.isOnline){
      document.querySelector('.offline').textContent = 'CURRENTLY OFFLINE';
    }else{
       
    }
  },
  getTopScores() {
    let url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url, {
      method: 'get',
      headers: { accept: 'application/json,text/json' },
    })
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((users) => {
        let scores = users
          .map((user) => {
            let score = Math.floor(Math.random() * 100000) + 100000;
            return { name: user.name, id: user.id, score };
          })
          .sort((a, b) => {
            return a.score - b.score;
          });

        const list = document.getElementById('scorelist');
        list.innerHTML =
        scores.map((user)=>{
           return `<li id='data-${user.id}'><p>Name:${user.name}</p><p> score:${user.score}</p></li>`;
        }).join('');

      })
      .catch(APP.handleError);
  },
  registerWorker() {
    if('serviceWorker'in navigator){
      navigator.serviceWorker.register('/service-worker/sw.js',{scope: '/service-worker/'});
    }
  },
  handleError(err) {
    switch (err.name) {
            case 'NetworkError':
              console.warn ('Something went wrong. Status code: ' + err.status);
              break;
            case 'EmptyRecordsError':
                console.warn( "I have 0 data here" + err.message);
              break;
              case 'TypeError':
                console.warn("Sorry, No data about that theme");
              break;
            default:
                console.warn('Something went wrong, please try again. ' + err.message);
           
        }
    console.warn(err.message);
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
