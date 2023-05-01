const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    
    :host{
      display: block;
      --myvar: #bada55;
      
    }

    .message{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 6rem;
      width: 60%;
      margin-left: 1rem;
      border-radius: 5rem;
    }


    .message > div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .message.Error{
      background-color: #CD4652;
      color: #fff;
      border-top: 1rem solid hsl(0, 90%, 20%);
    }
    @media only screen and (min-width: 30em) {
      .message{
        margin-left: 1rem;
        width: 90%;
      }
   
  }

  @media only screen and (min-width: 45em) {
  .message{
        margin-left: 1rem;
        width: 90%;
      }
  }

  @media only screen and (min-width: 60em) {
    .message{
        margin-left: 16rem;
        width: 60%;
      }

  }

  </style>
  <div class="message">
    <div>
      <span class="material-symbols-outlined"></span>
    </div>
    <div>
      <slot name="title">Message</slot>
      <slot name="message">Easter Egg</slot>
      <p class="actions">
        <button><slot name="done"></slot></button>
      </p>
    </div>
  </div>
`;

class MessageBox extends HTMLElement {
  static defaultDelay = 5000; //static prop  default time to remove the message box
  #timmy = null; //private variable

  constructor() {
    super(); //create connection with the HTMLElement  -> use with extends
    this.root = this.attachShadow({ mode: 'closed' });
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);
    this.div = this.root.querySelector('div.message');
  }

  static get observedAttributes() {
    return ['type', 'action', 'removal'];
  }
  get type() {
    //when someone asks for a property, get the value from the attribute
    return this.getAttribute('type');
  }
  set type(value) {
    //when someone updates a property, update the attribute too
    this.setAttribute('type', value);
  }

  get action() {
    return this.getAttribute('action');
  }
  set action(value) {
    this.setAttribute('action', value);
  }
    get removal() {
    return this.getAttribute('removal');
  }
  set removal(value) {
    this.setAttribute('removal', value);
  }

  connectedCallback() { 
    //when the component is added to the DOM
    //check for the removal property... set a default value for timeout
    let btnSlot = this.div.querySelector('.actions slot');
    if(btnSlot.assignedNodes().length==0){
      this.div.querySelector('.actions').remove();  //remove the paragraph to the button if it no has one
    }else{
      let btn = this.div.querySelector('.actions button');
      btn.addEventListener('click', this.handleClick.bind(this)); //this.handleClick.bind(this)  with the bind the word this refers to the webcomponent and not with the button in the event
   
      // this.handleClick.bind(this) - make a copy and wait to call it later using the mb as 'this'
      // this.handleClick.apply(this) - run the function handleClick right now and use mb as 'this'
      // this.handleClick.call(this, a, c, b) - run the function handleClick right now and use mb as 'this'
    };
  }

  handleClick(ev){

    console.log(this.doRemove);
    //when the user clicks the button
    //this.action was set in attributeChangedCallback
    if(this.action && this.action in window && typeof window[this.action] === 'function'){
      window[this.action]();
    }

    //stop the timeout running if there is one
    //and remove it from the screen
    if(this.doRemove){
      window.document.querySelector('message-box').remove();
    }
  }

  disconnectedCallback() {
    //when the component is removed from the DOM
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    //when an attribute is added or changed
    if(oldVal !== newVal){
      switch(attrName){
        case 'type':
          this.div.querySelector('.material-symbols-outlined').textContent = newVal;
          this.div.classList.add(newVal);
          break;

        case 'action':
          this.action = newVal;
          console.log(this.action);
          break;

        case 'removal':
          console.log('Removal', this.removal);
          if(this.removal ==='' || (this.removal && !isNaN(this.removal))){
            //the attribute exists but has no value
            //still want to delete the message-box with the click
            this.doRemove = true;
          }else{
            this.doRemove = false;
          }
          break;

      }
    }
  }
  
  #privateMethod () {
    //can only be called from inside the component
  }
  publicMethod () {
    //can be called from web page
  }
}


window.customElements.define('message-box', MessageBox);