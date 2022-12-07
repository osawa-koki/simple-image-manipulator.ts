import { Link } from 'react-router-dom';

import Settings from '../Common/Settings';

import './Root.scss';

function Root() {
  return (
    <div id="Root">
      <Link className='RootLink' to={`${Settings.ROOT_PATH}/editor`}>画像編集</Link>
    </div>
  );
}

export default Root;
