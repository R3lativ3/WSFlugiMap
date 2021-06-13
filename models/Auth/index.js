const jwt = require('jsonwebtoken')
const MySQLConnection = require('./database')

const getId =  (tokenx) => {
    return new Promise((reject, resolve) => {
        const token = tokenx
        console.log(tokenx)
        if(!token) return reject('no token')
        jwt.verify(token, 'mi-secreto', (err, decoded) => {
            const { _id } = decoded
            console.log(_id)
            MySQLConnection.query('select idRepartidor from RepartidorUser where idUser = ?', _id, (err, rows) => {
                if(err) return reject(err)
                if(rows.length == 0) return reject('nop')
                return resolve(rows[0].idRepartidor)
            })
        })
    })

}

module.exports = getId