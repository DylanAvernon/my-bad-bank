import { NavLink } from "react-router-dom";
function NavBar(){
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to='/' className="navbar-brand" >BadBank</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to='/CreateAccount' className='nav-link'>Create Account</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/login' className='nav-link'>Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/deposit' className='nav-link'>Deposit</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/withdraw' className='nav-link'>Withdraw</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/alldata' className='nav-link'>All Data</NavLink>
          </li>          
        </ul>
      </div>
    </nav>
    </>
  );
}
export default NavBar;