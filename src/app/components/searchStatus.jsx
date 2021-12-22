const SearchStatus = ({ length }) => {
    return length === 0
        ? 'Никто с тобой не тусанет'
        : length === 1
            ? `${length} человек тусанет с тобой`
            : length < 5
                ? `${length} человека тусанут с тобой`
                : `${length} человек тусанет с тобой`;
};

export default SearchStatus;
