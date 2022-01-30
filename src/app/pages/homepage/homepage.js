import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/searchbar/searchbar';
import { getData } from '../../utils/fetchConstants';

function Homepage(props) {
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    fetchSearchData();
  }, []);

  async function fetchSearchData() {
    const data = await getData('home/search');
    setSearchData(data);
  }
  return (
    <div className="container">
      <SearchBar
        placeholder="Search users by ID, address, name..."
        data={searchData}
      />
    </div>
  );
}

export default Homepage;
