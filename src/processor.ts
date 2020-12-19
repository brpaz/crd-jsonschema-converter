import { Config, CrdConfig } from './config';
import fetch from 'node-fetch';
import YAML from 'yaml';
import { Crd } from './crd';
import path from 'path';
import Log from './log';
import fs from 'fs-extra';

import toJsonSchema from '@openapi-contrib/openapi-schema-to-json-schema';

export interface IProcessor {
    process(crd: CrdConfig): void;
}

export class Processor {
    private outputDir: string;

    public constructor(outputDir: string) {
        this.outputDir = outputDir;
    }

    /**
     *
     * @param crdConfig CRD configuration, loaded from Config file.
     */
    public async process(crdConfig: CrdConfig): Promise<void> {
        for (const [version, sources] of Object.entries(crdConfig.sources)) {
            const outputDir = path.join(this.outputDir, crdConfig.name, version);

            await fs.mkdirp(outputDir);

            for (const manifestUrl of sources) {
                const crd = await this.fetchCrd(manifestUrl);

                await this.convertAndSave(outputDir, crd);
            }
        }
    }

    /**
     * Fetch a Custom resource definition from the specified URL.
     * @param url The url for the Custom Resource Definition
     */
    private async fetchCrd(url: string): Promise<Crd> {
        const res = await fetch(url, {
            redirect: 'follow',
            timeout: 5000,
        });

        if (res.status !== 200) {
            throw new Error(`Failed to fetch ${url} from GitHub: ${res.statusText}`);
        }

        const crdContents = await res.text();

        return YAML.parse(crdContents) as Crd;
    }

    /**
     *
     * @param outputDir The drirectory where to save the generated files
     * @param crd The original CRD definition
     */
    private async convertAndSave(outputDir: string, crd: Crd): Promise<void> {
        for (const specVersion of crd.spec.versions) {
            const jsonSchema = toJsonSchema(specVersion.schema.openAPIV3Schema);
            const fileName = `${crd.metadata.name}-${specVersion.name}.json`;

            const filePath = path.join(outputDir, fileName);
            Log.info(`Generating file: ${filePath}`);

            await fs.writeJSON(filePath, jsonSchema, { encoding: 'utf-8', spaces: 2 });
        }
    }
}
