document.addEventListener("DOMContentLoaded", function () {
  const charactersList = document.getElementById("characters-list");
  const characterDetails = document.getElementById("character-details");

  fetchCharacters();

  charactersList.addEventListener("click", handleCharacterClick);

/**
 * Fetches characters from the Rick and Morty API and populates the characters list.
 * @returns {Promise<void>} A promise that resolves when the characters are fetched and displayed.
 */
  async function fetchCharacters() {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/"
      );
      const data = await response.json();

      charactersList.innerHTML = "";

      data.results.forEach((character) => {
        const row = createCharacterRow(character);
        charactersList.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }

/**
 * Creates a table row element for a character.
 * @param {Object} character - The character object.
 * @returns {HTMLTableRowElement} - The created table row element.
 */
  function createCharacterRow(character) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${character.name}</td>
      `;
    row.addEventListener("click", () => toggleCharacterDetails(row, character));
    return row;
  }

/**
 * Fetches and displays the details of a character using the Rick and Morty API.
 * @param {number} characterId - The ID of the character to fetch details for.
 * @returns {Promise<void>} - A promise that resolves when the character details are displayed.
 */
  async function showCharacterDetails(characterId) {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`
      );
      const character = await response.json();

      const detailsHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Type: ${character.type}</p>
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${character.origin.name}</p>
        <p>Location: ${character.location.name}</p>
        `;

      characterDetails.innerHTML = detailsHTML;
    } catch (error) {
      console.error("Error fetching character details:", error);
    }
  }

/**
 * Toggles the details of a character in a row.
 * @param {HTMLElement} row - The row element containing the character details.
 * @param {Object} character - The character object.
 */
  function toggleCharacterDetails(row, character) {
    const isOpen = row.classList.toggle("open");

    if (isOpen) {
      showCharacterDetails(character.id);
    } else {
      characterDetails.innerHTML = "";
    }

    const openRows = document.querySelectorAll(".open");
    openRows.forEach((openRow) => {
      if (openRow !== row) {
        openRow.classList.remove("open");
      }
    });
  }
});
