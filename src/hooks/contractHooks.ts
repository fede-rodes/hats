import { Contract } from "@ethersproject/contracts";
import { useCall, useContractFunction } from "@usedapp/core";
import { BigNumber } from "ethers";
import { checkMasterAddress } from "utils";
import erc20Abi from "../data/abis/erc20.json";
import vaultAbi from "../data/abis/HATSVault.json";


export function useAllowance(tokenAddress: string, ownerAddress: string, spenderAddress: string): BigNumber | undefined {
    const { value, error } = useCall({
        contract: new Contract(tokenAddress, erc20Abi),
        method: "allowance",
        args: [ownerAddress, spenderAddress]
    }) ?? {}
    if (error) {
        return undefined
    }
    return value?.[0]
}

export function usePendingReward(address: string, pid: string, account: string): BigNumber | undefined {
    const { value, error } = useCall({
        contract: new Contract(address, vaultAbi),
        method: 'pendingReward',
        args: [pid, account]
    }) ?? {}
    if (error) {
        return undefined
    }
    return value?.[0]
}

export function useApproveToken(tokenAddress: string) {
    return useContractFunction(new Contract(tokenAddress, erc20Abi), 'approve');
}

export function useDepositAndClaim(address: string) {
    checkMasterAddress(address)
    return useContractFunction(new Contract(address, vaultAbi), 'deposit')

}

export function useWithdrawAndClaim(address: string) {
    checkMasterAddress(address)
    return useContractFunction(new Contract(address, vaultAbi), 'withdraw')
}

export function useWithdrawRequest(address: string) {
    checkMasterAddress(address)
    return useContractFunction(new Contract(address, vaultAbi), 'withdrawRequest')

}

export function useClaim(address: string) {
    checkMasterAddress(address)
    return useContractFunction(new Contract(address, vaultAbi), 'claim')
}

export function useCheckIn(address: string) {
    checkMasterAddress(address)
    return useContractFunction(new Contract(address, vaultAbi), 'checkIn')
}