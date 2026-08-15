import { GiSpeedometer } from 'react-icons/gi';

function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <GiSpeedometer className="nav-icon" aria-hidden="true" />
        <span className="nav-title">SPEED CHECK</span>
        <span className="nav-subtitle">Pokémon Champions Edition</span>
      </div>
    </header>
  );
}

export default Nav;
