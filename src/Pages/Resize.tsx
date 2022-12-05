import React from 'react';

import Jimp from "jimp/browser/lib/jimp"

import './Resize.scss';

class Resize extends React.Component {

  FileDropped = (event: React.DragEvent<HTMLDivElement>): void => {
    console.log("DROPPED");
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files === null) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      if (event.target === null) {
        return;
      }
      const data = event.target.result as ArrayBuffer;
      Jimp.read(data as Buffer).then((image: Jimp): void => {
        console.log(image);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  FileSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files === null) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      if (event.target === null) {
        return;
      }
      const data = event.target.result as ArrayBuffer;
      Jimp.read(data as Buffer).then((image: Jimp): void => {
        console.log(image);
      });
    };
    reader.readAsArrayBuffer(file);
  };


  componentDidMount(): void {
    //
  }

  render(): React.ReactNode {
    return (
      <div id="Resize">
        <h1>リサイズ</h1>
        <p>画像をリサイズします。</p>
        <div id="drag-div" onDrop={this.FileDropped}></div>
        <input type="file" onChange={this.FileSelected} />
      </div>
    );
  }
}

export default Resize;
