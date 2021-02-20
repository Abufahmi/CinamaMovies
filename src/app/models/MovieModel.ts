import { Movie } from "./Movie";
import { MovieActor } from "./MovieActor";
import { MovieLink } from "./MovieLink";

export class MovieModel {
  movie: Movie;
  actors: MovieActor[];
  links: MovieLink[];
}
