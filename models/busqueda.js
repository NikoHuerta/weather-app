const axios = require('axios');


class Busquedas{

    historial = ['Tegucigalpa','Madrid','Santiago'];

    constructor(){
        //TODO: leer DB si existe
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': process.env.LIMIT,
            'language': process.env.LANGUAGE
            };
    }

    async ciudad(lugar = ''){
        //peticion http
        //console.log('ciudad', lugar);
        try{
            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
                timeout: 2000
            });

            // const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/santiago.json?access_token=pk.eyJ1Ijoibmh1ZXJ0YSIsImEiOiJja3J2NXhsamQwM2h2Mndta3N5bDl5cnR5In0.Pi7v2LSt72OKUkLerywa9w&limit=5&language=es');
            const resp = await instancia.get();
            console.log(resp.data);

            return []; //retornar los lugares
        }catch(err){
            return [];
        }
        
    }
}


module.exports = {
    Busquedas
}