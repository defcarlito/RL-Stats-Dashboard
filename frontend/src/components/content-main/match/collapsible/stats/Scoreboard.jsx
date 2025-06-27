import { Center, Table } from "@chakra-ui/react"

function Scoreboard({ matchPlayerInfo }) {
    const teamColors = {0: "blue.500", 1: "orange.400"}

    
    let sortedByLocalTeam = [...matchPlayerInfo].sort((a, b) => { 
        if (a.Team !== b.Team) {
            return a.Team - b.Team;
        }
        return b.Score - a.Score;
    })

    return (
        <Center w={"full"} border={"1px solid"} borderColor={"gray.700"}>
            <Table.Root>
                <Table.Header>
                    <Table.Row bg={"transparent"}>
                        <Table.ColumnHeader textAlign={"center"}>Player</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"}>Score</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"}>Goals</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"}>Assists</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"}>Saves</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"}>Shots</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortedByLocalTeam.map((player, index) => (
                        <Table.Row key={index} bg={
                            player.Name === "BrickBoned"
                                ? `${teamColors[player.Team]}/50`
                                : `${teamColors[player.Team]}/25`
                            }
                            >
                            <Table.Cell textAlign={"center"}>{player.Name}</Table.Cell>
                            <Table.Cell textAlign={"center"}>{player.Score}</Table.Cell>
                            <Table.Cell textAlign={"center"}>{player.Goals}</Table.Cell>
                            <Table.Cell textAlign={"center"}>{player.Assists}</Table.Cell>
                            <Table.Cell textAlign={"center"}>{player.Saves}</Table.Cell>
                            <Table.Cell textAlign={"center"}>{player.Shots}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Center>
    )
}

export default Scoreboard