class NativeFile extends FileObject {
  listFiles(): FileObject[] | null {
    throw new Error("Method not implemented.");
  }
  isDirectory(): boolean {
    throw new Error("Method not implemented.");
  }
  isFile(): boolean {
    throw new Error("Method not implemented.");
  }
  getName(): string {
    throw new Error("Method not implemented.");
  }
  getParentFile(): FileObject | null {
    throw new Error("Method not implemented.");
  }
  exists(): boolean {
    throw new Error("Method not implemented.");
  }
  createNewFile(): boolean {
    throw new Error("Method not implemented.");
  }
  mkdir(): boolean {
    throw new Error("Method not implemented.");
  }
  mkdirs(): boolean {
    throw new Error("Method not implemented.");
  }
  writeText(text: string): void {
    throw new Error("Method not implemented.");
  }
  readText(): string {
    throw new Error("Method not implemented.");
  }
  length(): number {
    throw new Error("Method not implemented.");
  }
  delete(): boolean {
    throw new Error("Method not implemented.");
  }
  getMimeType(context: any): string | null {
    throw new Error("Method not implemented.");
  }
  renameTo(newName: string): boolean {
    throw new Error("Method not implemented.");
  }
  hasChild(name: string): boolean {
    throw new Error("Method not implemented.");
  }
  createChild(createFile: boolean, name: string): FileObject | null {
    throw new Error("Method not implemented.");
  }
  canWrite(): boolean {
    throw new Error("Method not implemented.");
  }
  canRead(): boolean {
    throw new Error("Method not implemented.");
  }
  getChildForName(name: string): FileObject {
    throw new Error("Method not implemented.");
  }
}
