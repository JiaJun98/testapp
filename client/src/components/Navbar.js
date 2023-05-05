import { useAuth  } from "./Auth"
const { NavLink } = require("react-router-dom");
const Navbar = () => {    
    const auth = useAuth();
    const navLinkStyles = ({isActive}) => {
        return{
        fontWeight: isActive ? "bold" : "normal",
        textDecoration: isActive ? "none" : "underline",
        }
    }
    return (
        <nav className = 'primary-nav'>
      <NavLink to="/home" style={{ padding: "10px" }}>
        Home
      </NavLink>
      <NavLink to="/profile" style={{ padding: "10px" }}>
        Profile
      </NavLink>
      <NavLink to="/about" style={{ padding: "10px" }}>
        About
      </NavLink>
       {
        !auth.user &&
        (<NavLink style ={navLinkStyles} to="/login">
            Login    
        </NavLink>)
        
       }
       </nav>
  );
};
export default Navbar;