const update = document.getElementById('update');

// Obtenemos los parámetros enviados por la URL ****************************
const values = window.location.search;
// Creamos la instancia
const urlParams = new URLSearchParams(values);
// Accedemos a los valores
var id = urlParams.get('id');
var nameParam = urlParams.get('name');
var phoneNumberParam = urlParams.get('phoneNumber');
var emailParam = urlParams.get('email');
var relationshipParam = urlParams.get('relationship');
var addressParam = urlParams.get('address'); // Nuevo campo

// Elementos del DOM *********************************************************
const name = document.getElementById('name');
const phoneNumber = document.getElementById('phoneNumber');
const email = document.getElementById('email');
const relationship = document.getElementById('relationship');
const address = document.getElementById('address'); // Nuevo campo

// Asignamos los valores ****************************************************
name.value = nameParam;
phoneNumber.value = phoneNumberParam;
email.value = emailParam;
relationship.value = relationshipParam;
address.value = addressParam; // Nuevo campo

$(document).ready(function () {
    $("#alert-edit").hide();
});

$("#btn-alert-edit").click(function () {
    $("#alert-edit").hide();
});

update.onclick = () => {
    const nameValue = name.value;
    const phoneNumberValue = phoneNumber.value;
    const emailValue = email.value;
    const relationshipValue = relationship.value;
    const addressValue = address.value; // Nuevo campo

    if (nameValue == '' || phoneNumberValue == '' || emailValue == '' || relationshipValue == '' || addressValue == '') { // Modificado para incluir todos los campos
        $("#alert-edit").show();
    } else {
        updateData(id, nameValue, phoneNumberValue, emailValue, relationshipValue, addressValue); // Modificado para enviar todos los campos
        window.location.href = '/';
    }

}

// Función para actualizar un contacto

async function updateData(id, name, phoneNumber, email, relationship, address) { // Modificado para recibir todos los campos
    const response = await fetch('/api/update/' + id, { // Modificado para el endpoint de actualizar contactos
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'phoneNumber': phoneNumber,
            'email': email,
            'address': address,
            'relationship': relationship
        })

    });

    const data = await response.json();
    console.log(data);
}
