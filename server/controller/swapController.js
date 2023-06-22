const { ethers } = require("ethers");
const Router02Abi = require("../../contracts/out/UniswapV2Router02.sol/UniswapV2Router02.json");
const v2Library = require("../../contracts/out/UniswapV2Library.sol/UniswapV2Library.json");

const provider = new ethers.providers.JsonRpcProvider(
  process.env.HTTP_PROVIDER
);

module.exports = {
  swapExactTokensForTokens: async (req, res) => {
    try {
      const v2LibraryContract = new ethers.Contract(
        "0xbf790A74e22D64de11D10e00207521C3883deF53",
        Router02Abi.abi,
        provider
      );
      const wallet = new ethers.Wallet(process.env.OWNER_PRIV, provider);
      const v2LibraryContractww = v2LibraryContract.connect(wallet);

      const { amountIn, amountOutMin, path, to } = req.body;

      const tx = await v2LibraryContractww.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        path,
        to,
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
