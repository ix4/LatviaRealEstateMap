export const resolvers = {
  Mutation: {
    setSelectedDates: (_, variables, { cache }) => {
      // @todo: can this be improved?
      cache.writeData({
        data: {
          start_date: variables.start_date,
          end_date: variables.end_date,
        },
      });
      return null;
    },
  },
};
