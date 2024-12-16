import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { MovieQueryDto } from './dto/movie-query.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IMovieRepository } from 'src/common/interfaces/movie-repository.interface';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepo: IMovieRepository,
  ) {}

  async findAllPaginated(query: MovieQueryDto) {
    const { limit = 10, offset = 0, director, title } = query;
    return this.movieRepo.findMoviesPaginated({ limit, offset, director, title });
  }

  async findOne(id: string) {
    const movie = await this.movieRepo.findMovieById(id);
    if (!movie) throw new NotFoundException('Película no encontrada');
    return movie;
  }

  async createMovie(dto: CreateMovieDto) {
    return this.movieRepo.createMovie(dto);
  }

  async updateMovie(id: string, dto: UpdateMovieDto) {
    const updated = await this.movieRepo.updateMovie(id, dto);
    if (!updated) throw new NotFoundException('Película no encontrada');
    return updated;
  }

  async deleteMovie(id: string) {
    await this.movieRepo.deleteMovie(id);
  }

  async syncWithStarWarsAPI() {
    const response = await axios.get('https://swapi.tech/api/films/');
    const swMovies = response.data.result.map(item => item.properties);
    
    await this.movieRepo.syncStarWarsMovies(swMovies);
    
    return { message: 'Sincronización con Star Wars completada con éxito' };
  }
  
  
  
}
