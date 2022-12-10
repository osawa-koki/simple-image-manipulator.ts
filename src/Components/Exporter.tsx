import React, { useState } from 'react';
import Jimp from 'jimp/browser/lib/jimp';

import './Exporter.scss';

type Props = {
  file: File | null;
  jimp: Jimp | null;
};

function Exporter(props: Props): JSX.Element {
  let [ filename , setFilename ] = useState(props.file?.name);
  let [ filetype , setFiletype ] = useState([] as string[]);
  let [ quality  , setQuality  ] = useState(100);
  let [ width, setWidth ] = useState(props.jimp?.bitmap.width);
  let [ height, setHeight ] = useState(props.jimp?.bitmap.height);
  let [ keepRatio, setKeepRatio ] = useState(true);
  let [ grayscale, setGrayscale ] = useState(false);

  return (
    <div id='ExportDiv'>
      <table id="ExportTable">
        <tbody>
          <tr>
            <th>ファイル名</th>
            <td><input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} /></td>
          </tr>
          <tr>
            <th>ファイルタイプ</th>
            <td>
              <select value={filetype} onChange={(e) => setFiletype([e.target.value])}>
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/bmp">BMP</option>
                <option value="image/tiff">TIFF</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>画像サイズ</th>
            <td>
              <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} />
              x
              <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} />
            </td>
          </tr>
          <tr>
            <th>縦横比を維持</th>
            <td><input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} /></td>
          </tr>
          <tr>
            <th>画質</th>
            <td><input type="number" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} /></td>
          </tr>
          <tr>
            <th>グレースケール</th>
            <td><input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Exporter;
