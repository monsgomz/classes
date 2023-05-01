 import CACHE from './cache.js';
 import { NetworkError, EmptyInputError, InvalidUserError, EmptyRecordsError } from './errs.js';
const APP = {
  isOnline: 'onLine' in navigator && navigator.onLine,
  currentPage: 'home',
  filesPerson: [],
  personSelected: 0,
  editGift: false,
  giftSelected: 0,
 
  init() {
    APP.registerWorker();
    CACHE.init(`MonzGomz-person`);
    APP.addListeners();
    APP.readData();
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
    }
    document.getElementById('save-person').addEventListener('click', (ev)=>{
        ev.preventDefault();
        if(APP.personSelected){
            APP.editPersonSave();
        }else{
        APP.addPerson();
        }
        
    });
    document.getElementById('save-gift').addEventListener('click', (ev)=>{
        
        ev.preventDefault();
        if(APP.editGift){
           
            APP.editGiftSave();
        } else{
            APP.addGift();
        }
        
    });
    document.getElementById('plus').addEventListener('click',(ev)=>{
        ev.preventDefault();
        document.getElementById('idea_gift').value = '';
                document.getElementById('store').value = '';
                document.getElementById('url').value = '';
                 document.getElementById('newNamePerson').value = '';
    document.getElementById('newDatePerson').value = '';
        if(APP.currentPage === 'home'){
            APP.navigate('add_edit_person');
        } else{
            APP.navigate('add_gift');
        }
    });
    document.getElementById('back').addEventListener('click',APP.back);
    document.getElementById('list_person').addEventListener('click',(ev)=>{
        ev.preventDefault();
        APP.personSelected = ev.target.closest('li').id;
        if(ev.target.id ==='gift'){
            APP.navigate('list_gift');
        }else if(ev.target.id==='edit'){
            APP.navigate('add_edit_person');
        }
    });
    document.getElementById('list_gifts').addEventListener('click', (ev)=>{
        ev.preventDefault();
        // console.log(ev.target.id);
        if(ev.target.id === 'edit_gift'){
             APP.giftSelected = ev.target.closest('li').id;
        // console.log('Gift selected'+APP.giftSelected);
            APP.editGift = true;
            APP.navigate('add_gift')
        } else if( ev.target.id === 'delete_gift'){
            APP.deleteGift(ev);
        }
    });
    document.getElementById('delete_person').addEventListener('click',(ev)=>{
        ev.preventDefault();
        APP.deletePerson()});
    document.getElementById('cancel-person').addEventListener('click',APP.back);
    document.getElementById('cancel-gift').addEventListener('click',APP.back);
  },

  back(ev){
    switch(APP.currentPage){
      case 'list_gift':
        APP.navigate('home');
        break;
      case 'add_gift':
        APP.navigate('list_gift');
        break;
      case 'add_edit_person':
        APP.navigate('home');
        break;
    }
  },

  navigate(page) {
    document.body.className = page; 
     APP.currentPage = page;
    switch(page){
        case 'home':
            APP.personSelected = 0;
            APP.getListPerson();
        break;
        case 'add_edit_person':
            if(APP.personSelected){
                APP.editPerson();
            }
        break;
        case 'list_gift':
            APP.getListGift();
        break;
          case 'add_gift':
            if(APP.editGift){
             APP.editGiftData();}
         break;
    }
  },

  addPerson(ev){
    let person = {
        id: Date.now(),
        name: '',
        dob: 0,
        gifts: [],
    };
    
    try {
        console.log('Add person');
        let inputP =document.getElementById('newNamePerson').value;
        let inputD= document.getElementById('newDatePerson').value;
        if(!inputP.trim() || !inputD.trim()) throw new EmptyInputError(inputP);
        person.name = inputP;
        let calendar = inputD;
        let date = new Date(calendar);
        person.dob =date.toISOString();
        APP.filesPerson.push(person);
        APP.createFile(person);
    } catch (error) {
       APP.handleError(error);
    }
    document.getElementById('newNamePerson').value = '';
    document.getElementById('newDatePerson').value = '';

  },
  editPersonSave(ev){
    if (APP.personSelected){
        let calendar = document.getElementById('newDatePerson').value;
        let name =document.getElementById('newNamePerson').value;
        //  console.log(name)
        let date = new Date(calendar);
        // let index = APP.filesPerson.findIndex(person => person.id == APP.personSelected);
        let element = APP.filesPerson.find(person => person.id == APP.personSelected);
        CACHE.deleteFile(`${element.name}-${element.id}`)
        .then((result)=>{
        element.name = name;
        element.dob = date.toISOString();
        // console.log('persona selected')
        //     console.log(APP.filesPerson)
        APP.createFile(element);
        })
        .catch((err)=>{
       APP.handleError(err);
        })
    }
    document.getElementById('newNamePerson').value = '';
    document.getElementById('newDatePerson').value = '';

  },

  editPerson(ev){
    let name = APP.filesPerson.find(person => person.id == APP.personSelected).name;
    document.getElementById('newNamePerson').value = name;
    let getDate = APP.filesPerson.find(person => person.id == APP.personSelected).dob;
    let date = new Date(getDate);
    let month = ("0" + (date.getMonth()+1)).substr(-2);
    let year = date.getFullYear();
    let day = ("0" + (date.getDate()+1)).substr(-2);
    // console.log(`${year}-${month}-${day}`);
    document.getElementById('newDatePerson').value = `${year}-${month}-${day}`; 
  },

  getListPerson(){
    if(APP.filesPerson.length !==0){
        document.getElementById('no_data').style = 'display:none';
    document.getElementById('list_person').style = 'display:block';
        document.getElementById('list_person').innerHTML =
    APP.filesPerson.sort((a,b)=>{
        const dateA = a.dob; 
        const dateB = b.dob;
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    }).map((person)=>{
        let date = new Date(person.dob);
        let dateFormat = date.toLocaleDateString('en-US', { timeZone: 'UTC' ,month:"long", day:"numeric"});
        return `<li id=${person.id}><p>${person.name}</p><p>${dateFormat}</p>
                <span class="material-symbols-outlined" id="edit">edit</span><span class="material-symbols-outlined" id="gift">redeem</span></li>`
    }).join('');

    }else{
        document.getElementById('list_person').style = 'display:none';
        document.getElementById('no_data').style = 'display:block';
        document.getElementById('no_data').textContent = 'No people in list';
    }
    

  },

  createFile(person){
    let file = new File([JSON.stringify(person)],person.id+'.json', { type: 'application/json', lastModified: Date.now()});
    let filename = `${person.name}-${person.id}.json`;
    let req = new Request(`.data/${filename}`);
    let resp = new Response(file,{status:200,statusText:'ok',});
    CACHE.put(req,resp);

  },

  getListGift(ev){
    CACHE.listFiles(`MonzGomz-person`)
    .then((keys)=>{
        return keys;
    }).then((key)=>{
            key.map((data)=>{
           let u = new URL(data.url);
           if(u.pathname.includes(APP.personSelected)){
            return CACHE.contentFile(u.pathname)
                    .then((file)=>{
                     return file.json();
                    }).then((peopleInfo)=>{
                        if(peopleInfo.gifts.length !== 0){
                            document.getElementById('list_gifts').style = 'display:block';
                        document.getElementById('no_gift').style = 'display:none';
                            document.getElementById('list_gifts').innerHTML = 
                        peopleInfo.gifts.map((person)=>{
                            return `<li id=${person.id}><p>${person.idea}</p><p>${person.store}</p><p>${person.url}</p>
                            <span class="material-symbols-outlined" id="edit_gift">edit</span><span class="material-symbols-outlined" id="delete_gift">delete</span></li>`
                }).join('');
                        }else{
                        document.getElementById('list_gifts').style = 'display:none';
                        document.getElementById('no_gift').style = 'display:block';
                        document.getElementById('no_gift').textContent = 'No gift ideas in list';
                        }
                        
                })
           }
        })
        
        
    })
  }, 

  readData(){
    CACHE.listFiles(`MonzGomz-person`)
    .then((keys)=>{
        return keys;
    }).then((key)=>{
        if(key.length !== 0){
            return key.map((data)=>{
        let u = new URL(data.url);
        return CACHE.contentFile(u.pathname)
                .then((file)=>{
                    return file.json();
                }).then((peopleInfo)=>{
                    APP.filesPerson.push(peopleInfo);
                }).then(r=>APP.getListPerson())
        })
        }else{
            document.getElementById('list_person').style = 'display:none';
            document.getElementById('no_data').textContent = 'No people in list';
        }
        
    })
    .catch((err)=>{
       APP.handleError(err);
    })
  },

  addGift(){
    let gift = {
        id: Date.now(),
        idea: '',
        store: '',
        url:'',
    };

    let idea = document.getElementById('idea_gift').value;
    let store = document.getElementById('store').value;
    let url = document.getElementById('url').value;
try {
    if(idea.trim() && store.trim()){
        let index = APP.filesPerson.findIndex(person => person.id == APP.personSelected);
            let element = APP.filesPerson.find(person => person.id == APP.personSelected);
            CACHE.deleteFile(`${element.name}-${element.id}`)
            .then((result)=>{
                gift.idea = idea;
                gift.store = store;
                gift.url = url;
                element.gifts.push(gift);
                APP.createFile(element);
                document.getElementById('idea_gift').value = '';
                document.getElementById('store').value = '';
                document.getElementById('url').value = '';
        })
        .catch((err)=>{
       APP.handleError(err);
        })
    } else{
       throw new EmptyInputError(idea);
    } 
} catch (error) {
    APP.handleError(error);
}
    
  },
  editGiftData(ev){
     let element = APP.filesPerson.find(person => person.id == APP.personSelected).gifts;
     let index = element.findIndex(gift => gift.id == APP.giftSelected);
    //  console.log(index);
    document.getElementById('idea_gift').value = element[index].idea;
    document.getElementById('store').value = element[index].store;
    document.getElementById('url').value =element[index].url;

  },
  editGiftSave(ev){
     let element = APP.filesPerson.find(person => person.id == APP.personSelected).gifts;
       let person = APP.filesPerson.find(person => person.id == APP.personSelected);
       let index = element.findIndex(gift => gift.id == APP.giftSelected);
       let ideaI =document.getElementById('idea_gift').value;
       let storeI =document.getElementById('store').value;
       let urlI = document.getElementById('url').value;
    //    console.log(index);
    //    console.log(element[index]);
    if (element){
        // console.log('borrar cache gift')
        CACHE.deleteFile(`${person.name}-${person.id}`)
        .then((result)=>{
        // element.splice(index,1);
        element[index].idea = ideaI;
        element[index].store = storeI;
        element[index].url = urlI;
        // console.log(element[index]);
        APP.createFile(person);
        })
        .catch((err)=>{
       APP.handleError(err);
        })
    }
    document.getElementById('idea_gift').value = '';
    document.getElementById('store').value = '';
    document.getElementById('url').value = '';
    APP.editGift = false;
  },

  deleteGift(ev){
    // console.log('borrando gift')
     let n =APP.filesPerson.find((element)=> element.id == APP.personSelected);
      let index = n.gifts.findIndex(person => person.id == ev.target.closest('li').id);
      if(window.confirm('Are you sure you want to delete the gift?')){
      CACHE.deleteFile(`${n.name}-${n.id}`)
         .then((result)=>{
         n.gifts.splice(index,1);
         APP.createFile(n);
         APP.getListGift();
         APP.navigate('list_gift');
         })
         .catch((err)=>{
            
       APP.handleError(err);
         })
        }else{
        console.log('no borro gift');
     }
  },

  deletePerson(){
    console.log('borrando persona')
     let index = APP.filesPerson.findIndex(person => person.id == APP.personSelected);
         let element = APP.filesPerson.find(person => person.id == APP.personSelected);
        //  console.log('borrar elemento');
         try {
            if(APP.personSelected){
            if(window.confirm('Are you sure you want to delete this person?')){
                CACHE.deleteFile(`${element.name}-${element.id}`)
                .then((result)=>{
                    console.log(index);
                    APP.filesPerson.splice(index,1);
                    // console.log(APP.filesPerson);
                    APP.getListPerson();
                    APP.navigate('home');
                })
                .catch((err)=>{
        
            APP.handleError(err);
         })
         }
        }else{
            throw new InvalidUserError(APP.personSelected);
        }
            
         } catch (error) {
            APP.handleError(error);
         }
        
  },

  registerWorker() {
    if('serviceWorker'in navigator){
      navigator.serviceWorker.register('./sw.js');
    }
  },

  handleError(err) {
    console.log(err.name);
    let messageBox = document.createElement('message-box');
    messageBox.innerHTML=`
            <h3 slot="title">Error</h3>
            <p slot="message">The actual message about things that have happened.</p>
            <span slot="done">Ok</span>`;
    messageBox.type = 'Error';
    messageBox.id ='error';
    messageBox.setAttribute('action',3);
    messageBox.setAttribute("removal", "");

    switch (err.name) {
            case 'NetworkError':
              console.warn ('Something went wrong. Status code: ' + err.status);
              break;
            case 'EmptyRecordsError':
                console.warn( "I have 0 data here" + err.message);
                document.getElementById('message').style = 'display:block';
              break;
              case 'InvalidUserError':
                messageBox.querySelector('p').textContent = 'Please select a thing to delete.'
                document.getElementById('message').after(messageBox);
              break;
              case 'EmptyInputError':
                console.warn('Input empty');
                messageBox.querySelector('p').textContent = 'Please enter information in the input field.'
                document.getElementById('message').after(messageBox);
                break;
            default:
                console.warn('Something went wrong, please try again. ' + err.message);
           
        }
    console.warn(err.message);
  },

};

document.addEventListener('DOMContentLoaded', APP.init);


