export const resolvers = {
  Mutation: {
    setSelectedDates: (_, variables, { cache }) => {
      cache.writeData({
        data: {
          start_date: variables.start_date,
          end_date: variables.end_date,
        },
      });
      return null;
    },

    setSelectedCategory: (_, { category }, { cache }) => {
      cache.writeData({
        data: { category },
      });
      return null;
    },

    setHoveredRegion: (_, { region }, { cache }) => {
      cache.writeData({
        data: { region },
      });
      return null;
    },
  },
};
