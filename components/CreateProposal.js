import { useContext } from 'react'
import snapshot from '@snapshot-labs/snapshot.js'
import { Web3Context } from '../context/Web3Context'
import { Web3Provider } from '@ethersproject/providers'

// const web3 = new Web3Provider(window.ethereum)
// const [account] = await web3.listAccounts()

// const receipt = await client.proposal(web3, account, {
//   space: 'yam.eth',
//   type: 'single-choice',
//   title: 'Test proposal using Snapshot.js',
//   body: '',
//   choices: ['Alice', 'Bob', 'Carol'],
//   start: 1636984800,
//   end: 1637244000,
//   snapshot: 13620822,
//   network: '1',
//   strategies: JSON.stringify({}),
//   plugins: JSON.stringify({}),
//   metadata: JSON.stringify({}),
// })

const CreateProposal = () => {
  const { state, connect, disconnect } = useContext(Web3Context)
  const { web3Provider, address, chainId } = state

  const hub = 'https://hub.snapshot.org' // or https://testnet.snapshot.org for testnet
  const client = new snapshot.Client712(hub)

  const createProposal = async () => {
    client
      .proposal(web3Provider, address, {
        space: 'fuschu.eth',
        type: 'single-choice',
        title: 'Different proposal using Snapshot.js',
        body: '',
        choices: ['Alice', 'Bob', 'Carol'],
        start: 1636984800,
        end: 1637244000,
        snapshot: 13620822,
        network: '1',
        strategies: JSON.stringify({
          name: 'erc20-balance-of',
          network: '1',
          params: {
            address: '0xC128a9954e6c874eA3d62ce62B468bA073093F25',
            decimals: 18,
            symbol: 'veBAL',
          },
        }),
        plugins: JSON.stringify({}),
        metadata: JSON.stringify({}),
      })
      .then((r) => console.log(r))
      .catch((e) => console.log(e))
  }

  return <button onClick={createProposal}>Create Proposal</button>
}

// const web3 = new Web3Provider(window.ethereum)
// const [account] = await web3.listAccounts()

// const receipt = await client.proposal(web3, account, {
//   space: 'yam.eth',
//   type: 'single-choice',
//   title: 'Test proposal using Snapshot.js',
//   body: '',
//   choices: ['Alice', 'Bob', 'Carol'],
//   start: 1636984800,
//   end: 1637244000,
//   snapshot: 13620822,
//   network: '1',
//   strategies: JSON.stringify({}),
//   plugins: JSON.stringify({}),
//   metadata: JSON.stringify({}),
// })

export default CreateProposal
