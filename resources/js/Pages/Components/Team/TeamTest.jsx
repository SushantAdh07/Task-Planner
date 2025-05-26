function TeamTest({ auth, team }) {
    return (
        <div>
            <h1>Team: {team.name}</h1>
            <h2>Members:</h2>
            <ul>
                {team.members.map(member => (
                    <li key={member.id}>
                        {member.user.name} ({member.user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}