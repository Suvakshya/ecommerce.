import { useState, useEffect, useContext, createContext } from "react";

//Context create garnu xa vanay chaii hame createContext lae use garxau
//Context lae use garnu xa vanay chaii hame usecContext lae use garxau

const AuthContext = createContext();
const [auth, setAuth] = useState({});
