
/**
 export const sortDataByDate = (data, startdate, enddate) => {
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);
  
    const returndata = data.filter((a) => {
      const date = new Date(a.dateCreated);
      return date >= startDate && date <= endDate;
    });
 */

  //  import asset from "../models/asset";

    /**Returns an array of data sorted by date range. */
export const sortDataByDate = (data: any, startdate: string | undefined, 
  enddate: string | undefined, dateObject: string | undefined) => {
  const startDate = new Date(startdate!);
  const endDate = new Date(enddate!);

  const returndata = data.filter((a: any) => {
    const date = new Date(a[dateObject!]);
    return date >= startDate && date <= endDate;
  });

  return returndata
}

/**export const sDBD = <T>(data: T[], startdate: T, enddate: T, dateObject: T) => {
    const startDate = new Date(startdate!);
  const endDate = new Date(enddate!);

  const returndata = data.filter((a: T) => {
    const date = new Date(a[dateObject]);
    return date >= startDate && date <= endDate;
  });

  return returndata
} */

  /**Formats Date value: mm/dd/yyyy */
export const convertDateFormat = (str: string): string =>  {
  let date = new Date(str!),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    //return [date.getFullYear(), mnth, day].join("-");
    return [mnth, day, date.getFullYear()].join("/");
}

/**Generic array creator */
export const getArray = <T>(items: T[]): T[] => {
  return new Array().concat(items)
}

//let numArray = getArray<number>([1,2,4,3,4,6])
//let strArray = getArray<string>(['1', '2', '3', '4', '5', '4'])

/**
 /**Format numbers 
const formatMoney = () => {
  let money = getSum().toString().split("");
  const length = money.length;
  const tens = money.slice(0, 2);
  const hundreds = money.splice(0, 3);
  const thousands = money.splice(0, 4);
  return [tens, hundreds, thousands].join(",");
};

/**Search filter 
export const searchFilter = (db,text) => {
  const searchResult = db.filter((data) =>
    text.toLocaleLowerCase().includes(data._id)
  );
  return searchResult
}

 */