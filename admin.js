 // Mostrar botón de logout
document.getElementById('logoutButton').style.display = 'inline-block';
// Evento de clic para el botón de logout
document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el enlace redireccione

    // Limpiar datos de sesión almacenados en el localStorage
    localStorage.removeItem('savedName');
    localStorage.removeItem('rememberStatus');
    localStorage.removeItem('rememberedName');

    // Redireccionar a la página de inicio de sesión
    window.location.href = '../index.html';
});
document.getElementById('mostrarUsuarioButton').addEventListener('click', function() {
    mostrarUsuario();
});

function mostrarUsuario() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Limpiar el contenido de la lista de usuarios
    document.getElementById('usuariosList').innerHTML = '';

    if (usuarios.length > 0) {
        usuarios.forEach(function(usuario, index) {
            let usuarioItem = document.createElement('div');
            usuarioItem.innerHTML = `
                <p>Usuario ${index + 1}</p>
                <p>Nombre: ${usuario.nombre}</p>
                <p>Apellido: ${usuario.lastName}</p>
                <p>Email: ${usuario.email}</p>
                <button class="eliminarUsuarioButton" data-index="${index}">Eliminar</button>
            `;
            document.getElementById('usuariosList').appendChild(usuarioItem);
        });
    } else {
        document.getElementById('usuariosList').textContent = 'No hay usuarios registrados.';
    }

    // Agregar event listener a cada botón de eliminación
    let eliminarUsuarioButtons = document.querySelectorAll('#eliminarUsuarioButton');
    eliminarUsuarioButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let index = this.getAttribute('data-index');
            eliminarUsuario(index);
        });
    });
}

function eliminarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuario();
    }
}


function mostrarUsuario() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Limpiar el contenido de la lista de usuarios
    document.getElementById('usuariosList').innerHTML = '';

    if (usuarios.length > 0) {
        usuarios.forEach(function(usuario, index) {
            let usuarioItem = document.createElement('div');
            usuarioItem.innerHTML = `
                <p>Usuario ${index + 1}</p>
                <p>Nombre: ${usuario.nombre}</p>
                <p>Apellido: ${usuario.lastName}</p>
                <p>Email: ${usuario.email}</p>
                <button class="eliminarUsuarioButton" data-index="${index}">Eliminar</button>
                <button class="editarUsuarioButton" data-index="${index}">Editar</button>
            `;
            document.getElementById('usuariosList').appendChild(usuarioItem);
        });
    } else {
        document.getElementById('usuariosList').textContent = 'No hay usuarios registrados.';
    }

    // Agregar event listener a cada botón de eliminación
    let eliminarUsuarioButtons = document.querySelectorAll('.eliminarUsuarioButton');
    eliminarUsuarioButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let index = this.getAttribute('data-index');
            eliminarUsuario(index);
        });
    });

    // Agregar event listener a cada botón de edición
    let editarUsuarioButtons = document.querySelectorAll('.editarUsuarioButton');
    editarUsuarioButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let index = this.getAttribute('data-index');
            editarUsuario(index);
        });
    });
}

function eliminarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuario();
    }
}

function editarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuario = usuarios[index];
    let nuevoNombre = prompt("Introduce el nuevo nombre:", usuario.nombre);
    let nuevoLastName = prompt("Introduce el nuevo apellido:", usuario.lastName);
    let nuevoEmail = prompt("Introduce el nuevo email:", usuario.email);
    let nuevaPassword = prompt("Introduce la nueva contraseña:", usuario.password);
    
    // Verificar si se canceló la edición
    if (nuevoNombre === null || nuevoLastName === null || nuevoEmail === null || nuevaPassword === null) {
        return;
    }

    // Actualizar los datos del usuario
    usuarios[index].nombre = nuevoNombre;
    usuarios[index].lastName = nuevoLastName;
    usuarios[index].email = nuevoEmail;
    usuarios[index].password = nuevaPassword;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuario();
}
