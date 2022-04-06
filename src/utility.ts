export const downloadCSV = function (data: any) {
  const blob = new Blob([data], {type: 'text/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'download.csv');
  a.click();
};

export const objToCSV = function (data: any) {
  const csvRows = [];
  const headers = Object.keys(data);
  csvRows.push(headers.join(','));

  const values = Object.values(data).join(',');
  csvRows.push(values);
  return csvRows.join('\n');
};
