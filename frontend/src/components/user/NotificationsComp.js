import React from 'react'

const NotificationsComp  = () => {

        
    //dummy podaci, upload podaci o invite
    const notifications = [
        { id: 1},
        { id: 2},
        { id: 3},
      ];

  return (
    <div className='schedule-second-div'>
      <div className="schedule-first-div">
          <h2 className="headline-profile">Moje obavijesti</h2>
      </div>
      <div className='schedule-second-div'>
        <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center", fontSize: "22px"}}>
        
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td style={{ padding: "8px", border: "1px solid #ddd", border: "none" }}>Korisnik -Ime korisnika- vam salje poziv da mu se pridruzite!</td>
                <td style={{ padding: "8px", border: "1px solid #ddd", border: "none" }}>Dvorana/Stadion</td>
                <td style={{ padding: "8px", border: "1px solid #ddd", border: "none" }}>17:00h</td>
                <td style={{ padding: "8px", border: "1px solid #ddd", border: "none" }}>
                  <button className='accept-invite-friend'>Prihvati poziv</button>
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd", border: "none" }}>
                  <button className='decline-invite-friend'>Odbaci poziv</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default NotificationsComp;
