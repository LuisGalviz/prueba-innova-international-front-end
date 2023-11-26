document.addEventListener("DOMContentLoaded", function () {
  const charactersList = document.getElementById("characters-list");
  const characterDetails = document.getElementById("character-details");

  fetchCharacters();

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
    row.addEventListener("click", () => showCharacterDetails(character.id));
    return row;
  }

  /**
   * Fetches and displays the details of a character using the Rick and Morty API.
   * @param {number} characterId - The ID of the character to fetch details for.
   * @returns {Promise<void>} - A promise that resolves when the character details are displayed.
   */
  async function showCharacterDetails(characterId) {
    console.log("Fetching character details for character ID:", characterId);
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
});
