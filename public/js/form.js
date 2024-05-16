const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', async e => {

  e.preventDefault(); // Detener el envío del formulario

  // Verificar si algún campo está vacío
  if (!nameInput.value || !emailInput.value || !messageInput.value) {
    // Mostrar una alerta utilizando SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, completa todos los campos.',
    });
    return; // Salir de la función si hay campos vacíos
  }

  // Obtener la fecha actual en la zona horaria local
  const currentDate = new Date();
  // Convertir la fecha a una cadena en formato horario Perú
  const formattedDate = currentDate.toLocaleString('es-PE', {
    timeZone: 'America/Lima',
  });

  await fetch('/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
      date: formattedDate, // Agregar la fecha formateada al objeto enviado
    }),
  });

  // Limpiar los campos después de enviar el mensaje
  nameInput.value = '';
  emailInput.value = '';
  messageInput.value = '';

  // Mostrar una alerta de éxito
  Swal.fire({
    icon: 'success',
    title: '¡Enviado!',
    text: 'Tu mensaje ha sido enviado correctamente.',
  });

});

/*const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  // Obtener la fecha actual en la zona horaria local
  const currentDate = new Date();
  // Convertir la fecha a una cadena en formato horario Perú
  const formattedDate = currentDate.toLocaleString('es-PE', {
    timeZone: 'America/Lima',
  });
  await fetch('/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
      date: formattedDate, // Agregar la fecha formateada al objeto enviado
    }),
  });
  nameInput.value = '';
  emailInput.value = '';
  messageInput.value = '';
});*/