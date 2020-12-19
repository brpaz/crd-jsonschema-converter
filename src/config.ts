import fs from 'fs-extra';
import YAML from 'yaml';

export interface Config {
    crds: Array<CrdConfig>;
}

export interface CrdConfig {
    name: string;
    sources: Map<string, Array<string>>;
}

export async function readConfig(configPath: string): Promise<Config> {
    const file = await fs.readFile(configPath, 'utf8');
    return YAML.parse(file, {}) as Config;
}
