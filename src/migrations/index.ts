import * as migration_20260120_053410 from './20260120_053410';
import * as migration_20260125_032528 from './20260125_032528';
import * as migration_20260126_010345 from './20260126_010345';
import * as migration_20260126_024756 from './20260126_024756';
import * as migration_20260220_021245 from './20260220_021245';
import * as migration_20260221_201738 from './20260221_201738';

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
    name: '20260126_010345',
  },
  {
    up: migration_20260126_024756.up,
    down: migration_20260126_024756.down,
    name: '20260126_024756',
  },
  {
    up: migration_20260220_021245.up,
    down: migration_20260220_021245.down,
    name: '20260220_021245',
  },
  {
    up: migration_20260221_201738.up,
    down: migration_20260221_201738.down,
    name: '20260221_201738'
  },
];
