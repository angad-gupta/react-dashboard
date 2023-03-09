import { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import "./Recipes.css";

const Recipes = () => {
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState("ingredients");

  const handleClose = () => setOpen(false);

  const getSearchedRecipes = async (search) => {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=025c3af7afa34a918561b5f1e896d517&query=${search}`
    );
    const data = await resp.json();

    return data.results;
  };

  const fetchrecipe = async (id) => {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=025c3af7afa34a918561b5f1e896d517`
    );
    const data = await resp.json();
    setRecipe(data);
    setActiveTab('ingredients');
    setOpen(true);
  };

  const onSearch = (event) => {
    if (event.key === "Enter") {
        getSearchedRecipes(search).then((data) => {
            setSearchedRecipes(data);
        });
    }
  };

  return (
    <div className="recipe-content container mt-4">
        <h2>Search Recipes</h2>
        <div className="">
            <input
            value={search}
            className="w-100 text-black"
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={onSearch}
            placeholder="Search"
            type="text"
            />
        </div>

        <div className="grid my-4">
        {searchedRecipes.map(({ title, id, image }) => (
            <div className="card" key={id}>
                <a onClick={() => fetchrecipe(id)}>
                    <img src={image} alt={title} />
                    <h5>{title}</h5>
                </a>
            </div>
        ))}
        </div>

        <Modal
            show={open}
            size="lg"
            onHide={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Modal.Header closeButton>
                <Modal.Title>{recipe?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <img className="w-100" src={recipe?.image} alt={recipe?.title} />
                </div>
                <div className="my-3">
                    <Button
                        variant={activeTab === "ingredients" ? "dark" : "light"}
                        onClick={() => setActiveTab("ingredients")}
                    >
                        Ingredients
                    </Button>
                    <Button
                        variant={activeTab === "instructions" ? "dark" : "light"}
                        onClick={() => setActiveTab("instructions")}
                    >
                        Instructions
                    </Button>
                    <div className="mt-2">
                        {activeTab === "ingredients" && (
                            <ul>
                            {recipe?.extendedIngredients.map(({ id, original }) => (
                                <li key={id}>{original}</li>
                            ))}
                            </ul>
                        )}

                        {activeTab === "instructions" && (
                            <div>
                                <p dangerouslySetInnerHTML={{ __html: recipe?.summary }}></p>
                                <p dangerouslySetInnerHTML={{ __html: recipe?.instructions }}></p>
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  );
};


export default Recipes;