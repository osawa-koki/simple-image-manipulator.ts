import Jimp from 'jimp/browser/lib/jimp';

import './FileInfo.scss';

type Props = {
  file: File | null;
  jimp: Jimp | null;
};

function FileInfo(props: Props): JSX.Element {
  const { file, jimp } = props;
  return (
    <div id='FileInfoDiv'>
      <table id="FileInfoTable">
        <tbody>
          <tr>
            <th>ファイル名</th>
            <td>{file?.name}</td>
          </tr>
          <tr>
            <th>ファイルサイズ</th>
            <td>{file?.size}</td>
          </tr>
          <tr>
            <th>ファイルタイプ</th>
            <td>{file?.type}</td>
          </tr>
          <tr>
            <th>画像サイズ</th>
            <td>{jimp?.bitmap.width} x {jimp?.bitmap.height}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FileInfo;
