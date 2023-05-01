
document.addEventListener('DOMContentLoaded', init);

function init(){

    let btn1 = document.getElementById('btn-section1');
    btn1.addEventListener('click', btnFetch);
    let btn2 = document.getElementById('btn-section2');
    btn2.addEventListener('click', btnFetch);
    let btn3 = document.getElementById('btn-section3');
    btn3.addEventListener('click', btnFetch);
}

function btnFetch(ev){

     let url = `https://api.reddit.com/r/${ev.target.dataset.url}.json`;
     let id = ev.target.id;
     let ul;
     

    switch(id){

    case 'btn-section1':

         ul = document.getElementById('ul-section1');
        break;
    case 'btn-section2':

        ul = document.getElementById('ul-section2');
        break;
    case 'btn-section3':

         ul = document.getElementById('ul-section3');
        break;
    

    }

fetch(url)
.then((response)=>{

    if(!response.ok) throw new Error(response.statusText);
        console.log(response.status, response.statusText);

        return response.json();
})
.then((contents)=>{
    
    ul.innerHTML =
    contents.data.children.map((item)=>{
        return `
        <li>${item.data.title}</li>`;

    }).join('');

 })
 .catch(console.warn);
}
