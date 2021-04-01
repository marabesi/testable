import { User } from '../../packages/types/User';

export function makeUser(): User {
  return {
    email: 'fake@fake.com',
    introduction: false,
    level: 1,
    name: 'fake jr',
    photo: 'https://my.photo/me.png',
    progress: 10,
    tutorial: false,
    uid: 'sdas-das-das-d'
  };
}

