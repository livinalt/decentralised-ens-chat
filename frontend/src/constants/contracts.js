import { ethers } from "ethers";
import ChatABI from "./ChatABI.json";
import EnsAbi from "./ENSABI.json";

export const getEnsContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_ENS_CONTRACT_ADDRESS,
        EnsAbi,
        providerOrSigner
    );

    export const getChatContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_CHAT_DAPP_CONTRACT_ADDRESS,
        ChatABI,
        providerOrSigner
    );
