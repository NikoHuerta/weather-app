const fs = require('fs');

const axios = require('axios');


class Busquedas{

    historial = [];
    dbPath = './db/database.json';

    constructor(){
        //TODO: leer DB si existe
    }
    
    get historialCapitalizado(){
        return this.historial.map(lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toLocaleUpperCase() + p.substring(1));
            
            return palabras.join(' ');
        });
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
            const { weather, main } = resp.data;
            
            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
                sensTerm: main.feels_like,
            };
            

        }catch(err)
        {
            console.log(err);
            return [];
        }
    }

    agregarHistorial(lugar = ''){
        //validar si ya existe
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ) return;

        if(this.historial.length == 5) this.historial.pop();

        this.historial.unshift( lugar.toLocaleLowerCase() );
        //guardarDB
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial,
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)) return [];
        const infoHistorial = fs.readFileSync(this.dbPath, 'utf-8');
        this.historial = JSON.parse(infoHistorial).historial;
    }


}


module.exports = {
    Busquedas
}