import html from 'rollup-plugin-html';
import css from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json';
import {writeFileSync} from 'fs';

export default [
    {
        input: 'src/main.js',
        external: ['https://unpkg.com/mustache@latest/mustache.mjs'],
        plugins: [
            livereload(),
            resolve(),
            html({
                include: '**/*.handlebars'
            }),
            css({
                output: (styles, styleNodes) => {
                    writeFileSync(pkg.css, styles)
                },
                failOnError: true,
            }),
        ],
        output: [
            {file: pkg.module, format: 'es'}
        ]
    }
];
