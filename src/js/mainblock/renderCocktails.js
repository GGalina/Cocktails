

// ----------------------------------GETRANDOMCOCKTAIL--------------------------------- //
export function getRandomCocktail() {
  return new Promise(resolve => {
    // обробити помилку у разі помилки запиту. читати документацію по axios
    const randomCocktail = axios.get(`${BASE_URL}/random.php`);
    resolve(randomCocktail);
  });
}
// ----------------------------------renderCocktails--------------------------------- //
export function renderCocktails(markup) {
  if (!cocktailsList) {
    return;
  }
  cocktailsList.insertAdjacentHTML('beforeend', markup);
}
// ----------------------------------GETCOCKTAILMARKUP--------------------------------- //



