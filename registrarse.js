document.addEventListener("DOMContentLoaded", function() {
    let lStr = localStorage;
    let nombre = document.getElementById('nombre');
    let lastName = document.getElementById('LastName');
    let email = document.getElementById("Email");
    let password1 = document.getElementById('Password');
    let confirmPassword = document.getElementById('ConfirmPassword');
    let guardarUsuarioForm = document.querySelector('form');

    guardarUsuarioForm.addEventListener("submit", function(event){
        event.preventDefault(); // Evitar que el formulario se envíe por defecto

        // Obtener la lista actual de usuarios del localStorage
        let usuarios = JSON.parse(lStr.getItem("usuarios")) || [];

        // Verificar si el nombre de usuario ya existe en la lista
        let usuarioExistente = usuarios.find(usuario => usuario.nombre === nombre.value);
        if (usuarioExistente) {
            alert("El nombre de usuario ya está registrado. Por favor, elija otro nombre.");
            return; // Detener la ejecución si el nombre de usuario ya existe
        }

        // Crear un nuevo objeto de usuario con la información del formulario
        let nuevoUsuario = {
            nombre: nombre.value,
            lastName: lastName.value,
            email: email.value,
            password: password1.value
        };

        // Agregar el nuevo usuario a la lista
        usuarios.push(nuevoUsuario);

        // Guardar la lista actualizada en el localStorage
        lStr.setItem("usuarios", JSON.stringify(usuarios));

        // Limpiar los campos del formulario
        nombre.value = "";
        lastName.value = "";
        email.value = "";
        password1.value = "";
        confirmPassword.value = "";

        // Redirigir al usuario a la página de inicio de sesión después de registrar
        window.location.href = "login.html";
    });

    //Mostrar texto de contraseña
    let passwordInput = document.getElementById('Password');
    let confirmPasswordInput = document.getElementById('ConfirmPassword');
    let togglePasswordBtn = document.getElementById('togglePassword');
    let toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

    togglePasswordBtn.addEventListener("click", function(){
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        togglePasswordBtn.classList.toggle("fa-eye");
        togglePasswordBtn.classList.toggle("fa-eye-slash");
    });

    toggleConfirmPasswordBtn.addEventListener("click", function(){
        confirmPasswordInput.type = confirmPasswordInput.type === "password" ? "text" : "password";
        toggleConfirmPasswordBtn.classList.toggle("fa-eye");
        toggleConfirmPasswordBtn.classList.toggle("fa-eye-slash");
    });

    function recuperarValores() {
        let usuarios = JSON.parse(lStr.getItem("usuarios")) || [];

        // Suponiendo que el primer usuario de la lista es el que queremos mostrar
        if (usuarios.length > 0) {
            let primerUsuario = usuarios[0];
            nombre.value = primerUsuario.nombre;
            lastName.value = primerUsuario.lastName;
            email.value = primerUsuario.email;
            password1.value = primerUsuario.password;
            confirmPassword.value = primerUsuario.password;
        }
    }

    document.addEventListener("DOMContentLoaded", recuperarValores);
});
