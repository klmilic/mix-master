import React, {useState, useEffect} from 'react';
import RecipeContainer from './RecipeContainer.jsx';
import Input from '../components/Input.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Routes, Route } from 'react-router-dom';

function MainContainer() {
  const [search, changeSearch] = useState([]);
  const [searchState, setSearchState] = useState(false);
  // const [showRecipeContainer, setShowRecipeContainer] = useState(0)

  useEffect(() => {
    // console.log(showRecipeContainer)
  }, [search]);

  return (
    <div id='mainContainer'>
        {/* <div>MainContainer</div> */}
        <Sidebar></Sidebar>
        <div className="mainSection">
            <Input className="input" changeSearch={changeSearch} searchState={searchState} setSearchState={setSearchState}/>
            <RecipeContainer  search={search} />
        </div>
    </div>
  )
}

export default MainContainer;
