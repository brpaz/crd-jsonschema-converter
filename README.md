
# Kubernetes CRD to JsonSchema converter tool

> Cli tool that Converts Kubernetes CRDs into JSON Schema specifications, useful for using with tools like [Kubeval](https://github.com/instrumenta/kubeval).

## Usage

```sh
npx @brpaz/crd-jsonschema-converter -c config.yml -o schemas
```

The `-c` flag specifies the path to the config file, where the tool will fetch the CRD schemas. By default it will look for a `schemas.yml` in the current directory.

The `-o` flag, allows to specify the directory where the generated json schemas will be saved.

Considering that we want to generate schemas for cert-manager as example, we could define our `schema.yml` as following:

```yaml
crds:
  - name: cert-manager
    sources:
      master:
        - https://raw.githubusercontent.com/jetstack/cert-manager/master/deploy/crds/crd-certificaterequests.yaml
        - https://raw.githubusercontent.com/jetstack/cert-manager/master/deploy/crds/crd-certificates.yaml
        - https://raw.githubusercontent.com/jetstack/cert-manager/master/deploy/crds/crd-challenges.yaml
        - https://raw.githubusercontent.com/jetstack/cert-manager/master/deploy/crds/crd-clusterissuers.yaml
        - https://raw.githubusercontent.com/jetstack/cert-manager/master/deploy/crds/crd-issuers.yaml
        - https://raw.githubusercontent.com/jetstack/cert-manager/master/deploy/crds/crd-orders.yaml
```

Where `sources` is an array that allows you to define multiple versions of the schema.

Running the tool will generate the following directory structure, on the `output` folder:

```
└── cert-manager
    └── master
        ├── certificaterequests.cert-manager.io-v1alpha2.json
        ├── certificaterequests.cert-manager.io-v1alpha3.json
        ├── certificaterequests.cert-manager.io-v1beta1.json
        ├── certificaterequests.cert-manager.io-v1.json
        ├── certificates.cert-manager.io-v1alpha2.json
        ├── certificates.cert-manager.io-v1alpha3.json
        ├── certificates.cert-manager.io-v1beta1.json
        ├── certificates.cert-manager.io-v1.json
        ├── challenges.acme.cert-manager.io-v1alpha2.json
        ├── challenges.acme.cert-manager.io-v1alpha3.json
        ├── challenges.acme.cert-manager.io-v1beta1.json
        ├── challenges.acme.cert-manager.io-v1.json
        ├── clusterissuers.cert-manager.io-v1alpha2.json
        ├── clusterissuers.cert-manager.io-v1alpha3.json
        ├── clusterissuers.cert-manager.io-v1beta1.json
        ├── clusterissuers.cert-manager.io-v1.json
        ├── issuers.cert-manager.io-v1alpha2.json
        ├── issuers.cert-manager.io-v1alpha3.json
        ├── issuers.cert-manager.io-v1beta1.json
        ├── issuers.cert-manager.io-v1.json
        ├── orders.acme.cert-manager.io-v1alpha2.json
        ├── orders.acme.cert-manager.io-v1alpha3.json
        ├── orders.acme.cert-manager.io-v1beta1.json
        └── orders.acme.cert-manager.io-v1.json
```


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

👤 **Bruno Paz**

* Website: [brunopaz.dev](https://brunopaz.dev)
* Github: [@brpaz](https://github.com/brpaz)
* Twitter: [@brunopaz88](https://twitter.com/brunopaz88)

## 📝 License

Copyright © 2020 [Bruno Paz](https://github.com/brpaz).

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
