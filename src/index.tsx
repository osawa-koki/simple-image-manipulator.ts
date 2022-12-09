import React from 'react';

import Jimp from 'jimp/browser/lib/jimp'
import Dropzone from 'react-dropzone';

import './index.scss';

class Editor extends React.Component {

  image: Jimp | null = null;

  File2Jimp = async (file: File): Promise<Jimp> => {
    return await new Promise((resolve, reject): void => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>): void => {
        if (event.target === null) {
          reject();
          return;
        }
        const data = event.target.result as ArrayBuffer;
        Jimp.read(data as Buffer).then((image: Jimp): void => {
          resolve(image);
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  FileDropped = async (acceptedFiles: File[]): Promise<void> => {
    const file = acceptedFiles[0];
    await this.File2Jimp(file).then((image: Jimp): void => {
      this.image = image;
    });
    this.Draw();
  };

  Draw = (): void => {
    if (this.image === null) {
      return;
    }
    const canvas = this.CanvasRef.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      return;
    }
    const width = this.image.bitmap.width;
    const height = this.image.bitmap.height;
    canvas.width = width;
    canvas.height = height;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(this.image.bitmap.data);
    ctx.putImageData(imageData, 0, 0);
  };

  CanvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: any) {
    super(props);
    this.CanvasRef = React.createRef();
  }

  render(): React.ReactNode {
    return (
      <div id="Editor">
        <h1>画像編集サイト</h1>
        <p>画像を編集します。</p>
        <div>
          <Dropzone onDrop={(files: File[]) => {this.FileDropped(files)}}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div id="DropZone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>画像ファイルをドロップして下さい。</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div>
        <canvas id="SampleCanvas" ref={this.CanvasRef}></canvas>
        </div>
      </div>
    );
  }
}

export default Editor;
