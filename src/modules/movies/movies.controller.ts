import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieQueryDto } from './dto/movie-query.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { RolesGuard } from '@/common/guards/roles.guards';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Roles } from '@/common/decorators/roles.decorators';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll(@Query() query: MovieQueryDto) {
    return this.moviesService.findAllPaginated(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.moviesService.deleteMovie(id);
  }

  @Post('sync-starwars')
  @Roles('admin')
  async syncStarWars() {
    return this.moviesService.syncWithStarWarsAPI();
  }
}
