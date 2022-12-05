import { Link } from 'react-router-dom';

import Settings from '../Common/Settings';

import './Root.scss';

function Root() {
  return (
    <div id="Root">
      <Link className='RootLink' to={`${Settings.ROOT_PATH}/description`}>リサイズ</Link>
      <Link className='RootLink' to={`${Settings.ROOT_PATH}/demo`}>フォーマット変更</Link>
    </div>
  );
}

export default Root;
