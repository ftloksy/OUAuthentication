// Create MD5 hash for password auth.

import { createHash } from 'node:crypto';

function md5(content) {
  return createHash('md5').update(content).digest('hex');
};

export default md5;
