export default defineEventHandler(() => {
  return {
    categories: ['Movies', 'TV Series', 'Animation', 'Mistery', 'Documentary', 'Comedy', 'Horror', 'Thriller', 'More'],
    movies: [
      {
        title: 'The Shawshank Redemption',
        description:
          'A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.',
        genres: ['Epic', 'Period Drama', 'Prison Drama', 'Tragedy', 'Drama'],
        backgroundImage: 'https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_.jpg',
        trending: true,
      },
    ],
  };
});
