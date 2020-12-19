export interface Crd {
    apiVersion: string;
    kind: string;
    spec: CrdSpec;
    metadata: CrdMetadata;
}

export interface CrdMetadata {
    name: string;
}

export interface CrdSpec {
    versions: Array<CrdSpecVersion>;
}

export interface CrdSpecVersion {
    name: string;
    schema: CrdSpecSchema;
}

export interface CrdSpecSchema {
    openAPIV3Schema: any;
}
