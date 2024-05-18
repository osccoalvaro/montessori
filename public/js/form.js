const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const apellidoInput = document.getElementById('apellido');
const dniInput = document.getElementById('dni');
const emailInput = document.getElementById('email');
const felefonoInput = document.getElementById('felefono');
const gradoInput = document.getElementById('grado');


contactForm.addEventListener('submit', async e => {

  e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
  // Obtener la fecha actual en la zona horaria local
  const currentDate = new Date();
  // Convertir la fecha a una cadena en formato horario Perú
  const formattedDate = currentDate.toLocaleString('es-PE', {
    timeZone: 'America/Lima',
  });
  try {
    const response = await fetch('/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput.value,
        apellido: apellidoInput.value,
        dni: dniInput.value,
        email: emailInput.value,
        felefono: felefonoInput.value,
        grado: gradoInput.value,
        date: formattedDate, // Agregar la fecha formateada al objeto enviado
      }),
    });
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Tu mensaje ha sido enviado exitosamente.',
      });
      nameInput.value = '';
      apellidoInput.value = '';
      dniInput.value = '';
      emailInput.value = '';
      felefonoInput.value = '';
      gradoInput.value = '';
    } else {
      const errorData = await response.json();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al enviar el mensaje: ${errorData.error}`,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al enviar el mensaje.',
    });
  }
  
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