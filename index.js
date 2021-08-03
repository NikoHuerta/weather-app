const { inquirerMenu, pausa, leerInput, confirmar} = require('./helpers/inquirer');
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
                await busquedas.ciudad(ciudadBuscada);
                //buscar los lugares

                //seleccionar el lugar

                //rescatar info clima

                //mostrar resultados
                console.log(colors.green('\nInformación de la ciudad\n'));
                console.log('Ciudad:');
                console.log('Lat:');
                console.log('Lng:');
                console.log('Temperatura:');
                console.log('Mínima:');
                console.log('Máxima:');

            break;

            case 2:
                console.log('Historial de busqueda, selected');
            break;
        }
        if(opt !== 0) await pausa();

    }while (opt !== 0)
};


main();