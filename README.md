# hardhat-gui-baker

_A simple plugin that automatically generate GUI for smartcontracts_

## What

This plugin will help you quickly test smartcontracts by creating a website in next so you can interact with it. You will have access to all your functions and a toolkit to impersonate accounts on the go or receive ERC20.

## Installation

```sh
npm install hardhat-gui-baker
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-gui-baker");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-gui-baker";
```

<!-- ## Required plugins

- [wighawag/hardhat-deploy](https://github.com/wighawag/hardhat-deploy) -->

## Tasks

This plugin adds the gui-baker task to Hardhat:

```
Usage: hardhat [GLOBAL OPTIONS] gui-baker --contract <STRING> [--opt-deploy <STRING>] [--opt-network <STRING>]

OPTIONS:

  --contract    The contract name
  --opt-deploy  Optional : Path to the deploy script
  --opt-network Optional : Wich network will be used
```

<!--
## Environment extensions


This plugin extends the Hardhat Runtime Environment by adding an `example` field
whose type is `ExampleHardhatRuntimeEnvironmentField`. -->
<!--
## Configuration

<_A description of each extension to the HardhatConfig or to its fields_>

This plugin extends the `HardhatUserConfig`'s `ProjectPathsUserConfig` object with an optional
`newPath` field.

This is an example of how to set it:

```js
module.exports = {
  paths: {
    newPath: "new-path",
  },
}; -->

## Usage

(Remember to log the deployed contract address in your deployment script, you will need to provide it in the GUI)

lanch your node :

```
hardhat node
```

deploy your smartcontract :

```
hardhat run scripts/deploy.ts
```

bake your GUI :

```
hardhat gui-baker --contract ContractName
```

enjoy your bakery on : _localhost:3000_

or simply use optionals params :

```
hardhat gui-baker --contract ContractName --opt-deploy scrpits/deploys.ts --opt-network localhost
```

\
<br/><br/>

### contribution

Thanks to [gdupont](https://github.com/GuiDupont) and [Solal Dunckel](https://github.com/solaldunckel)
