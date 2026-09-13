export interface SourceEntry {
  path: string;
  content: string | Uint8Array;
}

export interface ArchiveReport {
  fileCount: number;
  files: string[];
  size: number;
}

export const SOURCE_ZIP_NAME: string;
export const SOURCE_ROOT: string;
export const REQUIRED_SOURCE_FILES: string[];
export function verifySourceArchive(data: Uint8Array | ArrayBuffer, expectedEntries?: SourceEntry[]): Promise<ArchiveReport>;
export function createSourceArchive(entries: SourceEntry[], onProgress?: (percent: number) => void): Promise<ArchiveReport & { bytes: Uint8Array }>;