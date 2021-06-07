const Marcadores = require("./Marcadores");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.marcadores = new Marcadores()

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            socket.emit('marcadores-activos', this.marcadores.activos)
    
            socket.on('marcador-nuevo', (marcador) => {
                console.log('igual a actualizado')
                console.log(marcador)
                this.marcadores.agregarMarcador(marcador)
                socket.broadcast.emit('marcador-nuevo', marcador)
            })

            socket.on('marcador-actualizado', (marcador) => {
                console.log('actualizado')
                console.log(marcador)
                this.marcadores.actualizarMarcador( marcador )
                socket.broadcast.emit('marcador-actualizado', marcador)
            })
        
        });
    }


}


module.exports = Sockets;