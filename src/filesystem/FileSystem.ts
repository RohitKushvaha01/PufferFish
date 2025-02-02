abstract class FileObject {
  abstract listFiles(): FileObject[] | null;
  abstract isDirectory(): boolean;
  abstract isFile(): boolean;
  abstract getName(): string;
  abstract getParentFile(): FileObject | null;
  abstract exists(): boolean;
  abstract createNewFile(): boolean;
  abstract mkdir(): boolean;
  abstract mkdirs(): boolean;
  abstract writeText(text: string): void;
  abstract readText(): string;
  abstract length(): number;
  abstract delete(): boolean;
  abstract getMimeType(context: any): string | null;
  abstract renameTo(newName: string): boolean;
  abstract hasChild(name: string): boolean;
  abstract createChild(createFile: boolean, name: string): FileObject | null;
  abstract canWrite(): boolean;
  abstract canRead(): boolean;
  abstract getChildForName(name: string): FileObject;
}
