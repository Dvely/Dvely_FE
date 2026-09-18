const ZIP_EXTENSION = '.zip';
const ZIP_MIME_TYPES = new Set([
  'application/zip',
  'application/x-zip-compressed',
  'application/zip-compressed',
  'application/x-zip',
]);

export const MAX_MY_TEMPLATE_ZIP_BYTES = 50 * 1024 * 1024;

export function isZipFile(file: File) {
  const name = file.name.toLowerCase();
  if (!name.endsWith(ZIP_EXTENSION)) return false;
  if (!file.type) return true;
  return ZIP_MIME_TYPES.has(file.type);
}

export function getZipFileError(file: File) {
  if (!isZipFile(file)) {
    return 'ZIP 파일만 첨부할 수 있습니다.';
  }

  if (file.size <= 0) {
    return '비어 있는 파일은 첨부할 수 없습니다.';
  }

  if (file.size > MAX_MY_TEMPLATE_ZIP_BYTES) {
    return 'ZIP 파일은 50MB 이하만 첨부할 수 있습니다.';
  }

  return null;
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
