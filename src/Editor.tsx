import React from 'react';

import Jimp from 'jimp/browser/lib/jimp'
import Dropzone from 'react-dropzone';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Editor.scss';

import File2Jimp from './Common/File2Jimp';

const image_mime_extensions = {
  'image/png': ['.png'],
  'image/jpg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
};

enum tab_options {
  FileInfo = 'FileInfo',
  Editor = 'Editor'
};

type props = {
  tab: tab_options;
};

class Editor extends React.Component {

  state: props = {
    tab: tab_options.FileInfo,
  };

  image: Jimp | null = null;

  CanvasRef: React.RefObject<HTMLCanvasElement>;

  FileDropped = async (acceptedFiles: File[]): Promise<void> => {
    const file = acceptedFiles[0];
    await File2Jimp(file)
    .then((image: Jimp): void => {
      this.image = image;
    })
    .catch((err: Error): void => {
      console.log(err);
      window.alert("画像ファイルのMIME対応が不正です。\nPNG・GIF・JPEG・WEBPのいずれかのファイルを指定して下さい。");
    });
    this.Draw();
  };

  Draw = (): void => {
    if (this.image === null) return;
    const canvas = this.CanvasRef.current;
    if (canvas === null) return;
    const ctx = canvas.getContext('2d');
    if (ctx === null) return;
    const width = this.image.bitmap.width;
    const height = this.image.bitmap.height;
    canvas.width = width;
    canvas.height = height;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(this.image.bitmap.data);
    ctx.putImageData(imageData, 0, 0);
  };

  constructor(props: any) {
    super(props);
    this.CanvasRef = React.createRef();
  };

  render(): React.ReactNode {
    return (
      <div id="Editor">
        <div id="EditorTop">
          <div id="EditorHeader">
            <h1>画像編集サイト</h1>
            <p>画像を編集します。</p>
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
              <Button onClick={() => {this.setState({ tab: tab_options.FileInfo})}}>{tab_options.FileInfo}</Button>
              <Button onClick={() => {this.setState({ tab: tab_options.Editor})}}>{tab_options.Editor}</Button>
            </ButtonGroup>
            <div id="EditorMainTabSelected">{this.state.tab}</div>
          </div>
        </div>
      </div>
    );
  };
};

export default Editor;
