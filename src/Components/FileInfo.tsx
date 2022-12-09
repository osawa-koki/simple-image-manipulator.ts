import Jimp from 'jimp/browser/lib/jimp';
import EasyDate from '../Common/EasyDate';

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
            <th>最終更新日時</th>
            <td>{new EasyDate(props?.file?.lastModified).ToString("yyyy年MM月dd日")}</td>
          </tr>
          <tr>
            <th>画像形式</th>
            <td>{jimp?.getMIME()}</td>
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
