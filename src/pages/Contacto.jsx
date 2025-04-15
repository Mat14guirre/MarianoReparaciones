export default function Contacto() {
    return (
      <div className="pagina-contacto">
        <h1>Contacto</h1>
        <p>Podés comunicarte conmigo a través de WhatsApp, Instagram o completando el siguiente formulario.</p>
  
        <form className="formulario-contacto">
          <input type="text" placeholder="Tu nombre" required />
          <input type="email" placeholder="Tu email" required />
          <textarea placeholder="Tu mensaje..." required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }