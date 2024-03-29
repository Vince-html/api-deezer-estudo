import qual from '../../src/useQual';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

describe('test qual', () => {
  it('should return true', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    // jest.spyOn(require, 'resolve').mockImplementation(() => 'test');
    const result = await qual({ metodo: 'post' });
    expect(result).toBe(false);
  });
  it('should return false', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    // jest.spyOn(require, 'resolve').mockImplementation(() => 'test');
    const result = await qual({ metodo: 'post' });
    expect(result).not.toBe(false);
  });
});
