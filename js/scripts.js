console.log('test');
let apiURL = "https://randomuser.me/api/?results=12&nat=us&inc=name,email,location";

function getEmployees(url){
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log('Something broke', error))
        .then(data => data.results);
}

function mapEmployees(data){

}

let employees = getEmployees(apiURL);

console.log(employees);

