import data from "./data.js";

let datal1 = document.getElementById('categories');
let datal2 = document.getElementById('options');
let inputD = document.getElementById('categoriesD');

document.addEventListener('DOMContentLoaded', (ev) => {
    datal1.innerHTML = data
      .map((dessert) => { 
        return `<option value="${dessert.item}">${dessert.item}</option>`
      })
      .join(''); 
  
  });

  inputD.addEventListener('input', (ev)=>{
    let itemSelect = ev.target.value;
    let arrayFind = data.find((item, idx)=> {
        return(item.item === itemSelect);
        }).subitems;

    datal2.innerHTML = arrayFind
    .map((options)=>{ 
        return `<option value="${options}">${options}</option>`
      })
      .join(''); 

      // console.log(ev.target.value);
    // console.log(arrayFind);
    // console.log(arrayFind.s);
    // console.log(itemSelect);


  });

