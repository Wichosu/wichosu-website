import * as migration_20260120_053410 from './20260120_053410';

export const migrations = [
  {
    up: migration_20260120_053410.up,
    down: migration_20260120_053410.down,
    name: '20260120_053410'
  },
];
