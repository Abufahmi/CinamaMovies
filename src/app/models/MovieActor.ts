import { Actor } from "./Actor";
import { Movie } from "./Movie";

export class MovieActor {
    id: number;
    actorId: number;
    actor: Actor;
    movieId: number;
    movie: Movie;
}