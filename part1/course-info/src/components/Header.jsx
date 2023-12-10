import PropTypes from "prop-types"
Header.propTypes = {
    course: PropTypes.string.isRequired
}
function Header(props) {
  return (
    <header>
        <h1 className="text-2xl font-[900]">{props.course}</h1>
    </header>
  )
}

export default Header