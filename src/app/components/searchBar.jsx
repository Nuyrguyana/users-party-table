import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    console.log('searchQuery', searchQuery);
    return (
        <form>
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search..."
                name="s"
            />
        </form>
    );
};
SearchBar.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired
};
export default SearchBar;
