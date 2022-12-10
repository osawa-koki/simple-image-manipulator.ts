
class Path {
  public static Combine(...paths: string[]): string {
    let result = "";
    for (let i = 0; i < paths.length; i++) {
      if (i > 0) {
        result += "/";
      }
      result += paths[i];
    }
    return result;
  }

  public static GetFileName(path: string): string {
    let index = path.lastIndexOf("/");
    if (index >= 0) {
      return path.substr(index + 1);
    }
    return path;
  }

  public static GetFileNameWithoutExtension(path: string): string {
    let fileName = Path.GetFileName(path);
    let index = fileName.lastIndexOf(".");
    if (index >= 0) {
      return fileName.substr(0, index);
    }
    return fileName;
  }
};

export { Path };
