
class EasyDate {

  private year: number | null = null;
  private month: number | null = null;
  private day: number | null = null;
  private hour: number | null = null;
  private minute: number | null = null;
  private second: number | null = null;
  private millisecond: number | null = null;

  public isLeapYear(): boolean | null {
    if (this.year === null) {
      return null;
    }
    return (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
  }

  constructor(date: Date | string | number | null = null) {
    if (typeof date === 'string') {
      const dateParts = date.split(/ T/);
      const datePart = dateParts[0].split('-');
      this.year = parseInt(datePart[0], 10);
      this.month = parseInt(datePart[1], 10);
      this.day = parseInt(datePart[2], 10);
      if (dateParts.length > 1) {
        const timePart = dateParts[1].split(':');
        this.hour = parseInt(timePart[0], 10);
        this.minute = parseInt(timePart[1], 10);
        this.second = parseInt(timePart[2], 10);
      }
      return;
    }
    if (typeof date === 'number') {
      const dateObject = new Date(date);
      this.year = dateObject.getFullYear();
      this.month = dateObject.getMonth() + 1;
      this.day = dateObject.getDate();
      this.hour = dateObject.getHours();
      this.minute = dateObject.getMinutes();
      this.second = dateObject.getSeconds();
      this.millisecond = dateObject.getMilliseconds();
      return;
    }
    if (date === null) {
      date = new Date();
    }
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
    this.millisecond = date.getMilliseconds();
  }

  public getYear(): number | null {
    return this.year;
  }

  public getMonth(): number | null {
    return this.month;
  }

  public getDay(): number | null {
    return this.day;
  }

  public getHour(): number | null {
    return this.hour;
  }

  public getMinute(): number | null {
    return this.minute;
  }

  public getSecond(): number | null {
    return this.second;
  }

  public getMillisecond(): number | null {
    return this.millisecond;
  }

  public getDayOfWeek(): number | null {
    if (this.year === null || this.month === null || this.day === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    return date.getDay();
  }

  public getDayOfYear(): number | null {
    if (this.year === null || this.month === null || this.day === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    const start = new Date(this.year, 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  public getWeekOfYear(): number | null {
    if (this.year === null || this.month === null || this.day === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    const oneJan = new Date(this.year, 0, 1);
    return Math.ceil((((date.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1) / 7);
  }

  public getWeekOfMonth(): number | null {
    if (this.year === null || this.month === null || this.day === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    const firstDay = new Date(this.year, this.month - 1, 1);
    return Math.ceil((((date.getTime() - firstDay.getTime()) / 86400000) + firstDay.getDay() + 1) / 7);
  }

  public getDaysInMonth(): number | null {
    if (this.year === null || this.month === null) {
      return null;
    }
    return new Date(this.year, this.month, 0).getDate();
  }

  public getDaysInYear(): number | null {
    if (this.year === null) {
      return null;
    }
    return this.isLeapYear() ? 366 : 365;
  }

  public getWeeksInYear(): number | null {
    if (this.year === null) {
      return null;
    }
    const date = new Date(this.year, 11, 31);
    const day = date.getDay();
    return day < 4 ? 52 : 53;
  }

  public getWeeksInMonth(): number | null {
    if (this.year === null || this.month === null) {
      return null;
    }
    const date = new Date(this.year, this.month, 0);
    const day = date.getDay();
    return day < 4 ? 52 : 53;
  }

  public getDaysInWeek(): number | null {
    if (this.year === null || this.month === null || this.day === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    return date.getDay();
  }

  public getDaysInWeekend(): number | null {
    if (this.year === null || this.month === null || this.day === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    return date.getDay() === 6 || date.getDay() === 0 ? 1 : 0;
  }

  public getDaysInWeekday(): number | null {
    if (this.year === null || this.month === null || this.day === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    return date.getDay() === 6 || date.getDay() === 0 ? 0 : 1;
  }

  public getDaysInQuarter(): number | null {
    if (this.year === null || this.month === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, 1);
    const month = date.getMonth();
    const quarter = Math.floor(month / 3);
    const start = new Date(this.year, quarter * 3, 1);
    const end = new Date(this.year, quarter * 3 + 3, 1);
    return Math.round((end.getTime() - start.getTime()) / 86400000);
  }

  public getDaysInYearQuarter(): number | null {
    if (this.year === null || this.month === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, 1);
    const month = date.getMonth();
    const quarter = Math.floor(month / 3);
    const start = new Date(this.year, quarter * 3, 1);
    const end = new Date(this.year, quarter * 3 + 3, 1);
    return Math.round((end.getTime() - start.getTime()) / 86400000);
  }

  public getDaysInMonthQuarter(): number | null {
    if (this.year === null || this.month === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, 1);
    const month = date.getMonth();
    const quarter = Math.floor(month / 3);
    const start = new Date(this.year, quarter * 3, 1);
    const end = new Date(this.year, quarter * 3 + 3, 1);
    return Math.round((end.getTime() - start.getTime()) / 86400000);
  }

  public getDaysInWeekQuarter(): number | null {
    if (this.year === null || this.month === null || this.day === null) {
      return null;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    const month = date.getMonth();
    const quarter = Math.floor(month / 3);
    const start = new Date(this.year, quarter * 3, 1);
    const end = new Date(this.year, quarter * 3 + 3, 1);
    return Math.round((end.getTime() - start.getTime()) / 86400000);
  }

  public ToString(format: string): string {
    if (this.year === null || this.month === null || this.day === null) {
      return '';
    }
    const formats = new Map<string, string | null>();
    formats.set('yyyy', this.year.toString());
    formats.set('YY', this.year.toString().slice(2));
    formats.set('MMMM', this.month.toString());
    formats.set('MMM', this.month.toString());
    formats.set('MM', `0${this.month}`.slice(-2));
    formats.set('M', this.month.toString());
    formats.set('dddd', this.day.toString());
    formats.set('ddd', this.day.toString());
    formats.set('dd', `0${this.day}`.slice(-2));
    formats.set('d', this.day.toString());

    let result = format;
    formats.forEach((value, key) => {
      result = result.replace(key, value || '');
    });
    return result;
  }
};

export default EasyDate;
