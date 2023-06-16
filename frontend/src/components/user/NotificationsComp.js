import React from 'react';

const NotificationsComp = () => {
  
  const notifications = [
    { id: 1, user: { id: 'receiver', name: 'Almasa Odžak' }, sport_hall: 'Dvorana/Stadion', time: '17:00h' },
    { id: 2, user: { id: 'sender', name: 'Fikret Čunjalo', status: 0 }, sport_hall: 'Dvorana/Stadion', time: '17:00h' },
    { id: 3, user: { id: 'sender', name: 'Dženan Gušić', status: 1 }, sport_hall: 'Dvorana/Stadion', time: '17:00h' },
    { id: 4, user: { id: 'sender', name: 'Zenan Šabanac', status: 2 }, sport_hall: 'Dvorana/Stadion', time: '17:00h' },
  ];






  
  return (
    <div className="schedule-second-div">
      <div className="schedule-first-div">
        <h2 className="headline-profile">Moje obavijesti</h2>
      </div>
      <div className="schedule-second-div">
        <table
          style={{
            borderCollapse: 'separate',
            width: '100%',
            textAlign: 'center',
            fontSize: '22px',
            borderSpacing: '0px 20px'
          }}
        >
          <tbody>
            {notifications.map((notification) => {
              if (notification.user.id === 'receiver') {
                return (
                  <tr key={notification.id}>
                    <td style={{ padding: '8px'}}>
                      Korisnik {notification.user.name} vam salje poziv da mu se pridruzite!
                    </td>
                    <td style={{ padding: '8px'}}>
                      {notification.sport_hall}
                    </td>
                    <td style={{ padding: '8px'}}>{notification.time}</td>
                    <td style={{ padding: '8px'}}>
                      <button className="accept-invite-friend">Prihvati poziv</button>
                    </td>
                    <td style={{ padding: '8px'}}>
                      <button className="decline-invite-friend">Odbaci poziv</button>
                    </td>
                  </tr>
                );
              } else if (notification.user.id === 'sender' && notification.user.status === 0) {
                return (
                  <tr key={notification.id}>
                    <td style={{ padding: '8px' }}>
                      Pozvali ste korisnika {notification.user.name} da vam se pridruzi!
                    </td>
                    <td style={{ padding: '8px' }}>
                      {notification.sport_hall}
                    </td>
                    <td style={{ padding: '8px' }}>{notification.time}</td>
                    <td style={{ padding: '8px' }}></td>
                    <td style={{ padding: '8px' }}>
                      <button className="decline-invite-friend">Opozovi</button>
                    </td>
                  </tr>
                );
              } else if (notification.user.id === 'sender' && notification.user.status === 1) {
                return (
                  <tr key={notification.id}>
                    <td
                      style={{
                        padding: '10px',
                        backgroundColor: '#61dafb',
                        borderRadius: '25px',
                      }}
                    >
                      Korisnik {notification.user.name} je prihvatio vas zahtjev za termin!
                    </td>
                    <td style={{ padding: '8px' }}>
                      {notification.sport_hall}
                    </td>
                    <td style={{ padding: '8px' }}>{notification.time}</td>
                  </tr>
                );
              } else if (notification.user.id === 'sender' && notification.user.status === 2) {
                return (
                  <tr key={notification.id}>
                    <td
                      style={{
                        padding: '10px',
                        backgroundColor: '#FA8072',
                        borderRadius: '25px',
                      }}
                    >
                      Korisnik {notification.user.name} je odbacio vas zahtjev za termin!
                    </td>
                    <td style={{ padding: '8px'}}>
                      {notification.sport_hall}
                    </td>
                    <td style={{ padding: '8px' }}>{notification.time}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsComp;
