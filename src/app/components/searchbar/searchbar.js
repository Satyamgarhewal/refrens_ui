// Libraries
import React, { useEffect, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

// utils
import useKeyPress from '../../utils/useKeyPressHook';

// CSS
import './searchbar.css';

const initialState = { selectedIndex: 0 }; // Initial state created for reducer

// function component created below
function SearchBar(props) {
  const [searchedData, setSearchedData] = useState([]); // for storing the filtered data from the input
  const [isSearchQuery, setIsSearchQuery] = useState(false); // for checking whether the input value is still present or cleared out
  const [state, dispatch] = useReducer(reducer, initialState); // using reducer to check the current index for the list item so that we can control it with our keyboard.
  // useKeyPress is a custom hook created to handle the keyboard key movement
  const arrowUpPressed = useKeyPress('ArrowUp'); // Arrow up responds to up arrow key
  const arrowDownPressed = useKeyPress('ArrowDown'); // Arrow up responds to down arrow key
  const navigate = useNavigate(); // useNavigate is a library used to navigate to another route from the present route

  // created reducer function inside the function component so that we can get the length of the filtered data (searchedData)
  function reducer(state, action) {
    switch (action.type) {
      case 'arrowUp':
        return {
          selectedIndex:
            state.selectedIndex !== 0
              ? state.selectedIndex - 1
              : searchedData.length - 1,
        };
      case 'arrowDown':
        return {
          selectedIndex:
            state.selectedIndex !== searchedData.length - 1
              ? state.selectedIndex + 1
              : 0,
        };
      case 'select':
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  }

  // useEffect hook to move the list up and down in the searched result
  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' });
    }
  }, [arrowDownPressed]);

  // handling the navigation to another page when user clicks or press enter button.
  const handleUserclick = (user) => {
    console.log('user ==========>', user);
    navigate(`/users/${user.id}`);
  };

  // handling input field
  const handleSearchField = (e) => {
    const { value } = e.target;
    const fetchedData = props.data;

    // filtering the data as per the input
    let filteredData = fetchedData.filter((user, index) => {
      return (
        user.name.toLowerCase().startsWith(value.toLowerCase()) ||
        user.id.toLowerCase().startsWith(value.toLowerCase()) ||
        user.address.toLowerCase().startsWith(value.toLowerCase())
      );
    });
    if (value.length) {
      setSearchedData(filteredData);
      setIsSearchQuery(true);
    } else {
      setIsSearchQuery(false);
      setSearchedData([]);
    }
  };

  // rendering the data in a card and also handling events like key press and on click.
  return (
    <div>
      <div className="searchBarCover">
        <input
          type="text"
          className="searchbarStyle"
          placeholder={props.placeholder}
          onChange={handleSearchField}
        />
      </div>

      {searchedData.length > 0 ? (
        <div className="searchResult">
          {searchedData.map((value, key) => {
            return (
              <div key={key}>
                <div
                  className="card"
                  onClick={() => {
                    dispatch({ type: 'select', payload: key });
                    handleUserclick(value);
                  }}
                  role="button"
                  aria-pressed={key === state.selectedIndex}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      dispatch({ type: 'select', payload: key });
                      handleUserclick(value);
                      e.target.blur();
                    }
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{value.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {value.name}
                    </h6>
                    {value.address}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : isSearchQuery ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">No Record Found!!</h5>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
