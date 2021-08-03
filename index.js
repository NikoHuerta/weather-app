const { inquirerMenu, pausa, leerInput, confirmar, listarLugares} = require('./helpers/inquirer');
const { Busquedas } = require('./models/busqueda');
const colors = require('colors/safe');
require('dotenv').config();


const main = async () => {

    const busquedas = new Busquedas();
    let opt = '';


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
                //console.log(idSelected);
                const lugarSel = lugares.find(l => l.id === idSelected);
                //console.log(lugarSel);

                //rescatar info clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //console.log(clima);


                //mostrar resultados
                console.log(colors.green('\nInformación de la ciudad\n'));
                console.log(`Ciudad: ${lugarSel.nombre}`);
                console.log(`Lat: ${lugarSel.lat}`);
                console.log(`Lng: ${lugarSel.lng}`);

                console.log(`Tiempo: ${clima.desc}`);
                console.log(`Temperatura: ${clima.temp}`);
                console.log(`Mínima: ${clima.min}`);
                console.log(`Máxima: ${clima.max}`);
                console.log(`Sensación termica: ${clima.sensTerm}`);

            break;

            case 2:
                console.log('Historial de busqueda, selected');
            break;
        }
        if(opt !== 0) await pausa();

    }while (opt !== 0)
};


main();