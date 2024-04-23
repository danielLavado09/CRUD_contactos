async function getContacts() {
    const response = await fetch('/api/contacts');
    const data = await response.json();
    console.log(data);
    const showContacts = document.getElementById('show-contacts');

    if (data.contacts.length == 0) {

        $('#message').text('No existen contactos que mostrar');

    } else {
        $('#message').text('');

        for (let i = 0; i < data.contacts.length; i++) {

            const id = data.contacts[i]._id;
            const name = document.createElement('h5');
            const phoneNumber = document.createElement('p');
            const email = document.createElement('p');
            const relationship = document.createElement('p');
            const address = document.createElement('p'); // Nuevo campo
            const btnDelete = document.createElement('button');
            const btnShow = document.createElement('button');
            const btnEdit = document.createElement('button');
            const contact = document.createElement('div');
            const btnDiv = document.createElement('div');
            const btnForm = document.createElement('form');

            contact.className = 'card mb-3 px-2 py-2 card-contact';
            btnDiv.className = 'd-flex flex-row mt-2';

            name.textContent = data.contacts[i].name;

            phoneNumber.textContent = 'Teléfono: ' + data.contacts[i].phoneNumber;
            email.textContent = 'Correo: ' + data.contacts[i].email;
            relationship.textContent = 'Parentezco: ' + data.contacts[i].relationship;
            address.textContent = 'Dirección: ' + data.contacts[i].address; // Nuevo campo

            // Características de los botones del DOM:

            btnShow.className = 'btn btn-primary btn-sm';
            btnShow.id = "show" + i;
            btnShow.textContent = 'Mostrar';
            btnDelete.type = "button";

            btnEdit.className = 'btn btn-success btn-sm mx-3';
            btnEdit.id = "edit" + i;
            btnEdit.textContent = 'Editar';
            btnEdit.type = "button";

            btnDelete.className = 'btn btn-danger btn-sm';
            btnDelete.id = "delete" + i;
            btnDelete.textContent = 'Eliminar';
            btnDelete.type = "submit";

            // Añadimos los elementos del DOM

            contact.append(name);
            contact.append(phoneNumber);
            contact.append(email);
            contact.append(relationship);
            contact.append(address); // Nuevo campo
            btnDiv.append(btnShow);
            btnForm.append(btnEdit);
            btnForm.append(btnDelete);
            btnDiv.append(btnForm);

            contact.append(btnDiv);
            showContacts.append(contact);

            // Botón mostrar modal
            btnShow.onclick = () => {
                $('#myModal').modal('show');
                $('#modal-title').text(data.contacts[i].name);
                $('#content-body').html('<p><strong>Teléfono:</strong> ' + data.contacts[i].phoneNumber + '</p>' +
                                       '<p><strong>Correo:</strong> ' + data.contacts[i].email + '</p>' +
                                       '<p><strong>Parentezco:</strong> ' + data.contacts[i].relationship + '</p>' +
                                       '<p><strong>Dirección:</strong> ' + data.contacts[i].address + '</p>'); // Nuevo campo
            }

            // Botón de eliminar
            btnDelete.onclick = () => {
                console.log(id);
                deleteContact(id);
            }

            // Botón de editar
            btnEdit.onclick = () => {
                const name = data.contacts[i].name;
                const phoneNumber = data.contacts[i].phoneNumber;
                const email = data.contacts[i].email;
                const relationship = data.contacts[i].relationship;
                const address = data.contacts[i].address; // Nuevo campo
                window.location.href = 'edit.html?id=' + id + '&name=' + name + '&phoneNumber=' + phoneNumber + '&email=' + email + '&relationship=' + relationship + '&address=' + address; // Nuevo campo
            }
        }
    }
}

// Función para eliminar un contacto
async function deleteContact(id) {
    await fetch('/api/delete/' + id, {
        method: 'DELETE'
    }).then(res => res.text()).then(res => console.log(res))
}

getContacts();
