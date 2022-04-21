import path from 'path';
import esbuild from 'esbuild';
import { SOURCE_PATH } from './constants.js';

const entryPoints = [
    'index.ts'
].map(file => path.join(SOURCE_PATH, file));

esbuild.buildSync({
    entryPoints: entryPoints,
    bundle: true,
    platform: 'node',
    target: ['node14'],
    outdir: 'dist',
});