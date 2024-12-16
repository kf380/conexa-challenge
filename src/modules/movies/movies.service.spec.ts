import { Test, TestingModule } from '@nestjs/testing';
import { IMovieRepository } from 'src/common/interfaces/movie-repository.interface';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let repo: IMovieRepository;

  beforeEach(async () => {
    const mockRepo: IMovieRepository = {
      createMovie: jest.fn(),
      findMoviesPaginated: jest.fn(),
      findMovieById: jest.fn(),
      updateMovie: jest.fn(),
      deleteMovie: jest.fn(),
      syncStarWarsMovies: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: 'IMovieRepository', useValue: mockRepo },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repo = module.get<IMovieRepository>('IMovieRepository');
  });

  it('13. createMovie should call repo.createMovie', async () => {
    const mockData = { title: 'Test', director: 'Test Dir' };
    (repo.createMovie as jest.Mock).mockResolvedValue({ id: '123', ...mockData });
    const result = await service.createMovie(mockData as any);
    expect(repo.createMovie).toHaveBeenCalledWith(mockData);
    expect(result).toEqual({ id: '123', ...mockData });
  });

  it('14. findOne should throw if movie not found', async () => {
    (repo.findMovieById as jest.Mock).mockResolvedValue(null);
    await expect(service.findOne('nonexistent')).rejects.toThrow();
  });
});
