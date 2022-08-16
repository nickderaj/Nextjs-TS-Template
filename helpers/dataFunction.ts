import fs from 'fs';
import path from 'path';

export interface IColumn {
  InvoiceNo: string;
  StockCode: string;
  Description: string;
  Quantity: string;
  InvoiceDate: string;
  UnitPrice: string;
  CustomerID: string;
  Country: string;
}

function splitExceptDoubleQuotes(str: string) {
  let delimiter = ',';
  let quotes = '"';
  let elements = str.split(delimiter);
  let newElements = [];
  for (let i = 0; i < elements.length; ++i) {
    if (elements[i].indexOf(quotes) >= 0) {
      //the left double quotes is found
      let indexOfRightQuotes = -1;
      let tmp = elements[i];
      //find the right double quotes
      for (let j = i + 1; j < elements.length; ++j) {
        if (elements[j].indexOf(quotes) >= 0) {
          indexOfRightQuotes = j;
          break;
        }
      }
      //found the right double quotes
      //merge all the elements between double quotes
      if (-1 != indexOfRightQuotes) {
        for (let j = i + 1; j <= indexOfRightQuotes; ++j) {
          tmp = tmp + delimiter + elements[j];
        }
        newElements.push(tmp.replace(/"/g, '')); // remove " from string
        i = indexOfRightQuotes;
      } else {
        //right double quotes is not found
        newElements.push(elements[i]);
      }
    } else {
      //no left double quotes is found
      newElements.push(elements[i]);
    }
  }

  return newElements;
}

export const dataFunction = (file: string, page: number, filter: string) => {
  const publicFolder = path.join(process.cwd(), 'public/');
  const csv = fs.readFileSync(publicFolder + file, 'utf8');
  const array = csv.split('\r\n');
  array.shift(); // remove the headings

  let filteredArray: any[] = [];
  if (filter) {
    array.forEach((row) => {
      const columns = splitExceptDoubleQuotes(row);
      if (columns.some((col) => col.toLowerCase().indexOf(filter.toLowerCase()) > -1)) {
        filteredArray.push(row);
      }
    });
  } else filteredArray = array;

  const perPage = 10;
  let numPages = Math.floor(filteredArray.length / perPage);
  if (numPages == 0) numPages = 1;
  if (page < 1 || page > numPages) return { resultArray: [], numPages };

  const resultArray: IColumn[] = [];
  for (let i = 10 * page - perPage; i < 10 * page + (10 - perPage); i++) {
    if (!filteredArray[i]) break;
    const columns = splitExceptDoubleQuotes(filteredArray[i]);
    resultArray.push({
      InvoiceNo: columns[0],
      StockCode: columns[1],
      Description: columns[2],
      Quantity: columns[3],
      InvoiceDate: columns[4],
      UnitPrice: columns[5],
      CustomerID: columns[6],
      Country: columns[7],
    });
  }

  return { resultArray, numPages };
};
