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
    trailers: [
      {
        title: 'Beetlejuice Beetlejuice',
        tags: 'Comedy, Fantasy, Horror',
        backgroundImage: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/xi1VSt3DtkevUmzCx2mNlCoDe74.jpg',
      },
      {
        title: 'Smile 2',
        tags: 'Horror, Mystery',
        backgroundImage: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/cVg97LOJgrDZJ7bVmjU2KsGRYnU.jpg',
      },
      {
        title: 'Deadpool & Wolverine',
        tags: 'Action, Comedy, Science Fiction',
        backgroundImage: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
      },
    ],
  };
});
