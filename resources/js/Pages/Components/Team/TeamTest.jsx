import React from "react";

export default function TeamTest({ team, members }) {
    console.log("team name:", team.name);
    console.log("how many:", members.length)
    return (
        <div>
            <h1>Team name: {team.team_name}</h1>

            <h2>{team.user_id}</h2>
            {members.map((member)=>(
                <h1>{member.name}</h1>
            ))}
        </div>
    );
}
