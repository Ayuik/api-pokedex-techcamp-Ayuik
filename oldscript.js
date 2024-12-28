//Este código tenía un error: las tarjetas no siempre se mostraban en el orden correcto. 

const APIURL = "https://pokeapi.co/api/v2/pokemon/"
const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

function getAllData(){ 
    poke_container.innerHTML = " ";
    fetch(APIURL) 
        .then(response => { 
            console.log("State: fulfilled"); 
            return response.json(); 
        }) 
        .then(info => { 
            const data = info.results; 
            for (let id = 1; id <= pokemon_count; id++)
            getSpecificData(id);
        })
        .catch(error => { 
            console.log("State: rejected"); 
        }); 
    }

getAllData()

function getSpecificData(id) {
    fetch (`${APIURL}${id}/`)
        .then(eachPokeURL => {
        console.log("State: fulfilled");
        return eachPokeURL.json();
        })
        .then (eachPokeInfo => {
        const pokeNumber = eachPokeInfo.id.toString().padStart(3, '0')
        const pokeName = eachPokeInfo.name 
        const pokeType = eachPokeInfo.types[0].type.name
        const pokeImgAPI = eachPokeInfo.sprites.front_default
        rellenarPokeContainer(pokeImgAPI,pokeName, pokeNumber, pokeType)
        })
        .catch(error => { 
            console.log("State: rejected"); 
            console.error(error); 
        }); 
    }

function rellenarPokeContainer (pokeImgAPI,pokeName, pokeNumber, pokeType) {
    let poke_card = document.createElement('div');
        poke_card.className = "pokemon";
        poke_card.style.backgroundColor = asignarColor(pokeType)
        poke_card.innerHTML =
        `
            <div class="img-container">
            <img src="${pokeImgAPI}" alt="${pokeName}">
            </div>
            <div class="info">
            <span class="number">${pokeNumber}</span>
            <h3 class="name">${pokeName}</h3>
            <small class="type">Type: <span>${pokeType}</span></small>
            </div>
        `  
    poke_container.appendChild(poke_card);
}

function asignarColor(pokeType) { 
        let background_color = colors.normal; 
        background_color = pokeType ? colors[pokeType] : background_color; 
        return background_color; 
} 
