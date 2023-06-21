const { ethers } = require("ethers");
const Router02Abi = require("../../contracts/out/UniswapV2Router02.sol/UniswapV2Router02.json");
const tokenAbi = require("../../contracts/out/SimpleToken.sol/SimpleToken.json");

const provider = new ethers.providers.JsonRpcProvider(
  process.env.HTTP_PROVIDER
);

module.exports = {
  approve: async (req, res) => {
    try {
      const { token0, token1 } = req.params;
      const { amount0, amount1 } = req.body;

      const token0Contract = new ethers.Contract(
        token0,
        tokenAbi.abi,
        provider
      );
      const token1Contract = new ethers.Contract(
        token1,
        tokenAbi.abi,
        provider
      );
      const wallet = new ethers.Wallet(process.env.OWNER_PRIV, provider);
      const token0ContractWithWallet = token0Contract.connect(wallet);
      const token1ContractWithWallet = token1Contract.connect(wallet);

      //   const tx = await token0ContractWithWallet.allowance(
      //     "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      //     "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
      //   );
      const tx0 = await token0ContractWithWallet.approve(
        "0xbf790A74e22D64de11D10e00207521C3883deF53",
        amount0
      );
      const tx1 = await token1ContractWithWallet.approve(
        "0xbf790A74e22D64de11D10e00207521C3883deF53",
        amount1
      );

      const receipt0 = await tx0.wait();
      const receipt1 = await tx1.wait();

      res.status(200).json({
        message: "ok",
        receipt: {
          //   receipt: tx,
          receipt0: receipt0,
          receipt1: receipt1,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("internal server error");
    }
  },
  addLiq: async (req, res) => {
    const UniswapV2Router02 = new ethers.Contract(
      "0xbf790A74e22D64de11D10e00207521C3883deF53",
      Router02Abi.abi,
      provider
    );
    const wallet = new ethers.Wallet(process.env.OWNER_PRIV, provider);
    const UniswapV2Router02WithWallet = UniswapV2Router02.connect(wallet);
    try {
      const { token0, token1 } = req.params;
      const { amount0, amount1, amount0Min, amount1Min } = req.body;
      const tx = await UniswapV2Router02WithWallet.addLiquidity(
        token0,
        token1,
        amount0,
        amount1,
        amount0Min,
        amount1Min,
        "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C86946",
        {
          gasLimit: 21000000,
        }
      );
      const receipt = await tx.wait();
      console.log(receipt);
      return res.status(200).json({
        message: "ok",
        receipt: receipt,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send("internal server error");
    }
  },
};
