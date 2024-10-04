interface Trailer {
  title: string;
  backgroundImage: string;
}

interface Movie {
  title: string;
  description: string;
  genres: string[];
  backgroundImage: string;
  trending: boolean;
}

interface ApiResponse {
  categories: string[];
  movies: Movie[];
  trailers: Trailer[];
}
