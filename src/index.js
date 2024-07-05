import app from './app.js'
// import {sequelize} from './database/database.js'


async function main(){
 try {
    //  await sequelize.sync({force: false})
    //  console.log('La conexion con la base de datos ha sido exitosa')

     
     app.listen(app.get('port'), ()=>{ console.log('Escuchando en el puerto ' + app.get('port'))})
    } catch (error) {
      console.log('error en la conexion', error)
    }
  }
  main();
  