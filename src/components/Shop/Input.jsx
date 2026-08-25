import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import inputStyles from "../../assets/CSS/Shop/input-shop.module.css";

const Input = ({ asideSearchBar, handleSearcing }) => {
  return (
    <form className={`${inputStyles["input-shop"]} d-flex align-items-center gap-2`}>
      <FiSearch style={{ color: "#75756A", width: "17px", marginBottom: "1px" }} />
      <input 
        className={`${inputStyles["input"]} text-white`} 
        placeholder="Search Products..." 
        required 
        type="text" 
        value={asideSearchBar} 
        onChange={(e) => {handleSearcing(e.target.value)}} 
        onKeyDown={(e) => {if(e.key === "Enter"){e.preventDefault()}}} 
      />
      <button 
        className={`${inputStyles["reset"]} pb-1 ps-1 pe-2`} 
        type="button" 
        onClick={() => {handleSearcing("");}}
      >
        <IoClose />
      </button>
    </form>
  );
}

export default Input;