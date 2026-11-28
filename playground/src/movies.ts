// Fictional films for the demo. Images are positioned crops of the two
// backgrounds in `public/`, so the page needs no external requests.

export interface Movie {
  title: string
  description: string
  genres: string[]
  image: string
  position: string
}

export interface Trailer {
  title: string
  tags: string
  image: string
  position: string
}

export const categories = [
  'Movies',
  'TV Series',
  'Animation',
  'Mystery',
  'Documentary',
  'Comedy',
  'Thriller',
]

export const movies: Movie[] = [
  {
    title: 'Quiet Hours',
    description: 'In a crumbling apartment above an old café, a translator spends one long night listening to the city — and to a voice on the radio that knows her name.',
    genres: ['Drama', 'Mystery', 'Slow Cinema'],
    image: '/room.jpg',
    position: '50% 40%',
  },
  {
    title: 'The Glass Garden',
    description: 'A botanist discovers a greenhouse deep in the rainforest that grows memories instead of plants, and starts to forget which ones are hers.',
    genres: ['Fantasy', 'Adventure'],
    image: '/jungle.jpg',
    position: '50% 50%',
  },
]

export const trailers: Trailer[] = [
  {
    title: 'Midnight Bloom',
    tags: 'Fantasy, Romance',
    image: '/jungle.jpg',
    position: '20% 30%',
  },
  {
    title: 'The Lamplighter',
    tags: 'Drama, Mystery',
    image: '/room.jpg',
    position: '52% 20%',
  },
  {
    title: 'Green Room',
    tags: 'Thriller',
    image: '/jungle.jpg',
    position: '80% 70%',
  },
  {
    title: 'Window Seat',
    tags: 'Comedy, Drama',
    image: '/room.jpg',
    position: '78% 45%',
  },
]
