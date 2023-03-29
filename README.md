# hardhat-gui-baker

_A simple plugin that automatically generates GUI for smartcontracts_

## What

This plugin will help you quickly test smartcontracts by locally creating a website in [viteJs](https://vitejs.dev/) so you can interact with it. You will have access to all your functions and a toolkit to impersonate accounts on the go or receive ERC20.

## Installation

```sh
pnpm i hardhat-gui-baker

yarn add hardhat-gui-baker

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

## Tasks

This plugin adds the gui-baker task to Hardhat:

```
Usage: hardhat [GLOBAL OPTIONS] gui-baker [--opt-port <STRING>] [--show-logs]

OPTIONS:

  --opt-port    Optional : Wich port will be used to expose the GUI
  --show-logs   Show logs

gui-baker: Create a simple Gui to test your smartcontracts
```

## Usage

(Remember to log the deployed contract address in your deployment script, you will need to provide it in the GUI)

lanch your node :

```sh
npm hardhat node
```

deploy your smartcontract :

```sh
npm hardhat run pathToYourDeployementScript.ts
```

bake your GUI :

```sh
npm hardhat gui-baker
```

enjoy your bakery on (defalut) : _https://localhost:4157_

You will need to connect your wallet and be able to interact with your contract, that's it!

## Whats next ?

- A configuration page will soon be added so that you will have to possibility to add all contract addresses only once.

- Switch from ethers to viem.sh.

- Basic rpc tools to change the BlockTime, BlockNumber...

- Integration of Hardhat network tools like impersonating accounts, resetting the node...

<br/><br/>

### Contribution

Thanks to [gdupont](https://github.com/GuiDupont) and [Solal Dunckel](https://github.com/solaldunckel)
