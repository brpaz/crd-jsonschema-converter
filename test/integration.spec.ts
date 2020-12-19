import fs from 'fs-extra';
import path from 'path';
import os from 'os';

import { Processor } from '../src/processor';
import { Config, readConfig } from '../src/config';

describe('Runs processor', () => {
    it('generates schema files', async () => {
        const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'crd-json-schema-'));
        const processor = new Processor(outputDir);

        const fixturesFile = path.join(__dirname, 'fixtures', 'crds.yml');
        const cfg = (await readConfig(fixturesFile)) as Config;
        await processor.process(cfg.crds[0]);

        const schemasDir = path.join(outputDir, 'cert-manager', 'master');

        expect(fs.existsSync(schemasDir)).toBe(true);

        await fs.emptyDir(outputDir);
        await fs.rmdir(outputDir);
    });
});
