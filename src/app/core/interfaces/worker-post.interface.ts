export interface WorkerPost {
    id: string; // UUID en formato string
    photo: string; // Foto del trabajador
    typeId: string; // UUID del tipo de usuario
    authid: string; // Id del usuario en Firebase
    email: string; // Email del cliente
  
    // Datos de la  persona
    typedocumentId: string; // UUID del tipo de documento
    numerodoc: string; // Número de documento
    name: string; // Nombre de la persona
    firstname: string; // Primer apellido
    lastname: string; // Segundo apellido
    address: string; // Dirección de la persona
    phone: string; // Teléfono de la persona
  }

  