 import CACHE from './cache.js';

/**
 * @author M Montserrat Gomez Angeles
 * @description Cache API, All the DOM functionality and control of the application happens in this file. 
 *              All the code dealing with the Cache is in the cache.js file.
 */

/**
 * @description access the cache, then display files and then show all the current files
 */
const APP = {
  itemList: [],
  init() {
    CACHE.init('gome0145');
    document.getElementById('btnItem').addEventListener('click', APP.addItem);
    document.getElementById('btnList').addEventListener('click', APP.saveListAsFile);
    document.getElementById('file_list').addEventListener('click', APP.displayFileContents);
    APP.displayListFiles();
    APP.displayList();
  },

  /**
   * 
   * @param {*} ev 
   * @returns 
   * @description add an item to the list
   */
  addItem(ev) {
    ev.preventDefault();
    let item = document.getElementById('gItem').value;
    item = item.trim();
    if (!item) return;
    APP.itemList.push(item);
    APP.displayList();
  },

  /**
   * @description populate the list of items and clear de input
   */
  displayList() {
    let list = document.getElementById('item_list');
    if (APP.itemList.length === 0) {
      list.innerHTML = 'No Items currently.';
    } else {
      list.innerHTML = APP.itemList
        .map((txt) => {
          return `<li>${txt}</li>`;
        })
        .join('');
    }
    document.getElementById('gItem').value = '';
  },

  /**
   * 
   * @param {*} ev 
   * @description turn the data from the list into the contents for a json file, then create a file with the json
    ,create a response object to hold the file, and then save the response in the cache
   */
  saveListAsFile(ev) {
    ev.preventDefault();
    if(APP.itemList.length !== 0){
      let dataJ = JSON.stringify(APP.itemList);
      let file = new File([dataJ], 'file'+Date.now(), { type: 'application/json', lastModified: Date.now() });
      let filename = `file-${Date.now() }.json`;
      let request = new Request(`.data/${filename}`);
      let response = new Response(file,{
        status: 200,
        statusText:'ok',});
      CACHE.put(request,response);
    }
      APP.itemList = [];
      APP.displayList();
      APP.displayListFiles();
      document.getElementById('item_list').innerHTML = '';
    
    
  },

/**
 * @description Display all the files inside the Cache
 */
  displayListFiles(){
    CACHE.listFiles()
    .then((keys) => { 
      document.getElementById('file_list').innerHTML=
      keys.map((key) => {
        let value = key.url.toString();
        let data = value.indexOf('file');
        let a =value.substring(data,value.length);
        return `<li>
                <span>${a}</span>
                <button id="delete">Delete File</button>
                </li>`;
     }).join('');
  }).catch(console.warn); ;

  },

  /**
   * 
   * @param {*} ev 
   * @description get the list item from the file, and show its contents in the <pre><code> area
   */
  displayFileContents(ev) {
    if(ev.target.tagName === 'SPAN'){
      document.getElementById('file-content').innerHTML = " File Content: "+ ev.target.textContent;
      CACHE.contentFile(ev.target.textContent)
      .then(matchResponse=>{
        return matchResponse.json();
       })
      .then((contents)=>{
          document.getElementById('content').innerHTML = 
          contents.map((element) =>{
            return `<p>${element}</p>`
          }).join(' ');
      }).catch(console.warn); 
    }else{ APP.deleteFile(ev); }
  },

   /**
    * 
    * @param {*} ev 
    * @description delete method
    */
  deleteFile(ev) {
    ev.preventDefault();
    let element = ev.target;
    CACHE.deleteFile(element.previousElementSibling.textContent)
    .then((element)=>{
      return element;
    }).catch(console.warn);
    document.getElementById('content').innerHTML = '';
    APP.displayListFiles();
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
