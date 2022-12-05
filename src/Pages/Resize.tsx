import React from 'react';

import Jimp from "jimp/browser/lib/jimp"

import './Resize.scss';

class Resize extends React.Component {

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

  FileDropped = async (event: React.DragEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files === null) {
      return;
    }
    const file = files[0];
    await this.File2Jimp(file).then((image: Jimp): void => {
      this.image = image;
    });
  };

  FileSelected = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = event.target.files;
    if (files === null) {
      return;
    }
    const file = files[0];
    await this.File2Jimp(file).then((image: Jimp): void => {
      this.image = image;
    });
  };

  componentDidMount(): void {
    //
  }

  render(): React.ReactNode {
    return (
      <div id="Resize">
        <h1>リサイズ</h1>
        <p>画像をリサイズします。</p>
        <input id="drag-div" onDrop={this.FileDropped} placeholder="ドラッグ＆ドロップ" />
        <input type="file" onChange={this.FileSelected} />
      </div>
    );
  }
}

export default Resize;
