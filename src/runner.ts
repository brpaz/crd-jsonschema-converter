import { Config, readConfig } from './config';
import { IProcessor } from './processor';
import Log from './log';

export default class Runner {
    private configPath: string;

    private processor: IProcessor;

    constructor(configPath: string, processor: IProcessor) {
        this.configPath = configPath;
        this.processor = processor;
    }

    /**
     * Main entrypoint, called by the cli.
     */
    public async run() {
        let cfg: Config;

        try {
            cfg = await readConfig(this.configPath);
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`Failed to parse config file:${e.message}`);
            }

            throw e;
        }

        for (const crd of cfg.crds) {
            Log.info(`Processing ${crd.name}`);
            this.processor.process(crd);
        }
    }
}
