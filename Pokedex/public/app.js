// Molina Reyes Barbara Montserrat
const card = document.querySelector('.card');
const container = document.querySelector('.container');
const title = document.querySelector('.title'); 
const url = 'https://pokeapi.co/api/v2/pokemon/'; 
const input = document.querySelector('.input_poke'); 
const type = document.querySelector('.typeOne');
const typeTwo = document.querySelector('.typeTwo');
const box = document.querySelector('.info');
const search = document.querySelector('.search');
let id;

const color = {
  fire: '#FF4B2B',
  electric: '#f8e323',
  normal: '#e2e2e2',
  dragon: '#4568DC',
  ghost: '#7F00FF',
  ice: '#82f0f2',
  grass: '#38ef7d',
  poison: '#f749b1',
  bug: '#a8ff78',
  dark: '#434343',
  psychic: '#ee9ca7',
  steel: '#D3CCE3',
  ground: '#9a8478',
  water: '#1CB5E0',
  fighting: '#EB5757',
  rock: '#3C3B3F',
  flying: '#FFEDBC',
  fairy: '#FFAFBD',
};

const pokemon = document.querySelector('.pokemon img'); 
const pokeImg = document.querySelector('.pokeImg');


container.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
  pokemon.style.transform = `scale(1.1) rotateX(${xAxis}deg)`;
});

container.addEventListener('mouseleave', () => {
  card.style.transition = 'all 0.5s ease';
  card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  
  pokemon.style.transform = 'translateZ(0px)';
});
function changeName(poke) {
  title.textContent = poke.name;
}
function changeImg(poke) {
  pokeImg.src = poke.sprites.front_default;
}
function changeStats(poke) {
  const div = document.querySelectorAll('.stats-bar'); 
  poke.stats.forEach((value, key) => {
    const width = value.base_stat;
    div[key].style.width = `${width}px`;
    div[key].textContent = width;
  });
}

async function apiPokemon() {
  try {
    const response = await fetch(`${url}${id}`);
    const poke = await response.json();
    card.classList.toggle('animate');
    changeName(poke);
    changeImg(poke);
    changeStats(poke);
    typePoke(poke);
  } catch (error) {
    const errorMsg = document.createElement('div');
    box.appendChild(errorMsg);
    errorMsg.classList.add('invalid');
    errorMsg.textContent = 'Pokemon no encontrado, intenta de nuevo';
    setTimeout(() => {
      errorMsg.remove(); 
    }, 1500);
  }
}
input.addEventListener('keypress', (e) => {
  card.classList.remove('animate');
  if (e.key === 'Enter' && input.value !== '') {
    e.preventDefault();
    id = input.value.toLowerCase();
    apiPokemon(id); 
    input.value = '';
  }
});
search.addEventListener('click', (e) => {
  card.classList.remove('animate');
  if (input.value !== '') {
    e.preventDefault();
    id = input.value.toLowerCase();
    apiPokemon(id); 
    input.value = '';
  }
});
function typePoke(poke) {
  const [firstPokeType, secondPokeType] = poke.types;
  const { type: type1 } = firstPokeType;
  const firstType = type1.name;
  if (secondPokeType === undefined) {
    changeType(firstType);
    changeColor(firstType);
  } else {
    const { type: type2 } = secondPokeType;
    const secondType = type2.name;
    changeType(firstType);
    changeType2(secondType);
    changeColor(firstType, secondType);
  }
}
function changeType(firstType) {
  typeTwo.classList.add('hide');
  type.textContent = firstType;
}
function changeType2(secondType) {
  typeTwo.classList.remove('hide');
  typeTwo.textContent = secondType;
}
function getRandomIntInclusive(min, max) {
  const numberMin = Math.ceil(min);
  const numberMax = Math.floor(max);
  return Math.floor(Math.random() * (numberMax - numberMin + 1)) + numberMin;
}

function changeColor(firstType, secondType) {
  const random = getRandomIntInclusive(1, 2);
  if (secondType === undefined) {
    type.style = '';
    document.body.style.setProperty('--main-bg-color', color[firstType]); 
  } else if (secondType !== undefined && random === 1) {
    typeTwo.style.background = color[secondType];
    document.body.style.setProperty('--main-bg-color', color[firstType]);
  } else {
    type.style.background = color[firstType];
    typeTwo.style = '';
    document.body.style.setProperty('--main-bg-color', color[secondType]);
  }
}

const cardStats = document.querySelector('.card-stats');
const showStats = document.querySelector('.showStats'); 
const showPoke = document.querySelector('.showPokemon'); 
showStats.addEventListener('click', (e) => {
  e.preventDefault();
  card.classList.toggle('cardHide');
  card.classList.toggle('animate');
  cardStats.classList.toggle('card-statsShow'); 
  cardStats.classList.toggle('animate2');
});
showPoke.addEventListener('click', (e) => {
  e.preventDefault();
  cardStats.classList.toggle('animate2');
  card.classList.toggle('animate');
  cardStats.classList.toggle('card-statsShow'); 
  card.classList.toggle('cardHide');
});
