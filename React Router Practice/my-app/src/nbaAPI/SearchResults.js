import classes from "./SearchResults.module.css";
import { Link } from "react-router-dom";
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
        <Link to={`/nbaplayers/${props.team}`}>{props.team}</Link>
      </span>
    </div>
  );
};

export default SearchResults;
