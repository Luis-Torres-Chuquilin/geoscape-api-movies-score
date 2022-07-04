/** @format */

export enum FetchState {
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface MovieScore {
  score: number;
}

export interface Movie {
  movie: string;
  provider: string;
}

export interface MovieCreate {
  movie: string;
  provider: string;
  score: number;
}
