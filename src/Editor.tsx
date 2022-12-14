import React from 'react';

import Jimp from 'jimp/browser/lib/jimp';
import Dropzone from 'react-dropzone';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Editor.scss';

import File2Jimp from './Common/File2Jimp';
import { image_mime_extensions } from './Common/ImageMimeExtensions';

import Header from './Components/Header';
import FileInfo from './Components/FileInfo';
import Exporter from './Components/Exporter';

enum tab_options {
  FileInfo = 'FileInfo',
  Export = 'Export',
};

type Props = {
  file: File | null;
  jimp: Jimp | null;
  tab: tab_options;
};

class Editor extends React.Component {

  state: Props = {
    file: null,
    jimp: null,
    tab: tab_options.FileInfo,
  };

  CanvasRef: React.RefObject<HTMLCanvasElement>;

  FileDropped = async (acceptedFiles: File[]): Promise<void> => {
    const file = acceptedFiles[0];
    await File2Jimp(file)
    .then((jimp: Jimp): void => {
      this.setState({
        file: file,
        jimp: jimp,
      });
      this.Draw(jimp);
    })
    .catch((err: Error): void => {
      console.log(err);
      window.alert("画像ファイルのMIME対応が不正です。\nPNG・GIF・JPEG・WEBPのいずれかのファイルを指定して下さい。");
    });
  };

  Draw = (jimp: Jimp): void => {
    const canvas = this.CanvasRef.current;
    if (canvas === null) return;
    const ctx = canvas.getContext('2d');
    if (ctx === null) return;
    const width = jimp.bitmap.width;
    const height = jimp.bitmap.height;
    canvas.width = width;
    canvas.height = height;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(jimp.bitmap.data);
    ctx.putImageData(imageData, 0, 0);
  };

  DrawInitial = (): void => {
    const canvas = this.CanvasRef.current;
    if (canvas === null) return;
    const ctx = canvas.getContext('2d');
    if (ctx === null) return;
    const width = 400;
    const height = 300;
    const step = 20;
    const hue_random = Math.floor(Math.random() * 360);
    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        ctx.fillStyle = `hsl(${hue_random}, ${Math.random() * (90 - 10) + 10}%, 80%)`;
        ctx.fillRect(x, y, step, step);
      }
    }
  };

  constructor(props: any) {
    super(props);
    this.CanvasRef = React.createRef();
  };

  componentDidMount(): void {
    this.DrawInitial();
  }

  render(): React.ReactNode {
    return (
      <div id="Editor">
        <Header />
        <div id="EditorTop">
          <div id="EditorHeader">
            <p>画像を編集します。<br />全てオフラインで完結しているため、データが外部に流出する危険性はありません。</p>
          </div>
          <div id="EditorImporter">
            <Dropzone accept={image_mime_extensions} onDrop={(files: File[]) => {this.FileDropped(files)}}>
              {({getRootProps, getInputProps}) => (
                <div id="DropZone" {...getRootProps()}>
                  <input accept="image/png,image/jpg,image/gif,image/webp" {...getInputProps()} />
                  <p>画像ファイルをドロップして下さい。</p>
                </div>
              )}
            </Dropzone>
          </div>
          <canvas id="SampleCanvas" ref={this.CanvasRef}></canvas>
        </div>
        <div id="EditorMain">
          <div id="EditorMainTab">
            <ButtonGroup id="EditorMainTabs">
              <Button onClick={() => {this.setState({ tab: tab_options.FileInfo })}}>{tab_options.FileInfo}</Button>
              <Button onClick={() => {this.setState({ tab: tab_options.Export })}}>{tab_options.Export}</Button>
            </ButtonGroup>
            <div id="EditorMainTabSelected">{this.state.tab}</div>
          </div>
          <div>
            {(this.state.tab === tab_options.FileInfo) ?
              <FileInfo file={this.state.file} jimp={this.state.jimp} /> :
              <Exporter file={this.state.file} jimp={this.state.jimp} />
            }
          </div>
        </div>
      </div>
    );
  };
};

export default Editor;
