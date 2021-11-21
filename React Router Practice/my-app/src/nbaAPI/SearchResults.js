import classes from "./SearchResults.module.css";
const SearchResults = (props) => {
  return (
    <div className={classes.resultsContainer}>
      <span>
        <strong>Name:</strong>
        {props.firstName} {props.lastName}
      </span>
      <span>
        <strong>Height:</strong>
        {props.heightFt} {props.heightIn}
      </span>
      <span>
        <strong>Position:</strong>
        {props.position}
      </span>
      <span>
        <strong>Team:</strong>
        {props.team}
      </span>
    </div>
  );
};

export default SearchResults;
