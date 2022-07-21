export default function SearchBar() {
  return (
    <div className="searchbar-wrapper">
      <form className="searchbar">
        <label className="m-l-10 txt-xl">
          <i className="ri-search-line" />
        </label>

        <input type="text" id={"input"} placeholder="Search activities" className="pl-2 border-transparent focus:border-transparent focus:ring-0" />

        <button type="submit" className="tbtn-edit tbtn-sm btn ">
          <span className="txt">Search</span>
        </button>
        <button type="button" className="tbtn-clear tbtn-sm btn   btn-hint">
          <span className="txt">Clear</span>
        </button>
      </form>
    </div>
  );
}
