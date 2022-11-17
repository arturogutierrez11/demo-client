import axios from 'axios'
import {GET_CITIES_A} from './actionTypes'

export function getallProperties(){
    return async function(dispatch){
        const resu = await axios.get('http://localhost:3001/properties/getAll')
        dispatch({
            type:"GET_ALL_PROPERTIES",
            payload: resu.data.payload
        })
    }
}

export function getCities() {
    return async function(dispatch) {
        const result = await axios.get('http://localhost:3001/cities')
        const sortedCities = result.data.payload.sort((a, b) => {
            if(a.city > b.city) return 1;
            if(a.city < b.city) return - 1;
            return 0
          })
        dispatch({type:"GET_CITIES", payload: sortedCities})
    }
}

export function filterProperties(filteredProperties) {
    console.log(filteredProperties)
    return {type: "FILTER_PROPERTIES", payload: filteredProperties}
}

export function postPorperty(formData, services) {
    return async function(dispatch) {
        let {antiquity, area, bathrooms, idCity, enviroments, floors, garage, rooms, adressName, adressNumber, images, modality, type, description, observation, price} = formData;
        let trueServices = []
        for(const s in services) {
            if(services[s]) trueServices.push(s)
        }
        const fixedData = {
            images: [images],
            modality,
            type,
            address: `${adressName} ${adressNumber}`,
            services: trueServices,
            antiquity: parseInt(antiquity),
            area: parseInt(area),
            bathrooms: parseInt(bathrooms),
            idCity: idCity,
            environments: parseInt(enviroments),
            floors: parseInt(floors),
            garage: parseInt(garage),
            rooms: parseInt(rooms),
            price: parseInt(price),
            description,
            observation,
        }
        console.log(fixedData)
        await axios.post("http://localhost:3001/properties/createProperty", fixedData)
        dispatch({type: "POST_PROPERTY", payload: fixedData})
    }
}

export function getIdProperties(id){
    return async function (dispatch){
        
            let json = await axios.get(`http://localhost:3001/properties/findById/${id}`)
            console.log(json)
            return dispatch({
                type:"GET_ID_PROPERTIES",
                payload: json.data.paylaod
            })
        }
}

export function getCitiesA() {
    return async function(dispatch) {
        const result = await axios.get('http://localhost:3001/cities')
        let infoApiData = result.data.payload;
        const cities = {};
        infoApiData.forEach((element) => {
        cities[`${element.city} ${element.provincia}`] = {
            id: element.idCity,
            name: element.city,
            provincia: element.provincia
        };
    });
        dispatch({type:GET_CITIES_A, payload: cities})
    }
}

