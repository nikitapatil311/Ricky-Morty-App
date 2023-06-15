import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States

let maxPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters(page = 1) {
  cardContainer.textContent = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();
  maxPage = data.info.pages;
  pagination.textContent = `${page} / ${maxPage} `;
  const characters = data.results;
  characters.forEach((character) => {
    createCharacterCard(character);
  });
}

prevButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (page > 1) {
    page--;
    fetchCharacters(page);
  }
});

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (page <= maxPage) {
    page++;
    fetchCharacters(page);
  }
});

fetchCharacters();
