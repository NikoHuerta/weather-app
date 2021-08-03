const inquirer = require('inquirer');
const colors = require('colors/safe');

//constante para almacenar question de inquirerMenu()
const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
        {
            value: 1,
            name: `${colors.green('1.')} Buscar ciudad`
        },
        {
            value: 2,
            name: `${colors.green('2.')} Historial de busqueda`
        },
        {
            value: 0,
            name: `${colors.green('3.')} Salir`
        }
    ],
}];

//constante para almacenar question de pausa()
const pregPausa = [{
    type: 'input',
    name: 'respPausa',
    message: `Presione ${colors.green('ENTER')} para continuar`
}];

const inquirerMenu = async () => {
    console.clear();
    console.log(colors.green('==================================='));
    console.log(colors.green(`|      ${colors.white('Seleccione una opción')}      |`));
    console.log(colors.green('===================================\n'));

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};


const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(pregPausa);
};


const leerInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }

    }];
    const { desc } = await inquirer.prompt(question);
    return desc;
};

const confirmar = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
};


const listarLugares = async (lugares = []) => {
   
    const choices = lugares.map((lugar, i) => {
        const idx = `${colors.green((i+1) +'. ')}`;
        return {
            value: lugar.id,
            name: `${ idx } ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: colors.green('0.') + '  Cancelar'
    });
    
    const preguntasLugar = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar:',
        choices
    }];

    const { id } = await inquirer.prompt(preguntasLugar);
    return id;

};



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    confirmar,
    listarLugares,
}