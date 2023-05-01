class NetworkError extends Error {
    constructor(msg, response) {
      super(msg);
      this.name = 'NetworkError';
      this.response = response;
      this.status = response.status;
      this.statusText = response.statusText;
    }

  }

  class EmptyRecordsError extends Error {
    constructor(msg, response) {
      super(msg);
      this.name = 'EmptyRecordsError';
      this.response = response;
      this.status = response.status;
      this.statusText = response.statusText;
    }

  }

  class TypeError extends Error {
    constructor(msg, response) {
      super(msg);
      this.name = 'TypeError';
      this.response = response;
      this.status = response.status;
      this.statusText = response.statusText;
    }

  }
  
  export { NetworkError,EmptyRecordsError, TypeError };
  
  /*
  Sample usage of custom NetworkError
  fetch(url)
    .then(response => {
      if( ! response.ok ) throw new NetworkError('Failed API Call', response);
      return response.json();
    })
    .then(data => {
      //you have the json data to use
    })
    .catch(err=>{
      //handle the error and tell the user
    });
  */