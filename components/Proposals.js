import { useEffect } from 'react'
import { utils } from '@snapshot-labs/snapshot.js'

const Proposals = () => {
  const { subgraphRequest } = utils

  useEffect(() => {
    const getProposals = async () => {
      const hub = 'https://hub.snapshot.org/graphql'
      const proposals = await subgraphRequest(hub, {
        proposals: {
          __args: {
            first: 100,
            where: {
              space_in: ['fuschu.eth'],
              state: 'closed',
            },
          },
          id: true,
          created: true,
          space: {
            id: true,
            strategies: { name: true, network: true, params: true },
          },
        },
      })
      return proposals
    }

    getProposals()
      .then((r) => console.log(r))
      .catch((e) => console.log(e))
  }, [])
  return <div>Proposals</div>
}

export default Proposals
