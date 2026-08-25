import { NavLink } from 'react-router-dom';
import { GiSpeedometer } from 'react-icons/gi';

function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <GiSpeedometer className="nav-icon" aria-hidden="true" />
        <span className="nav-title">SPEED CHECK</span>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
            end
          >
            All Pokémon
          </NavLink>
          <NavLink
            to="/slow-tier"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Slow Tier
          </NavLink>
          <NavLink
            to="/mid-tier"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Mid Tier
          </NavLink>
          <NavLink
            to="/fast-tier"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Fast Tier
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
