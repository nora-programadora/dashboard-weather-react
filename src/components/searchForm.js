const SearchForm = ({ city, setCity, handleCitySearch, error }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = city.split(",");
    if (inputs.length === 1) {
      await handleCitySearch(city);
    } else {
      await handleCitySearch(inputs[0], inputs[1]);
    }
  };

  return (
    <section className="city-container">
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          name="city-search"
          id="city-search"
          placeholder="Enter a city!"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="Search city"
        />
        {error && <p>{error}</p>}
        <button type="submit" id="search-btn">
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
