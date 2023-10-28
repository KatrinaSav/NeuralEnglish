import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className="navigationDiv">
      <h2 className="mainLabel">
        <span className="redLabel">Neural</span>English
      </h2>
      <div className="navPanel">
        <Link className="navLink" to={'reading'}>
          Reading
        </Link>
        <Link className="navLink" to={'testing'}>
          Testing
        </Link>
        <Link className="navLink" to={'.'}>
          Account
        </Link>
      </div>
    </nav>
  )
}

export default Menu
