class Usuario {
    constructor (nombre, apellido, mail, password)
    {
        this.nombre=nombre;
        this.apellido=apellido;
        this.mail=mail; 
        this.password=password;
    }
    
    registrar(nombreIngresado,apellidoIngresado,mailIngresado,pwdIngresado)
    { 
        const newRegistro = new Usuario(nombreIngresado, apellidoIngresado, mailIngresado,pwdIngresado)

        localStorage.setItem(mailIngresado,JSON.stringify(newRegistro));
    }
}
