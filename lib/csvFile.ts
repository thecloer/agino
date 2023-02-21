import { GameRecordArray, GameRecordArrayRowSchema } from '@/common/data';
import { writeFile, readFileSync } from 'fs';

// name, balance, games...
export const recordArrayToCSV = (record: GameRecordArray) =>
  record.map(([name, { balance, gameResults }]) => [name, balance, ...gameResults].join(',')).join('\n');

const csvToRecordArray = (csv: string) => {
  const recordArray: GameRecordArray = [];
  csv.split('\n').forEach((line) => {
    const [name, balance, ...gameResults] = line.split(',');
    recordArray.push(
      GameRecordArrayRowSchema.parse([
        name,
        { balance: Number(balance), gameResults: gameResults.map((result) => Number(result)) },
      ])
    );
  });
  return recordArray;
};

export const writeCSV = (path: string, record: GameRecordArray) =>
  writeFile(path, recordArrayToCSV(record), (err) => err && console.log(err));

export const readCSV = (path: string) => {
  try {
    const savedRecord = readFileSync(path, 'utf8');
    return csvToRecordArray(savedRecord);
  } catch (error) {
    console.log('Error while reading record file.');
    console.log(error instanceof Error ? error.message : error);
    return [];
  }
};
