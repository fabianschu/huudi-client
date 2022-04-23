const Proposals = (props) => {
  const { proposals } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Proposal Title</th>
          <th>Voting Strategies</th>
          <th>Eligible to Vote</th>
        </tr>
      </thead>
      <tbody>
        {proposals.map((p) => (
          <tr key={p.id}>
            <td>{p.title}</td>
            <td>
              {p.space.strategies.map((s, idx) => (
                <p key={idx}>
                  {idx + 1}. {s.name}: {s.params.symbol}
                </p>
              ))}
            </td>
            <td>kek</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Proposals;
