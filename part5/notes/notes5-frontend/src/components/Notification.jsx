const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        <span>wrong credentials</span>
        {message}
      </div>
    )
  }
  
  export default Notification