import * as migration_20260120_053410 from './20260120_053410';
import * as migration_20260125_032528 from './20260125_032528';
import * as migration_20260126_010345 from './20260126_010345';

export const migrations = [
  {
    up: migration_20260120_053410.up,
    down: migration_20260120_053410.down,
    name: '20260120_053410',
  },
  {
    up: migration_20260125_032528.up,
    down: migration_20260125_032528.down,
    name: '20260125_032528',
  },
  {
    up: migration_20260126_010345.up,
    down: migration_20260126_010345.down,
    name: '20260126_010345'
  },
];
