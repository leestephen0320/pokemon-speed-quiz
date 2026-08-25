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
            Every Pokémon Exam
          </NavLink>
          <NavLink
            to="/slow-tier"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Trickroom Test
          </NavLink>
          <NavLink
            to="/mid-tier"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Middling Midterm
          </NavLink>
          <NavLink
            to="/fast-tier"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Fast Finals
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
