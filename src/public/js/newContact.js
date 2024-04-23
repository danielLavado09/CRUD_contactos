const btn = document.getElementById('btn');

$(document).ready(function() {
    $("#alert").hide();
});

$("#btn-alert").click(function() {
    $("#alert").hide();
});

btn.onclick = (e) => {
    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const relationship = document.getElementById('relationship').value;
    const address = document.getElementById('address').value; // Nuevo campo

    if (name == '' || phoneNumber == '' || email == '' || relationship == '' || address == '') { // Modificado para incluir todos los campos
        $("#alert").show();
        console.log("holaxxx")
    } else {
        console.log("hola")
        postData(name, phoneNumber, email, relationship, address); // Modificado para enviar todos los campos
    }
}

async function postData(name, phoneNumber, email, relationship, address) { // Modificado para recibir todos los campos
    const response = await fetch('/api/save', { // Modificado para el endpoint de guardar contactos
        method: 'POST',
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
