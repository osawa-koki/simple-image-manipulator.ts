import React, {useCallback} from 'react';

import Jimp from 'jimp/browser/lib/jimp'
import Dropzone from 'react-dropzone';

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

  FileDropped = async (acceptedFiles: File[]): Promise<void> => {
    const file = acceptedFiles[0];
    await this.File2Jimp(file).then((image: Jimp): void => {
      this.image = image;
    });
    console.log(this.image);
  };

  componentDidMount(): void {
    //
  }

  render(): React.ReactNode {
    return (
      <div id="Resize">
        <h1>リサイズ</h1>
        <p>画像をリサイズします。</p>
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
    );
  }
}

export default Resize;
