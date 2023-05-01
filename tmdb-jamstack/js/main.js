import {NetworkError, EmptyRecordsError, TypeError} from './utils.js';

const HOME ={
    
    lastSearch: null,
    apik: 'dbf182325919178264e2a6e6ae7b8d69',
    baseURL: 'https://api.themoviedb.org',
    movieSearchURL: `/3/search/movie?api_key=`,
    tvSearchURL: `/3/search/tv?api_key=`,
    movieCreditsURL: `/3/movie/ID/credits?api_key=`,
    tvCreditsURL: `/3/tv/ID/credits?api_key=`,
    baseImage: 'https://image.tmdb.org/t/p/w1280/',

    init: ()=>{
        document.querySelector('form').addEventListener('submit', HOME.submit);
        document.getElementById('btn-search').addEventListener('click', HOME.click);
        window.addEventListener('popstate', HOME.pop);
        
        if (!location.hash) {
            history.replaceState(null, null, './');
          } else {
            if(document.querySelector('body').id === 'page-general'){
                HOME.readURL();
            }else{
                HOME.getCredits();
            }
          }
    },
    pop: (ev) =>{
       
        HOME.readURL();

    },
    readURL:()=>{
      
            let [,type, word,id] = location.hash.split('/');
            
            document.getElementById('word').value = word;
            document.getElementById('categories').value = type;
            HOME.processInput();
        
    },
    submit: (ev) => {
       
        ev.preventDefault();

        if(document.getElementById('categories').value ==='clear'){
            document.getElementById('error').textContent = 'Please select a category.';
        }else{
            HOME.processInput();
        }
       
      },
      click: (ev) => {
      
        ev.preventDefault(); 
        if(document.getElementById('categories').value  ==='clear'){
            document.getElementById('error').textContent = 'Please select a category.';
        }else{
            HOME.processInput();
        }
       
      },
      navCredits: (ev)=>{
        ev.preventDefault();
        let [,type, word,id] = location.hash.split('/');
        window.location.href =`./credits.html#/${type}/${word}/${ev.target.closest('a').id}`;
         
      },
      buildCardsHome: (url, name, text, id, type)=>{

            text = (!text)?'Description not available.':text;
            url = (url)?`${HOME.baseImage}${url}`:`./image/placeholder.png`;
                  
             return `
                 <li class="card s-1 m-1-2 l-1-3">
                    <a href="#" class="card__content ${type}" id=${id}>
                        <img class="image__icon"
                            src="${url}"
                            alt="Poster!"
                        />
                        <h2 class="card__title">${name}</h2>
                        <p id='description'>${text}</p>          
                    </a>
                </li>
                    `;
    },
     buildCardsCredits: (url, name, text, p,)=>{

        url = (url)?`${HOME.baseImage}${url}`:`./image/placeholder-people.png`;

        return `
            <li class="card s-1 m-1-2 l-1-3">
                <img class="image__icon"
                    src="${url}"
                    alt="Poster!"/>
                <div class="card__content">
                    <h2 class="card__title">${name}</h2>
                    <p>${text}</p>
                    <p id="popularity">Popularity: ${p} ⭐️</p>
                </div>
            </li>
                    `;
     },
    processInput: ()=>{
        let  field= document.getElementById('word');
        let div= document.getElementById('cards');
        let select = document.getElementById('categories');
        let p= document.getElementById('error');

         HOME.loader(true);

         p.textContent = ' ';
         let input = field.value;
        let urlType= (select.value  === 'movie')?HOME.movieSearchURL:HOME.tvSearchURL;
        if(select.value  === 'tv'){
            document.querySelector('body').style.background = 'linear-gradient(to bottom, white,#6a5287)';
        }else{
            document.querySelector('body').style.background = 'linear-gradient(to bottom, #9fa9be, white)';
        
        }

        document.getElementById('type').textContent = `Searching for ${select.value} : ${field.value}`;

        let  url= new URL(`${HOME.baseURL}${urlType}${HOME.apik}&language=en-US&query=${input}&page=1&include_adult=false`);

        if (input && HOME.lastSearch != input) { 
            fetch(url)
              .then((response) => {

                if(!response.ok) throw new NetworkError('No data for now',response.statusText);
               
                if (location.hash == `index.html#/${select.value}/${input}`) {
             
                } else {
              
                  history.pushState(null, null, `./index.html#/${select.value}/${input}`);
                }

                HOME.lastSearch = input;
                return response.json();
              })
              .then((content) => {
                HOME.loader(false);
                 div.addEventListener('click', HOME.navCredits);

                 if(content['results'].length){
                    div.innerHTML =
                    content['results'].map((items)=>{
           
                    if(items.name){ 
                        return HOME.buildCardsHome(items.backdrop_path, items.name, items.overview, items.id, 'tv');
                    }else{
                         return HOME.buildCardsHome(items.backdrop_path, items.original_title, items.overview, items.id, 'movie');
                    }
            
                    }).join('');

                 } else{
                    throw new EmptyRecordsError('No data about this theme',null);
                 }
              })
              .catch((err) => {
                HOME.loader(false);
                HOME.handleError(err);
                history.pushState(null, null, `./index.html#/${select.value}/${input}`);
              });
          } else {
           HOME.loader(false);
            p.textContent = 'Ups: No category selected, or empty field, please try again.';
          }
    },
    getCredits: ()=>{
        let div= document.getElementById('cards');
        document.getElementById('error').textContent = ' ';

        HOME.loader(true);
        document.getElementById('type').textContent = 'Credits';

        let [,type, word,id] = location.hash.split('/');

        let urlC = (type=== 'movie')? new URL(`${HOME.baseURL}${HOME.movieCreditsURL.replace('ID',id)}${HOME.apik}`):new URL(`${HOME.baseURL}${HOME.tvCreditsURL.replace('ID',id)}${HOME.apik}`);

        fetch(urlC)
        .then((response)=>{
            if(!response.ok) throw new NetworkError('No data for now',response.statusText);
            return response.json();
        })
        .then((content)=>{
            HOME.loader(false);
            if(content['cast'].length){
            div.innerHTML=
            content['cast'].map((items)=>{
                
                return HOME.buildCardsCredits(items.profile_path, items.name, `as ${items.character}`, items.popularity,'' );
            }).join('');
             }else{
                throw new EmptyRecordsError('No data about this theme',null);
            }

            }).catch((error)=>{
            HOME.loader(false);
            HOME.handleError(error);

            })

    },

    handleError: (err) =>{
        switch (err.name) {
            case 'NetworkError':
              HOME.showError( 'Something went wrong. Status code: ' + err.status);
              break;
            case 'EmptyRecordsError':
                HOME.showError( "I have 0 data here" + err.message);
              break;
              case 'TypeError':
                HOME.showError("Sorry, No data about that theme");
              break;
            default:
                HOME.showError('Something went wrong, please try again. ' + err.message);
           
        }
    },
    loader: (show = true)=>{

        let divLoader= document.querySelector('.loader');
        
        if (show) {
            divLoader.classList.add('active');
        } else {
            divLoader.classList.remove('active');
        }
    },
    showError: (msg) => {
        document.getElementById('cards').innerHTML = ' ';
        document.getElementById('error').textContent = msg;
      }
}

document.addEventListener('DOMContentLoaded', HOME.init);
