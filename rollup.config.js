import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import autoExternal from 'rollup-plugin-auto-external';

import pkg from './package.json';

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        autoExternal(),
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs({
            include: ['node_modules/**'],
            exclude: ['node_modules/process-es6/**'],
            namedExports: {
                'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement']
            }
        })
    ]
};
