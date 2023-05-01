import info from "./data.js"; //agregar extencion del archivo

let main = document.querySelector('main'); //leyendo el array y haciendo el HTML

let docF = document.createDocumentFragment(); 

let elemD = document.createElement("div");
elemD.classList.add('card');
main.append(elemD);

info.forEach((elementObj)=>{

  
    let elem =document.createElement(elementObj.tag);
   //  console.log(elem.getAttribute());
   elem.textContent = elementObj.content;
   if(elem.matches('h3')){
      elem.classList.add('card__title');
   } else{
      elem.classList.add('card__content');
   }
    if('children' in elementObj){
        // console.log(elementObj);
        elementObj.children.forEach(elemChild=>{

         let elemC =document.createElement(elemChild.tag);
             if(elemChild.tag == 'img'){

                elemC.setAttribute('src', elemChild.src);
                elemC.setAttribute('alt', elemChild.content);
                elemC.classList.add("card__img");
             }else{

                elem.textContent = elementObj.content;
                elem.classList.add('card__content');
             }
             elem.append(elemC);
         });
    }
   docF.append(elem);
});
elemD.append(docF);
main.append(elemD);

