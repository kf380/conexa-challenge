
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovieRepository, MovieModel } from 'src/common/interfaces/movie-repository.interface';
import { MovieDocument, MovieEntity } from '../schemas/movie.schema';
import { CreateMovieDto } from 'src/modules/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/modules/movies/dto/update-movie.dto';

@Injectable()
export class MongoMovieRepository implements IMovieRepository {
  constructor(
    @InjectModel(MovieEntity.name)
    private readonly movieModel: Model<MovieDocument>,
  ) {}

  async createMovie(data: CreateMovieDto): Promise<MovieModel> {
    const createdMovie = new this.movieModel({
      title: data.title,
      director: data.director,
      releaseDate: data.releaseDate,
    });
    const savedMovie = await createdMovie.save();
    return {
      _id: savedMovie._id.toString(),
      title: savedMovie.title,
      director: savedMovie.director,
      releaseDate: savedMovie.releaseDate,
    };
  }

  async findMoviesPaginated({ limit, offset, director, title }): Promise<{
    items: MovieModel[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const filter: any = {};
    if (director) filter.director = { $regex: director, $options: 'i' };
    if (title) filter.title = { $regex: title, $options: 'i' };

    const [docs, total] = await Promise.all([
      this.movieModel.find(filter).skip(offset).limit(limit).exec(),
      this.movieModel.countDocuments(filter).exec(),
    ]);

    const items: MovieModel[] = docs.map(doc => ({
      _id: doc._id.toString(),
      title: doc.title,
      director: doc.director,
      releaseDate: doc.releaseDate,
    }));

    return {
      items,
      total,
      limit,
      offset,
    };
  }

  async findMovieById(id: string): Promise<MovieModel | null> {
    const doc = await this.movieModel.findById(id).exec();
    if (!doc) return null;

    return {
      _id: doc._id.toString(),
      title: doc.title,
      director: doc.director,
      releaseDate: doc.releaseDate,
    };
  }

  async updateMovie(id: string, data: UpdateMovieDto): Promise<MovieModel | null> {
    const updated = await this.movieModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) return null;

    return {
      _id: updated._id.toString(),
      title: updated.title,
      director: updated.director,
      releaseDate: updated.releaseDate,
    };
  }

  async deleteMovie(id: string): Promise<void> {
    await this.movieModel.findByIdAndDelete(id).exec();
  }

  async syncStarWarsMovies(swMovies: any[]): Promise<void> {
    for (const swMovie of swMovies) {
      const existing = await this.movieModel.findOne({ title: swMovie.title }).exec();
      if (!existing) {
        await this.movieModel.create({
          title: swMovie.title,
          director: swMovie.director,
          releaseDate: swMovie.release_date,
        });
      }
    }
  }
}
