#!/usr/bin/env node
import { program } from '@commander-js/extra-typings';
import { dev } from './cmd/dev';
import {DEFAULT_BANNERS_DIR, DEFAULT_LAYOUTS_DIR, DEFAULT_DEV_PORT} from './constants';
import packageJson from '../package.json';

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command('dev')
  .description('Start dev sever')
  .option('-d, --dir <path>', 'Directory with your banner', `./{${DEFAULT_BANNERS_DIR}, ${DEFAULT_LAYOUTS_DIR}}`)
  .option('-p, --port <port>', 'Port to run dev server on', `./${DEFAULT_DEV_PORT}`)
  .action(dev)

program.parse();