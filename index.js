const { inquirerMenu, pausa, leerInput, confirmar, listarLugares} = require('./helpers/inquirer');
const { Busquedas } = require('./models/busqueda');
const colors = require('colors/safe');
require('dotenv').config();


const main = async () => {

    const busquedas = new Busquedas();
    let opt = '';
    const archivoHistorial = busquedas.leerDB();

    do{
        opt = await inquirerMenu(); //espera a que termine la ejecucion, la promesa.
        switch(opt){
            case 1:
                //Mostrar mensaje
                const ciudadBuscada = await leerInput('Ingrese ciudad: ');
                
                //buscar los lugares
                const lugares = await busquedas.ciudad(ciudadBuscada);

                //seleccionar el lugar
                const idSelected = await listarLugares(lugares);
                if(idSelected === '0') continue; //--> continuar la ejecucion del ciclo

                //guardar en db
                const lugarSel = lugares.find(l => l.id === idSelected);
                busquedas.agregarHistorial(lugarSel.nombre);

                //rescatar info clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                //desestructurar objetos
                const { nombre, lat, lng } = lugarSel;
                const { desc, temp, min, max, sensTerm } = clima;

                //mostrar resultados
                console.clear();
                console.log(colors.green('\nInformación de la ciudad\n'));
                console.log(`Ciudad: ${colors.green(nombre)}`);
                console.log(`Lat: ${lat}`);
                console.log(`Lng: ${lng}`);

                console.log(`Temperatura: ${temp}`);
                console.log(`Mínima: ${min}`);
                console.log(`Máxima: ${max}`);
                console.log(`Sensación termica: ${sensTerm}`);
                console.log(`Tiempo: ${colors.green(desc)}`);

            break;

            case 2:
                console.log('Historial de busqueda, selected');
                busquedas.historialCapitalizado.forEach((lugar, idx) => {
                    console.log(`${colors.green((idx+1)+'. ')} ${ lugar }`);
                });
            break;
        }
        if(opt !== 0) await pausa();

    }while (opt !== 0)
};


main();