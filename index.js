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
let searchQuery = "";

async function fetchCharacters(page = 1, searchQuery) {
  cardContainer.textContent = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
  );
  const data = await response.json();
  maxPage = data.info.pages;
  pagination.textContent = `${page} / ${maxPage} `;
  const characters = data.results;
  characters.forEach((character) => {
    createCharacterCard(character);
  });
}
fetchCharacters(page, searchQuery);

prevButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (page > 1) {
    page--;
    fetchCharacters(page, searchQuery);
  }
});

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (page <= maxPage) {
    page++;
    fetchCharacters(page, searchQuery);
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.firstElementChild.value;
  page = 1;
  fetchCharacters(page, searchQuery);
  console.log(searchQuery);
});
