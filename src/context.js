import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = async () => {
    try {
      const res = await fetch(`${url}${searchTerm}`);
      const data = await res.json();

      const { drinks } = data;

      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        // console.log("new cocktails");
        // console.log(newCocktails);

        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      // console.log(drinks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{ loading, searchTerm, setSearchTerm, cocktails }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
