import React from 'react';

import './Resize.scss';

class Resize extends React.Component {

  render(): React.ReactNode {
    return (
      <div id="Resize">
        <h1>リサイズ</h1>
        <p>画像をリサイズします。</p>
        <p>画像をドラッグ＆ドロップしてください。</p>
      </div>
    );
  }
}

export default Resize;
