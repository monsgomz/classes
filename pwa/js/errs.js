class NetworkError extends Error {
  constructor(msg, response) {
    super(msg);
    this.name = 'NetworkError';
    this.response = response;
    this.status = response.status;
    this.text = response.statusText;
  }
}

class EmptyInputError extends Error {
  constructor(inputElement) {
    let msg = 'You need to enter information in the search input field.';
    super(msg);
    this.name = 'EmptyInputError';
    this.message = msg;
    this.element = inputElement; //para saber que input causa el error
  }
}

class EmptyRecordsError extends Error {
  constructor() {
    let msg = 'The selected item has no records';
    super(msg);
    this.name = 'EmptyRecordsError';
    this.message = msg;
  }
}

class InvalidUserError extends Error {
  constructor(msg) {
    msg = msg ?? 'There is no match for the provided user id'; //si es null muestra el mensaje
    super(msg);
    this.name = 'InvalidUserError';
    this.message = msg;
  }
}

export { NetworkError, InvalidUserError, EmptyInputError, EmptyRecordsError };
