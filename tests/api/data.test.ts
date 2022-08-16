import { dataFunction } from '@/helpers/dataFunction';

test('will parse the test data successfully', () => {
  const file = '/uploads/test-data.csv';
  const page = 1;
  const filter = '';

  const { resultArray, numPages } = dataFunction(file, page, filter);
  expect(resultArray[0].Description).toEqual('WHITE HANGING HEART T-LIGHT HOLDER');
  expect(resultArray[1].Description).toEqual('WHITE METAL LANTERN');
  expect(resultArray[2].Description).toEqual('CREAM CUPID HEARTS COAT HANGER');
  expect(numPages).toBe(11);
});

test('will return an empty array if the page number is bigger than the number of pages', () => {
  const file = '/uploads/test-data.csv';
  const page = 99999;
  const filter = '';

  const { resultArray, numPages } = dataFunction(file, page, filter);
  expect(resultArray).toHaveLength(0);
  expect(numPages).toBe(11);
});

test('will return an empty array if the page number is negative', () => {
  const file = '/uploads/test-data.csv';
  const page = -1;
  const filter = '';

  const { resultArray, numPages } = dataFunction(file, page, filter);
  expect(resultArray).toHaveLength(0);
  expect(numPages).toBe(11);
});

test('will return the data if filtered', () => {
  const file = '/uploads/test-data.csv';
  const page = 1;
  const filter = 'hand warmer';

  const { resultArray, numPages } = dataFunction(file, page, filter);
  expect(resultArray[0].Description.startsWith('HAND WARMER')).toBeTruthy();
  expect(numPages).toBe(1);
});

test('will not return anything if the filter is nonsense', () => {
  const file = '/uploads/test-data.csv';
  const page = 1;
  const filter = 'asdfkhasifoh3yfa9dfao9821';

  const { resultArray, numPages } = dataFunction(file, page, filter);
  expect(numPages).toBe(1);
  expect(resultArray).toHaveLength(0);
});

test('will return based on a filtered time and date', () => {
  const file = '/uploads/test-data.csv';
  const page = 1;
  const filter = '12/01/2010 9:41';

  const { resultArray, numPages } = dataFunction(file, page, filter);
  expect(numPages).toBe(1);
  expect(resultArray.length > 0).toBeTruthy();
});

test('will parse a description with double quotation marks in the name', () => {
  const file = '/uploads/test-data.csv';
  const page = 1;
  const filter = 'airline';

  const { resultArray } = dataFunction(file, page, filter);
  expect(resultArray[0].Description).toEqual('AIRLINE LOUNGE,METAL SIGN');
});
