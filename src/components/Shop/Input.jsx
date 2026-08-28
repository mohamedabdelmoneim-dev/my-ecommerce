import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import inputStyles from "../../assets/CSS/Shop/input-shop.module.css";

const Input = ({ asideSearchBar, handleSearcing, onSearchSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className={`${inputStyles["input-shop"]} d-flex align-items-center gap-2 w-100`}>
      <FiSearch style={{ color: "#75756A", width: "17px", marginBottom: "1px" }} />
      <input 
        className={`${inputStyles["input"]} text-white`} 
        placeholder="Search Products..." 
        required 
        type="text" 
        value={asideSearchBar} 
        onChange={(e) => {handleSearcing(e.target.value)}} 
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