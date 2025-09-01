const Notification = ({ notificationState, message, greenOrBlue }) => {
  let notificationStyle = {
    border: greenOrBlue ? "#64e80cff" : 'red',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 6,
    backgroundColor: '#D3D3D3',
    // height: '70px',
    fontWeight: 'bold',
    width: '600px',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    color: greenOrBlue ? '#007900' : 'red',
    // color: '#007900',
  }
  // console.log(notificationState);
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
