export interface RequestHeader {
  contentType: string;
  accessToken: string;
}

export interface Token {
  exp: number;
  id: number;
  issuer: string;
  subject: string;
}

export enum Animals {
  Bear = 'bear',
  Puppy = 'puppy',
  Unicorn = 'unicorn',
  Hamster = 'hamster',
  Fox = 'fox',
  Panda = 'panda',
  Tiger = 'tiger',
  Rabbit = 'rabbit'
}
