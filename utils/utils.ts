/**Returns an array of data sorted by date range. */
export const sortDataByDate = <T>(
  data: Array<T>,
  startdate: string,
  enddate: string,
  dateObject: string | number
) => {
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);

  const returndata = data?.filter((a: any) => {
    const date = new Date(a[dateObject]);
    return date >= startDate && date <= endDate;
  });

  return returndata;
};

/**Sort Implementation */
export const sortData = <T>(
  data: Array<T>,
  sortValue: keyof T,
  searchvalue: string
) => {
  const returndata = data?.filter((a: T) => {
    const searchRef = a[sortValue];
    if (typeof searchRef === "string") {
      return searchRef.toLocaleLowerCase().includes(searchvalue);
    }
  });
  return returndata;
};

/**Sort Implementation */
export const sortMultipleData = <T>(
  data: Array<T>,
  sortValue: Array<keyof T>,
  searchvalue: string
) => {
  const returndata = data?.filter((a: T) => {
    //return current key
    const st = sortValue.filter((key) => {
      const keyRef: T[keyof T] = a[key]
      if (typeof keyRef === "string") {
         return keyRef.toLocaleLowerCase().includes(searchvalue)
      }
    })
    //search with current key
      const searchRef = a[st[0]];
      if (typeof searchRef === "string") {
        return searchRef.toLocaleLowerCase().includes(searchvalue)
      }

      //time complexity: 
  })
  return returndata
};

/**Formats Date value: mm/dd/yyyy or yyyy-mm-dd */
export const convertDateFormat = (
  str: string,
  type: "yyyy-mm-dd" | "mm/dd/yyyy"
) => {
  let date = new Date(str!),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  if (type === "yyyy-mm-dd") return [date.getFullYear(), mnth, day].join("-");
  if (type === "mm/dd/yyyy") return [mnth, day, date.getFullYear()].join("/");
};
