document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
  
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Evitar que el formulario se envíe normalmente
  
      // Obtener los datos del formulario
      const formData = new FormData(contactForm);
      
      try {
        // Hacer la solicitud al servidor (aquí asumo que estás usando Fetch API)
        const response = await fetch("/send-message", {
          method: "post",
          body: formData
        });
  
        // Verificar si la respuesta del servidor es exitosa
        if (response.ok) {
          // Mostrar una alerta SweetAlert2 de éxito
          await Swal.fire({
            icon: 'success',
            title: '¡Enviado!',
            text: 'Gracias por tu mensaje.',
          });
          // Limpiar el formulario después de enviar
          contactForm.reset();
        } else {
          // Si la respuesta del servidor no es exitosa, mostrar una alerta SweetAlert2 de error
          throw new Error('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.');
        }
      } catch (error) {
        // Si hay un error en la solicitud, mostrar una alerta SweetAlert2 de error
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: error.message,
        });
        console.error('Error:', error);
      }
    });
  });
  