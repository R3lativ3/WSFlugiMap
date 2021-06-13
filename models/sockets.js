const Marcadores = require("./Marcadores");
const getId = require('../models/Auth/index')


class Sockets {

    constructor( io ) {

        this.io = io;

        this.marcadores = new Marcadores()

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection',  ( socket ) => {
            console.log(socket.id)
            socket.emit('marcadores-activos', this.marcadores.activos)
    
            socket.on('marcador-nuevo', async (marcador) => {
                console.log(marcador)
                console.log('Agregando marcador')
                this.marcadores.agregarMarcador(marcador)
                socket.broadcast.emit('marcador-nuevo', marcador)

            })

            socket.on('marcador-actualizado', async (marcador) => {
                console.log(marcador)
                console.log('Actualizando marcador')
                this.marcadores.actualizarMarcador( marcador )
                socket.broadcast.emit('marcador-actualizado', marcador)
            
            })
        
        });
    }


}


module.exports = Sockets;