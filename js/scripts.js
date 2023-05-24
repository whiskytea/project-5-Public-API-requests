
let apiURL = "https://randomuser.me/api/?results=12&nat=us";


function getEmployees(url){
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log('Something broke', error))
        // .then(data => data.map(person => new Employee(person.name, person.email, person.location)));
        .then(data => {
            let employees = generateEmployees(data.results);
            loadEmployees(employees);
        })
}

getEmployees(apiURL);

//helper functions - API JSON

function generateEmployees(_data){   // creates an array of employee class objects
    let employeeList = [];
    let data = _data;
    for(let i=0;i<data.length;i++){
        employeeList.push(new Employee(data[i].picture.medium, `${data[i].name.first} ${data[i].name.last}`, data[i].email, data[i].location.city, data[i].location.state,
            data[i].cell, combineAddress(data[i].location), formatBirthday(data[i].dob.date)));
    }
    return employeeList;
}

function formatBirthday(date){ // format: MM/DD/YYYY
    let _date = new Date(date);
    let month = _date.getMonth();
    let day = _date.getDay();

    //fixes "6" to "06"
    if(month < 10){
        month = `0${month}`
    }
    if(day < 10){
        day = `0${day}`
    }

    return `${month}/${day}/${_date.getFullYear()}`

}

function combineAddress(addr){ // does what it says on the tin
    return `${addr.street.number} ${addr.street.name}, ${addr.city}, ${addr.state}, ${addr.postcode}`
}

class Employee { // employee class objects are a little extra here, but I like the easy access params
    constructor(profileIMG, name, email, city, state, cell, fullAddress, birthday) {
        this.profileIMG = profileIMG;
        this.name = name;
        this.email = email;
        this.city = city;
        this.state = state;
        this.cell = cell; //(XXX) XXX-XXXX
        this.fullAddress = fullAddress; //format [street], [city], [state], [zip]
        this.birthday = birthday;
    }
}

function loadEmployees(employeeList){ //load employees onto the page
    let list = employeeList;
    let gallery = document.getElementById('gallery');
    for (let i = 0; i<employeeList.length; i++){ //first generate all the employee cards
        gallery.insertAdjacentHTML('beforeend', buildContactCard(list[i]));
    }
    for (let i = 0; i<employeeList.length; i++){ //then cycle again and create the modals
        gallery.insertAdjacentHTML('beforeend', buildModalCard(list[i]));
    }
    addCardEventListeners();
    addModalDisplayListeners();
    addModalCarouselListeners();
}

//helper functions - employee cards

function addCardEventListeners() {
    let cards = document.getElementsByClassName('card');
    for (let i=0; i<cards.length; i++){
        cards[i].addEventListener('click', function() {
            // displayModal(cards[i].name);
            // let id = cards[i].id;
            displayModal(cards[i].id)
        });
    }
}

function addModalDisplayListeners(){
    let modalsCloseBtn = document.getElementsByClassName('modal-close-btn');
    for (let i=0; i<modalsCloseBtn.length; i++){
        modalsCloseBtn[i].addEventListener('click', function() {
            modalsCloseBtn[i].parentNode.parentNode.style.display = "none";
        });
    }
}

function addModalCarouselListeners(){
    let modalPrev = document.getElementsByClassName('modal-prev');
    let modalNext = document.getElementsByClassName('modal-next');
    for (let i=1; i<modalPrev.length; i++){ //adds a "prev button" action to all modals after the 1st
        modalPrev[i].addEventListener('click', function() {
            modalPrev[i].parentNode.parentNode.parentNode.style.display = "none";
            modalPrev[i-1].parentNode.parentNode.parentNode.style.display = "block";
        });
    }
    for (let i=0; i<modalNext.length-1; i++){ //adds a "next button" action to all modals before the last
        modalNext[i].addEventListener('click', function() {
            modalNext[i].parentNode.parentNode.parentNode.style.display = "none";
            modalNext[i+1].parentNode.parentNode.parentNode.style.display = "block";
        });
    }
}

function buildContactCard(employee){
    return `
    <div class="card" id="${employee.name}">
        <div class="card-img-container">
            <img class="card-img" src="${employee.profileIMG}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.city}, ${employee.state}</p>
        </div>
    </div>
    `
}

function buildModalCard(employee){
    return `
    <div class="modal-container" id="${employee.name}">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${employee.profileIMG}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.state}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${employee.fullAddress}</p>
                        <p class="modal-text">Birthday: ${employee.birthday}</p>
                    </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
    `
}

function displayModal(id) { //finds the right modal to display
    let modals = document.getElementsByClassName('modal-container');
    let _id = id;
    for (let i=0; i<modals.length; i++){
        if (modals[i].id === _id){
            modals[i].style.display = 'block';
        }

    }
}
