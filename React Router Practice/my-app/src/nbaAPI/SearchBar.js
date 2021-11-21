import { useRef } from "react";

const SearchBar = (props) => {
  const searchValue = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    props.onSearch(searchValue.current.value);
  };
  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <input ref={searchValue} placeholder="Input player here"></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
