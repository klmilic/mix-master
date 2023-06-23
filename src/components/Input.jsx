import React, {useState, useEffect} from 'react';

// import logo from './Assets/mixmaster.png';
import logoImage from '../Assets/mixmaster.png'
let logoUrl = "https://em-content.zobj.net/source/microsoft-teams/337/tropical-drink_1f379.png"

function Input({ changeSearch, searchState, setSearchState }) {
  // const [inputValue, setInputValue] = useState('');
  // const [searchState, setSearchState] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }

  function pressEnter(event) {
    if (event.keyCode === 13) {
        changeSearch(event.target.value);
        setSearchState(
          true
        );
        console.log(searchState);
        setSearchValue('');
    }
  }

  return (
    <div className='searchItems'>
      <h2>Mix Master</h2>
      <input placeholder='Search by comma-separated ingredients (e.g. tequila,lime)' value={searchValue} className={`searchInput ${searchState === true ? 'active' : ''}`} type="text" id="searchInput" onChange={handleChange} onKeyDown={pressEnter}/>
    </div>
  )
}

export default Input;
