import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchDropDown from "./SearchDropdown";
import "./search.css"
const SearchBar = () => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([])




return (
    <div className="App">

        <SearchDropDown
            options={options}
            id="id"
            selectedVal={value}
            handleChange={(val) => setValue(val)}
            setOptions={setOptions}
        />
    </div>
);
}

export default SearchBar
