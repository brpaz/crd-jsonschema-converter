#!/usr/bin/env node

import * as yargs from 'yargs';
import Runner from './runner';
import Log from './log';
import { Processor } from './processor';

const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .example('$0 -o public/schemas', 'Generates JSON schemas based on the CRDs paths defined in the config file.')
    .version('1.0.0')
    .help('h')
    .options({
        output: {
            alias: 'o',
            default: 'dist/schemas',
            description: 'The directory to save the generated JSON Schemas',
        },
        config: {
            alias: 'c',
            default: 'schemas.yml',
            description: 'Path to to the configuration file containing the paths for the Kubernetes CRDs',
        },
    }).argv;

try {
    const processor = new Processor(argv.output);
    new Runner(argv.config, processor).run();
} catch (e) {
    if (e instanceof Error) {
        Log.error(e.message);
    }
    process.exit(1);
}
