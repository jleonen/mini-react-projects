const TeamItem = (props) => {
  return (
    <div>
      <h1>{props.fullName}</h1>
      <p>{props.abbreviation}</p>
      <p>
        <strong>City:</strong>
        {props.city}
      </p>
      <p>
        <strong>Division:</strong>
        {props.division}
      </p>
    </div>
  );
};

export default TeamItem;
