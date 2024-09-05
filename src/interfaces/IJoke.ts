export interface IJokeInputDto {
  content: string;
  type: string;
  status: string;
}

export interface IJoke extends IJokeInputDto {
  _id: string;
}
