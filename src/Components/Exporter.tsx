import React, { useState } from 'react';
import Select from 'react-select'
import Jimp from 'jimp/browser/lib/jimp';
import Button from 'react-bootstrap/Button';

import { Path } from '../Common/Util';

import './Exporter.scss';

type Props = {
  file: File | null;
  jimp: Jimp | null;
};

const options = [
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/png', label: 'PNG' },
  { value: 'image/bmp', label: 'BMP' },
  { value: 'image/tiff', label: 'TIFF' },
];

function Floor(n: number | undefined): number | undefined {
  if (n === undefined) return undefined;
  return Math.floor(n);
}

function Exporter(props: Props): JSX.Element {
  let [ filename , setFilename ] = useState(props.file?.name);
  let [ filetype , setFiletype ] = useState([] as string[]);
  let [ quality  , setQuality  ] = useState(100);
  let [ width, setWidth ] = useState(props.jimp?.bitmap.width);
  let [ height, setHeight ] = useState(props.jimp?.bitmap.height);
  let [ keepRatio, setKeepRatio ] = useState(true);
  let [ grayscale, setGrayscale ] = useState(false);

  function changeWidth(e: React.ChangeEvent<HTMLInputElement>) {
    if (keepRatio) {
      let ratio = props.jimp?.bitmap.height! / props.jimp?.bitmap.width!;
      setWidth(parseInt(e.target.value));
      setHeight(Floor(parseInt(e.target.value) * ratio));
    } else {
      setWidth(parseInt(e.target.value));
    }
  };

  function changeHeight(e: React.ChangeEvent<HTMLInputElement>) {
    if (keepRatio) {
      let ratio = props.jimp?.bitmap.width! / props.jimp?.bitmap.height!;
      setHeight(parseInt(e.target.value));
      setWidth(Floor(parseInt(e.target.value) * ratio));
    } else {
      setHeight(parseInt(e.target.value));
    }
  };

  return (
    <div id='ExportDiv'>
      <table id="ExportTable">
        <tbody>
          <tr>
            <th>ファイル名</th>
            <td><input type="text" value={filename ?? Path.GetFileNameWithoutExtension(props.file?.name ?? '')} onChange={(e) => setFilename(e.target.value)} /></td>
          </tr>
          <tr>
            <th>ファイルタイプ</th>
            <td>
              <Select options={options} isMulti />
            </td>
          </tr>
          <tr>
            <th>画像サイズ</th>
            <td>
              <input type="number" value={width ?? props.jimp?.bitmap.width} onChange={(e) => changeWidth(e)} min='10' />
              <span className='horizontal_margin'>x</span>
              <input type="number" value={height ?? props.jimp?.bitmap.height} onChange={(e) => changeHeight(e)} min='10' />
            </td>
          </tr>
          <tr>
            <th>縦横比を維持</th>
            <td>
              <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} />
              {keepRatio && <span className='horizontal_margin'>縦横比: {props.jimp?.bitmap.height! / props.jimp?.bitmap.width!}</span>}
            </td>
          </tr>
          <tr>
            <th>画質</th>
            <td><input type="number" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} min='10' /></td>
          </tr>
          <tr>
            <th>グレースケール</th>
            <td><input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} /></td>
          </tr>
        </tbody>
      </table>
      <div id='ExportButtonBox'>
        <Button variant="success" size="lg">Export</Button>
      </div>
    </div>
  );
}

export default Exporter;
