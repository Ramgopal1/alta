/**
 * Script to calculate npm run release options
 * based on type and branchname
 *
 * @prop {String} type - type of release ( major, minor, patch, dry-run)
 * @prop {String} branchName - name of branch ( must have PBI number in name except master)
 */
const { exec } = require('child_process');

function releasePackage(releaseType, pbi) {
  let type = releaseType;
  let cmd = 'npm run release -- ';
  if (type === undefined || type === '') {
    type = 'patch';
  }
  switch (type) {
    case 'patch':
      break;
    case 'minor':
      cmd += ' --release-as minor';
      break;
    case 'major':
      cmd += ' --release-as major';
      break;
    case 'dry-run':
      cmd += ' --dry-run';
      break;
    default:
      break;
  }
  // appended 'alpha' text to make prerelease option working properly
  if (pbi !== undefined && pbi !== '') {
    cmd += ` --prerelease ${pbi}-alpha`;
  }
  return cmd;
}
function getPBI(branchName) {
  const branchParts = branchName.match(/(\d+)/);
  const pbi = (branchParts && branchParts[0]) || '';
  if (!pbi) {
    // eslint-disable-next-line no-console
    console.log('There must be PBI in the branch name');
    return false;
  }
  return pbi;
}
// argv[2] is release type and argv[3] is branch name
if (!process.argv[2] || !process.argv[3]) {
  // eslint-disable-next-line no-console
  console.log('Specify type of release and branch name!');
} else {
  let branchName = process.argv[3];
  branchName = branchName.replace('refs/heads/', '');
  const pbi = branchName !== 'master' ? getPBI(branchName) : '';
  const cmd = releasePackage(process.argv[2], pbi);
  exec(cmd, (err, stdout) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    else console.log(stdout);
  });
}
