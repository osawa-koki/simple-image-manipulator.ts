
import React from 'react';
import './Header.scss';

import online_img from '../Assets/online.png';
import offline_img from '../Assets/offline.png';

const watchOnline = function(callback: { (online: any): void; (arg0: boolean): void; }) {
  window.addEventListener('online', () => callback(true))
  window.addEventListener('offline', () => callback(false))
};

function Header() {
  let [network_state, setNetworkState] = React.useState(navigator.onLine);

  watchOnline((online) => {
    if (online) {
      setNetworkState(true);
    } else {
      setNetworkState(false);
    }
  });

  return (
    <header id='Header'>
      <h1 id='HeaderTitle'>画像編集サイト</h1>
      <div id='OnlineOfflineDiv'>
        { network_state ?
          <img id='networkstate_image' src={online_img} alt="online" /> :
          <img id='networkstate_image' src={offline_img} alt="online" />
        }
      </div>
    </header>
  );
}

export default Header;
