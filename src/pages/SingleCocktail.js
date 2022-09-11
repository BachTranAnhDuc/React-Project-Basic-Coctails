import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);

    const getCocktail = async () => {
      try {
        const res = await fetch(`${url}${id}`);
        const data = await res.json();

        const { drinks } = data;

        if (data) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngerdient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngerdient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };

          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading></Loading>;
  }
  if (!cocktail) {
    return <h2 className="section-title">No cocktail to display</h2>;
  } else {
    const { name, image, category, info, glass, instructions, ingredients } =
      cocktail;

    return (
      <section className="section cocktail-section">
        <Link to={"/"} className="btn btn-primary">
          Back to home
        </Link>

        <h2 className="section-title">{name}</h2>

        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span> {name}
            </p>

            <p>
              <span className="drink-data">category :</span> {category}
            </p>

            <p>
              <span className="drink-data">info :</span> {info}
            </p>

            <p>
              <span className="drink-data">instructions :</span> {instructions}
            </p>

            <p>
              <span className="drink-data">ingredients :</span>{" "}
              {ingredients.map((el, index) => {
                return el ? <span key={index}> {el}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleCocktail;
