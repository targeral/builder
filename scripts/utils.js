import path from 'path';

export const dirname = (debug = false) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    if (debug) {
        console.info(__dirname);
    }
    return __dirname;
}