
 /**Returns an array of data sorted by date range. */
export const sortDataByDate = <T>(data: Array<T>, startdate: string, 
  enddate: string, dateObject: string | number) => {
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  
  const returndata = data?.filter((a: any) => {
      const date = new Date(a[dateObject]);
      return date >= startDate && date <= endDate;
  })

  return returndata
}

/**Filter array data */
export const sortData = <T>(data: Array<T>, sortValue: keyof T, searchvalue: string) => {

  const returndata = data?.filter((a: T) => {
    const searchRef = a[sortValue]
    if (typeof searchRef === "string"){
      return searchRef.toLocaleLowerCase().includes(searchvalue);
    }
  })

  return returndata
}

  /**Formats Date value: mm/dd/yyyy */
export const convertDateFormat = (str: string): string =>  {
  let date = new Date(str!),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
   // return [mnth, day, date.getFullYear()].join("/");
}

/**Generic array creator */
export const getArray = <T>(items: T[]): T[] => {
  return new Array().concat(items)
}