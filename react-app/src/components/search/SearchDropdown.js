import { useEffect, useRef, useState } from "react";

const SearchDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
  setOptions
}) => {

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);


  useEffect(() => {

    fetch(`/api/search/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            value:query

        })
    }).then((response) => response.json()).then((data)=>{console.log(data.users)

    setOptions(data.users)
    })


}, [query, setOptions])

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(query);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  //const filter = (options) => {
  //  return options.filter(
  //    (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
  //  );
  //};

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {options?.map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              key={`${id}-${index}`}
              className={`option ${
                option[label] === selectedVal ? "selected" : ""
              }`}
            >
              {option.username} {option.firstname} {option.lastname}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchDropdown;
