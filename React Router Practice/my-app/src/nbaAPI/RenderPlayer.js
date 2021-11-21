import SearchBar from "./SearchBar";

const RenderPlayer = () => {
  const searchHandler = (data) => {
    console.log(data);
  };
  return (
    <div>
      <SearchBar onSearch={searchHandler} />
    </div>
  );
};

export default RenderPlayer;
