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

    get paramsApiOpenWeather(){
        return {
            'appid': process.env.OPENWEATHERMAP_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar = ''){
        //peticion http
        //console.log('ciudad', lugar);
        try{
            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
                timeout: 2000,
            });

            const resp = await instancia.get();
            //console.log(resp);
            
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

    async climaLugar(lat, lon){
        try{

            const instancia = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ... this.paramsApiOpenWeather, lat, lon },
                //the same as {appid= this.appid, units= this.units, lang= this.lang, lat=lat, lon=lon}
                timeout: 2000,
            });

            const resp = await instancia.get();
            
            return {
                temp: resp.data.main.temp,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                sensTerm: resp.data.main.feels_like,
                desc: resp.data.weather[0].description,
            };
            

        }catch(err)
        {
            console.log(err);
            return [];
        }
    }


}


module.exports = {
    Busquedas
}