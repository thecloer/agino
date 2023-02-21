import { GameRecordArray, GAME_RESULTS } from '@/common/data';
import { readCSV, writeCSV } from '@/lib/csvFile';
import path from 'path';

class GameRecord {
  readonly RECORD_PATH = path.join(process.cwd(), 'db', 'record.csv');
  private _record: GameRecordArray = [];
  constructor() {
    const savedRecord = this.readRecord();
    this.addRecord(savedRecord);
  }

  get asArray() {
    return this._record.sort((a, b) => b[1].balance - a[1].balance);
  }
  private readRecord() {
    return readCSV(this.RECORD_PATH);
  }
  private async writeRecord() {
    writeCSV(this.RECORD_PATH, this._record);
  }

  addRecord(newRecord: GameRecordArray) {
    if (this._record.length === 0) {
      this._record = newRecord;
      this.writeRecord();
      return;
    }

    const savedGameCount = this._record[0][1].gameResults.length;
    const newGameCount = newRecord[0][1].gameResults.length;

    const savedPlayerNames = this._record.map(([name]) => name);
    const newPlayerNames = newRecord.map(([name]) => name);
    const totalPlayerNames = [...new Set([...savedPlayerNames, ...newPlayerNames])];

    totalPlayerNames.map((playerName) => {
      const savedPlayerRecord = this._record.find(([name]) => name === playerName);
      const newPlayerRecord = newRecord.find(([name]) => name === playerName);
      if (!savedPlayerRecord) {
        this._record.push([
          playerName,
          {
            balance: newPlayerRecord![1].balance,
            gameResults: Array.from({ length: savedGameCount }, () => GAME_RESULTS.NONE).concat(newPlayerRecord![1].gameResults),
          },
        ]);
      } else if (!newPlayerRecord) {
        savedPlayerRecord[1].gameResults.push(...Array.from({ length: newGameCount }, () => GAME_RESULTS.NONE));
      } else {
        savedPlayerRecord[1].balance += newPlayerRecord[1].balance;
        savedPlayerRecord[1].gameResults.push(...newPlayerRecord[1].gameResults);
      }
    });

    this.writeRecord();
  }
}

export const totalRecord = new GameRecord();
