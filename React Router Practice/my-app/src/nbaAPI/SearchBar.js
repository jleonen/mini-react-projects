import { useRef } from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const searchValue = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    props.onSearch(searchValue.current.value);
  };
  return (
    <div>
      <form className={classes.searchContainer} onSubmit={submitFormHandler}>
        <h1 className={classes.searchHeading}>Search for an NBA Player </h1>
        <input ref={searchValue} placeholder="Input player here"></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
