import React from 'react';

import Jimp from 'jimp/browser/lib/jimp'
import Dropzone from 'react-dropzone';

import './Editor.scss';

import File2Jimp from './Common/File2Jimp';

class Editor extends React.Component {

  image: Jimp | null = null;

  CanvasRef: React.RefObject<HTMLCanvasElement>;

  FileDropped = async (acceptedFiles: File[]): Promise<void> => {
    const file = acceptedFiles[0];
    await File2Jimp(file).then((image: Jimp): void => {
      this.image = image;
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
  }

  render(): React.ReactNode {
    return (
      <div id="Editor">
        <div id="EditorTop">
          <div id="EditorHeader">
            <h1>画像編集サイト</h1>
            <p>画像を編集します。</p>
          </div>
          <div id="EditorImporter">
            <Dropzone onDrop={(files: File[]) => {this.FileDropped(files)}}>
              {({getRootProps, getInputProps}) => (
                <div id="DropZone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>画像ファイルをドロップして下さい。</p>
                </div>
              )}
            </Dropzone>
          </div>
          <canvas id="SampleCanvas" ref={this.CanvasRef}></canvas>
        </div>
      </div>
    );
  }
}

export default Editor;
