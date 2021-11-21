import classes from "./SearchResults.module.css";
const SearchResults = (props) => {
  return (
    <div className={classes.resultsContainer}>
      <span>
        {" "}
        <strong>Name:</strong>
        {props.firstName} {props.lastName}
      </span>
    </div>
  );
};

export default SearchResults;
