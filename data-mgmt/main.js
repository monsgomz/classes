import randomNames from './catalist.js';
import {NetworkError} from './utils.js';

const CATSAPP = {
    key: 'cats-namegome0145',
    cats: {},
    container: document.querySelector('.loader'),
    p: document.getElementById('error-text'),
    div: document.getElementById('cat-images'),
    init: ()=>{
        let store = localStorage.getItem(CATSAPP.key);

        if(store === null){
            localStorage.setItem(CATSAPP.key, JSON.stringify(CATSAPP.cats));
        }
        else{
            CATSAPP.cats = JSON.parse(store); 
       
        }
        CATSAPP.div.innerHTML = ' ';
        let url = 'https://api.thecatapi.com/v1/categories';
    
         CATSAPP.categoriesFetch(url);
    },
    categoriesFetch: (url) =>{
        
        let option = document.getElementById('categories');
         CATSAPP.p.textContent ='';

        fetch(url)
        .then((response)=>{
    
            if(!response.ok) throw new NetworkError('No cats for now',response.statusText);
                console.log(response);
    
           return response.json();
    
         })
        .then((content)=>{
    
            if(content.length === 0 ){
    
                console.log('Error');
                document.getElementById('error-text').textContent = 'No data, please try again';
         } else{
       
            option.addEventListener('change', CATSAPP.imagesFetch);
            option.innerHTML +=
            content.map((item)=>{
    
            return `
             <option value="${item.id}" >${item.name}</option>`;
    
            }).join(''); 
        }
        })
        .catch((error) =>{
            CATSAPP.loader(false);
            console.warn(error);
            CATSAPP.p.textContent = `Ups: ${CATSAPP.handleError(error)}`;
        })
    },
    imagesFetch: (ev) =>{
        CATSAPP.p.textContent = '';
        CATSAPP.loader(true);
        let str = `https://api.thecatapi.com/v1/images/search?category_ids=${ev.target.value}&limit=15`;

        let url = new URL(str);

        let headers = new Headers();
        headers.append('x-api-key', 'live_NouqH5KhfGqqVHF0t4Md3xdE1Pbck6GXwf1OZ3koW5sk6iX1wL6WcynajwJqgSw4');
    
        let request2 = new Request(url, {
            method:'GET',
            headers: headers,
        });

        fetch(request2)
        .then((response)=>{

            if(!response.ok) throw new NetworkError('No cats for now',response.statusText);
                CATSAPP.loader(false);
            return response.json();
         })
        .then((content)=>{

            CATSAPP.div.innerHTML =
            content.map((items)=>{
            let id = items.id;
            if(id in CATSAPP.cats){
                // console.log('existe: '+ id);
                return CATSAPP.buildCards(items.url, CATSAPP.cats[id]);
              }else{
                let n = randomNames();
                CATSAPP.cats[items.id]= n;
                localStorage.setItem(CATSAPP.key, JSON.stringify(CATSAPP.cats)); 
                return CATSAPP.buildCards(items.url, n);
              }
            }).join('');
        })
        .catch((error) =>{

            CATSAPP.loader(false);
            CATSAPP.div.innerHTML = ' ';
            CATSAPP.p.textContent = `Ups: ${CATSAPP.handleError(error)}`;
        
             console.warn(error);
        });

    },
    buildCards: (url, name) =>{
        return `
        <div class="card-group col-12 col-md-6 col-lg-4 py-3">
            <div class="card border-info bg-light">
                <div class='ratio ratio-4x3'>
                    <img src="${url}" class="card-img-top rounded-2" alt="Random cat">
                </div>
                    <div class="card-body">
                        <p class="card-title">${name}</p>
                    </div>
                </div>
        </div>`;
    },
    handleError: (err) =>{
        switch (err.name) {
            case 'NetworkError':
              return 'No cats for now. Something went wrong. Status code: ' + err.status;
              break;
            case 'EmptyRecordsError':
              return "I have 0 cats here " + err.message;
              break;
              case 'TypeError':
              return "I can't search cats, please check your network connection and try again: " + err.message + err.status;
              break;
            default:
              return 'Something went wrong, please try again. ' + err.message;
           
        }
    },
    loader: (show = true)=>{
        if (show) {
            CATSAPP.container.classList.add('active');
        } else {
            CATSAPP.container.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', CATSAPP.init);

