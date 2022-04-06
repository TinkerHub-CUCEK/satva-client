import {format} from 'date-fns';

export const downloadCSV = function (data: any) {
  const blob = new Blob([data], {type: 'text/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'download.csv');
  a.click();
};

export const removeIdsFromMongoDBItem = (data: any[]) => {
  const newData = [...data];
  newData.forEach(item => {
    delete item['_id'];
    delete item['__v'];
  });
  return newData;
};

export const formatMongoDBDates = (data: any) => {
  data.forEach((item: any) => {
    for (const i in item) {
      if (isDateString(item[i])) {
        item[i] = format(new Date(item[i]), 'dd-MM-yyyy');
      }
      if (item[i] === true) {
        item[i] = 'yes';
      } else if (item[i] === false) {
        item[i] = 'false';
      }
    }
  });

  return data;
};

export const mongoDbToCSV = function (data: any[]) {
  const csvRows = [];
  const newData = removeIdsFromMongoDBItem(data);

  if (data.length > 0) {
    formatMongoDBDates(newData);
    const headers = Object.keys(newData[0]);
    csvRows.push(headers.join(','));

    newData.forEach(item => {
      const values = Object.values(item).join(',');
      csvRows.push(values);
    });
  }
  return csvRows.join('\n');
};

export const isDateString = (date: string) => {
  const _regExp = new RegExp(
    '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$',
  );
  return _regExp.test(date);
};
