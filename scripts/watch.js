import path from 'path';
import esbuild from 'esbuild';
import { SOURCE_PATH } from './constants.js';
import {execaNode} from 'execa';

const entryPoints = [
    'index.ts'
].map(file => path.join(SOURCE_PATH, file));

const argvs = process.argv.slice(2);
const runPath = process.cwd();

esbuild.build({
    entryPoints: entryPoints,
    bundle: true,
    platform: 'node',
    target: ['node14'],
    outdir: 'dist',
    watch: {
        onRebuild() {
            execaNode(argvs[0], {cwd: runPath, stdio: 'inherit'});
        }
    },
}).then(async () => {
    console.info('watching');
    execaNode(argvs[0], {cwd: runPath, stdio: 'inherit'});
});