import { createContext } from "react";

const WishlistContext = createContext({ IsWishlist: false, heartColor: "gray", heartBackgroundColor: "#8E8F8B" });

export default WishlistContext;