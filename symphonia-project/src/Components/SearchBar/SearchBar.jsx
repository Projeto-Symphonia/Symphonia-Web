import "./style.css";
import React, {useState} from "react";

export const SearchBar = ({posts, setSearchResults}) => {
    const handleSubmit = (e) => e.preventDefault();

    const handleSearchChange = (e) => {
        if(!e.target.value.length) return setSearchResults(posts);

        const resultsArray = posts.filter(post => post.title.includes(e.target.value) || post.comment.includes(e.target.value))
        setSearchResults(resultsArray);
    }

    return (
        <header>
            <form className='pesquisa' onSubmit={handleSubmit}>
                <input 
                className="pesquisa-input"
                type="text"
                placeholder="Pesquise aqui..."
                id="pesquisa"
                onChange={handleSearchChange}
                />
            </form>
        </header>
    );
}