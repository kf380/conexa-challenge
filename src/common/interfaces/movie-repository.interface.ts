
import { CreateMovieDto } from 'src/modules/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/modules/movies/dto/update-movie.dto';

export interface MovieModel {
  _id?: string; 
  title: string;
  director: string;
  releaseDate?: string;
}

export interface IMovieRepository {
  createMovie(data: CreateMovieDto): Promise<MovieModel>;
  findMoviesPaginated(params: {
    limit: number;
    offset: number;
    director?: string;
    title?: string;
  }): Promise<{
    items: MovieModel[];
    total: number;
    limit: number;
    offset: number;
  }>;
  findMovieById(id: string): Promise<MovieModel | null>;
  updateMovie(id: string, data: UpdateMovieDto): Promise<MovieModel | null>;
  deleteMovie(id: string): Promise<void>;
  syncStarWarsMovies(swMovies: any[]): Promise<void>;
}
