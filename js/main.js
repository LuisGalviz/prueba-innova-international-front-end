document.addEventListener("DOMContentLoaded", function () {
  const charactersList = document.getElementById("characters-list");
  const characterDetails = document.getElementById("character-details");

  fetchCharacters();

  charactersList.addEventListener("click", handleCharacterClick);

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

  function createCharacterRow(character) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${character.name}</td>
      `;
    row.addEventListener("click", () => toggleCharacterDetails(row, character));
    return row;
  }

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

  function toggleCharacterDetails(row, character) {
    const isOpen = row.classList.toggle("open");

    if (isOpen) {
      // Si el acordeón está abierto, mostrar detalles
      showCharacterDetails(character.id);
    } else {
      // Si el acordeón está cerrado, borrar detalles
      characterDetails.innerHTML = "";
    }

    // Cerrar otros acordeones abiertos
    const openRows = document.querySelectorAll(".open");
    openRows.forEach((openRow) => {
      if (openRow !== row) {
        openRow.classList.remove("open");
      }
    });
  }
});
