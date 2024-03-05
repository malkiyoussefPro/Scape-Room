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

// Función para modificar usuario, contraseña y correo electrónico
document.getElementById('editUserButton').addEventListener('click', function() {
    // Obtener el botón "Modificar Usuario"
  const editUserButton = document.getElementById('editUserButton');
  
  // Función para crear el formulario de modificación de usuario
  function createEditUserForm() {
      // Crear el formulario
      const form = document.createElement('form');
      form.id = 'editUserForm';
  
      // Crear los campos del formulario
      const newNameLabel = document.createElement('label');
      newNameLabel.for = 'newName';
      newNameLabel.textContent = 'Nuevo nombre de usuario:';
      const newNameInput = document.createElement('input');
      newNameInput.type = 'text';
      newNameInput.id = 'newName';
      newNameInput.name = 'newName';
  
      const newPasswordLabel = document.createElement('label');
      newPasswordLabel.for = 'newPassword';
      newPasswordLabel.textContent = 'Nueva contraseña:';
      const newPasswordInput = document.createElement('input');
      newPasswordInput.type = 'password';
      newPasswordInput.id = 'newPassword';
      newPasswordInput.name = 'newPassword';
  
      const newEmailLabel = document.createElement('label');
      newEmailLabel.for = 'newEmail';
      newEmailLabel.textContent = 'Nuevo correo electrónico:';
      const newEmailInput = document.createElement('input');
      newEmailInput.type = 'email';
      newEmailInput.id = 'newEmail';
      newEmailInput.name = 'newEmail';
  
      // Crear el botón de enviar
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Guardar cambios';
  
      // Agregar los campos al formulario
      form.appendChild(newNameLabel);
      form.appendChild(newNameInput);
      form.appendChild(document.createElement('br'));
      form.appendChild(document.createElement('br'));
  
      form.appendChild(newPasswordLabel);
      form.appendChild(newPasswordInput);
      form.appendChild(document.createElement('br'));
      form.appendChild(document.createElement('br'));
  
      form.appendChild(newEmailLabel);
      form.appendChild(newEmailInput);
      form.appendChild(document.createElement('br'));
      form.appendChild(document.createElement('br'));
  
      form.appendChild(submitButton);
  
      // Agregar el formulario al DOM
      document.getElementById('profile-section').appendChild(form);
  }
  
  // Escuchar el evento de clic en el botón "Modificar Usuario"
  editUserButton.addEventListener('click', function() {
      // Crear el formulario de modificación de usuario
      createEditUserForm();
  });
  
  });
  

// Función para eliminar usuario
document.getElementById('deleteUserButton').addEventListener('click', function() {
    if (confirm("¿Estás seguro de que quieres eliminar tu usuario?")) {
        localStorage.removeItem('savedName');
        document.getElementById('userName').innerText = "";
        alert("¡Usuario eliminado con éxito!");
        // Redireccionar a la página de bienvenida
        window.location.href = '/index.html';
    }
});
