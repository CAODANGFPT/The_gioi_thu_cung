import Dashboard from "../models/dashboard";
import dayjs from "dayjs";

export const list = async (req, res) => {
  try {
    const twelveMonthsAgo = Array.from({ length: 12 }, (_, index) => {
      const date = dayjs().subtract(index, "month");
      return {
        year: date.year(),
        month: date.month() + 1,
      };
    });

    const sortedMonths = twelveMonthsAgo.sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month;
      }
      return a.year - b.year;
    });

    const data = await sortedMonths.reduce(async (resultPromise, item) => {
      const result = await resultPromise;
      const res = await Dashboard.getDashboard(
        item.year.toString(),
        item.month.toString()
      );
      result.push({ ...res, month: item.month, year: item.year });
      return result;
    }, Promise.resolve([]));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const total = async (req, res) => {
  try {
    const sortedMonths = [
      {
        year: dayjs().year(),
        month: dayjs().month() + 1,
      },
      {
        year: dayjs().year(),
        month: dayjs().subtract(1, "month").month() + 1,
      },
    ];

    // const twelveMonthsAgo = Array.from({ length: 12 }, (_, index) => {
    //   const date = dayjs().subtract(index, "month");
    //   return {
    //     year: date.year(),
    //     month: date.month() + 1,
    //   };
    // });

    // const sortedMonths = twelveMonthsAgo.sort((a, b) => {
    //   if (a.year === b.year) {
    //     return a.month - b.month;
    //   }
    //   return a.year - b.year;
    // });

    const data = await sortedMonths.reduce(async (resultPromise, item) => {
      const result = await resultPromise;
      const res = await Dashboard.getDashboard(
        item.year.toString(),
        item.month.toString()
      );
      result.push({ ...res, month: item.month, year: item.year });
      return result;
    }, Promise.resolve([]));
    const total0 = +data[0].total_revenue === null ? 0 : data[0].total_revenue;
    const total1 = +data[1].total_revenue === null ? 0 : data[1].total_revenue;
    const total = ((total0 - total1) / total1) * 100;
    res.json(total);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
