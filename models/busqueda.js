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

            const resp = await instancia.get();
            
            return resp.data.features.map(lugar => ({
                id:lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
        }catch(err){
            return [];
        }
    }

    
}


module.exports = {
    Busquedas
}