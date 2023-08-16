import { recreateFiles } from './recreateFiles';

describe('recreateFiles function', () => {
  // Mock Date
  beforeAll(() => {
    jest
      .spyOn(global.Date.prototype, 'getMinutes')
      .mockReturnValue(10);
    jest
      .spyOn(global.Date.prototype, 'getSeconds')
      .mockReturnValue(20);
  });

  // Restore original implementation
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should create a new file with the correct format name', () => {
    const file = new File(['content'], 'file.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } };
    const newFile = recreateFiles(event);

    expect(newFile.name).toBe('file-1020.txt');
  });

  it('should preserve the extension of the original file', () => {
    const file = new File(['content'], 'file.tar.gz', { type: 'application/gzip' });
    const event = { target: { files: [file] } };
    const newFile = recreateFiles(event);

    expect(newFile.name).toBe('file.tar-1020.gz');
  });
});
