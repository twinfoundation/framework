// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { execSync } from 'node:child_process';

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const pattern = /^(feature|bugfix|hotfix|release|chore)\/[\da-z-]+?$/;

if (!pattern.test(branchName) && branchName !== 'next') {
	process.stderr.write(`ERROR: Branch name '${branchName}' doesn't match the required pattern.\n`);
	process.stderr.write(
		'Branch names should start: feature/, bugfix/, hotfix/, release/ or chore/\n'
	);
	process.stderr.write('and the name should consist of lowercase letters, numbers and hyphens.\n');
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
}
