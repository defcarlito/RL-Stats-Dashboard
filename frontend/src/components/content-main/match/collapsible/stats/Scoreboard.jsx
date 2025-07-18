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
        <Center w={"full"} border={"5px solid"} borderColor={"border.soft"} borderRadius={"lg"}>
            <Table.Root>
                <Table.Header>
                    <Table.Row bg={"transparent"}>
                        <Table.ColumnHeader textAlign={"center"} color={"text.base"} borderColor={"transparent"}>Player</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"} color={"text.base"} borderColor={"transparent"}>Score</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"} color={"text.base"} borderColor={"transparent"}>Goals</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"} color={"text.base"} borderColor={"transparent"}>Assists</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"} color={"text.base"} borderColor={"transparent"}>Saves</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={"center"} color={"text.base"} borderColor={"transparent"}>Shots</Table.ColumnHeader>
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
                            <Table.Cell textAlign={"center"} borderColor={"transparent"}>{player.Name}</Table.Cell>
                            <Table.Cell textAlign={"center"} borderColor={"transparent"}>{player.Score}</Table.Cell>
                            <Table.Cell textAlign={"center"} borderColor={"transparent"}>{player.Goals}</Table.Cell>
                            <Table.Cell textAlign={"center"} borderColor={"transparent"}>{player.Assists}</Table.Cell>
                            <Table.Cell textAlign={"center"} borderColor={"transparent"}>{player.Saves}</Table.Cell>
                            <Table.Cell textAlign={"center"} borderColor={"transparent"}>{player.Shots}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Center>
    )
}

export default Scoreboard