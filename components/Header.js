import { useContext } from 'react'
import { Web3Context } from '../context/Web3Context'
import { ellipseAddress, getChainData } from '../lib/utilities'

const Header = () => {
  const { state, connect, disconnect } = useContext(Web3Context)
  const { web3Provider, address, chainId } = state

  const chainData = getChainData(chainId)

  return (
    <header>
      <h1>Wallet Info</h1>
      {address && (
        <div>
          <div>
            <span>Network: </span>
            <span>{chainData?.name}</span>
          </div>
          <div>
            <span>Address: </span>
            <span>{ellipseAddress(address)}</span>
          </div>
        </div>
      )}
      {web3Provider ? (
        <button className="button" type="button" onClick={disconnect}>
          Disconnect
        </button>
      ) : (
        <button className="button" type="button" onClick={connect}>
          Connect
        </button>
      )}
    </header>
  )
}

export default Header
