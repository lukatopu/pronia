import React from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
function Filter() {
  return (
    <div className="filter">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search"
        />
        <PiMagnifyingGlassBold className="filterSearchIcon" />
      </div>

      <div className="filtersContainer">
        <div className="Filter">
          <h2>Categories</h2>
          <div className="FiltersContainer">
            <a>All</a>
            <a>Bansai</a>
            <a>House Plants</a>
            <a>Indoor Living</a>
            <a>Perennnials</a>
            <a>Plant For Gift</a>
            <a>Garden Tools</a>
          </div>
        </div>
        <div className="Filter">
          <h2>Color</h2>
          <div className="FiltersContainer">
            <a>All</a>
            <a>Gold</a>
            <a>Green</a>
            <a>White</a>
            <a>Black</a>
          </div>
        </div>
        <div className="Filter">
          <h2>Categories</h2>
          <div className="FiltersContainer">
            <a>All</a>
            <a>Bansai</a>
            <a>House Plants</a>
            <a>Indoor Living</a>
            <a>Perennnials</a>
            <a>Plant For Gift</a>
            <a>Garden Tools</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
