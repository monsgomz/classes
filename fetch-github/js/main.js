
document.addEventListener('DOMContentLoaded', init);

function init(){

    let form = document.querySelector('form');
    form.addEventListener('submit', btnFetch);
}


function btnFetch(ev){
    
    ev.preventDefault();
    
    let username = document.getElementById('username').value;
    username = username.trim();
    console.log(username);
     let url = `https://api.github.com/users/${username}/repos`;
    let ul = document.querySelector('ul');
     document.getElementById('username').value = username;
    console.log(username.length);
    ul.innerHTML = '';

    if(username.length !== 0){

 fetch(url)
 .then((response)=>{
   if(!response.ok) throw new Error(response.statusText);
   console.log(response);
       return response.json();
     })
 .then((content)=>{

    console.log({content});
    if(content.length === 0 ){
        console.log('Error');
        document.getElementById('error-text').textContent = 'No data, please try again';

    } else{
   
    ul.innerHTML =
    content.map((item)=>{
        return `
        <li>
        <p><a href="${item.html_url}" target="_blank">${item.name}</a></p>
       <p>Watchers: ${item.watchers}</p>
       <p>Open Issues: ${item.open_issues}</p>
       </li>`;

    }).join(''); }

 })
 .catch((error) =>{
    document.getElementById('error-text').textContent = 'No data, please try again';

 });
} else{
    document.getElementById('error-text').textContent = 'Username empty, please try again';
}
}
