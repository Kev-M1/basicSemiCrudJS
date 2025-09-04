class User {
  constructor(userName, userEmail) {
    this.name = userName;
    this.email = userEmail;
  }

  //Propiedades de la CLASE
  static #url = "https://jsonplaceholder.typicode.com/users";
  static #usersList = [];
  static #templateUsersListHTMLNode = document.createElement('ul');

  static getUrl() {
    return this.#url;
  }

  static getUsersList() {
    return this.#usersList;
  }

  //Solicitud de datos HTTP Request GET (Crud, Read)
  static async getAllUsersDataFromServer() {
    try {
      const response = await fetch(this.#url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer token'
        },
      });
      if (!response.ok) {
        throw response;
      }
      this.#usersList = await response.json();
      return this.#usersList;
    } catch (error) {
      throw error;
    }
  }

  //Solicitud de datos HTTP Request POST (Crud, Create)
  static async sendNewUserToServer(u) {
    try {
      const response = await fetch(this.#url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token'
        },
        body: JSON.stringify(
          u
        ),
      });
      if (!response.ok) {
        throw response;
      }

      const newUser = await response.json();
      this.#usersList.push(newUser);
      return newUser;


    } catch (error) {
      throw error;
    }
  }

  //Renderización Información
  //Creación de cada li
  static createLiElements(user) {
    let item = document.createElement('li');
    item.textContent = `${user.name}`;
    return item;
  }

  //Renderización
  static renderUsersData() {
    this.#templateUsersListHTMLNode.innerHTML = ``;
    this.#usersList.forEach(user => {
      this.#templateUsersListHTMLNode.appendChild(this.createLiElements(user));
    });
    return this.#templateUsersListHTMLNode;
  }
}



async function main() {
  try {
    console.log('HolaMundo');

    //HTML Elements
    const userNameInput = document.querySelector('#user-name');
    const userEmailInput = document.querySelector('#user-email');
    const btnCreateUser = document.querySelector('#btn-create-user');
    const btnShowUsers = document.querySelector('#btn-show-users');
    const usersListContainer = document.querySelector('#users-list-container');

    //Events
    btnShowUsers.addEventListener('click', async (event) => {
      try {
        await User.getAllUsersDataFromServer();
        usersListContainer.appendChild(User.renderUsersData());

      } catch (e) {
        console.log('Error en evento ShowUsers', e);
      }
    })

    btnCreateUser.addEventListener('click', async (event) => {
      try {
        const newUser = new User(userNameInput.value, userEmailInput.value);
        await User.sendNewUserToServer(newUser);
        User.renderUsersData();

        userNameInput.value = ``;
        userEmailInput.value = ``;
      } catch (e) {
        console.log('Error en evento CreateUser', e);
      }
    })
  } catch (error) {
    console.log(`Error, reason:  `, error);
  }
}
main();