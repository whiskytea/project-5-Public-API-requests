
let apiURL = "https://randomuser.me/api/?results=12&nat=us";
let employeeList = [];

function getEmployees(url){
    return fetch(url)
        .then(res => res.text())
        .catch(error => console.log('Something broke', error))
        // .then(data => data.map(person => new Employee(person.name, person.email, person.location)));
        .then(data => {
            console.log(data);
            let persons = generateEmployees(data.results);
            data.results[0];
        })
}


//helper functions

function generateEmployees(data){   // creates an array of employee class objects

    for(let i=0;i<data.length;i++){
        employeeList.push(new Employee(`${data[i].name.first} ${data[i].name.last}`, data[i].email, data[i].location.city, data[i].location.state,
            data[i].cell, combineAddress(data[i].location), formatBirthday(data[i].dob.date)));
    }
}

console.log(employeeList);

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

function combineAddress(addr){
    return `${addr.street.number} ${addr.street.name}, ${addr.city}, ${addr.state}, ${addr.postcode}`
}

class Employee {
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

//call the fetch function

getEmployees(apiURL);


//load employees onto the page
let gallery = document.getElementById('gallery');
function loadEmployees(employeeList){
    let list = employeeList;
    console.log(list);
    let pop = list.pop();
    console.log(pop);
    // ){
    //     console.log(employee);
    //     gallery.insertAdjacentHTML('beforeend', buildContactCard(list[i]));
    // }

}



//helper functions

function buildContactCard(employee){
    return `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
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
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.state}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${employee.fullAddress}</p>
                        <p class="modal-text">Birthday: ${employee.birthday}</p>
                    </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
    `
}