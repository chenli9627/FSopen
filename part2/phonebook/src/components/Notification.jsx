const Notification = ({ notificationState, message }) => {
  const notificationStyle = {
    border: "#64e80cff",
    borderRadius: 5,
    borderStyle:'solid',
    borderWidth: 6,
    color: '#007900',
    backgroundColor: '#D3D3D3',
    height: '70px',
    fontSize: 20,
    fontWeight: 'bold',
    width: '600px',
    justifyContent: 'center',
    display:'flex',
    alignItems: 'center',
  }

  console.log(notificationState);
  if (notificationState) {

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
  return (<div></div>)
}
export default Notification
