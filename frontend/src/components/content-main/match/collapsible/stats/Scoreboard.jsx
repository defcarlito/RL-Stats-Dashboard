import { HStack, VStack, Box, Center, Button, Stack } from "@chakra-ui/react"

function Scoreboard({ matchPlayerInfo, localPlayerTeam }) {
    const opponentTeam = localPlayerTeam === 0 ? 1 : 0

    const teamColors = {0: "blue.500", 1: "orange.400"}

    let sortedByLocalTeam = [...matchPlayerInfo].sort((a, b) => { 
        if (a.Team !== b.Team) {
            return a.Team - b.Team;
        }
        return a.Score - b.Score;
    })

    if (localPlayerTeam !== 0) sortedByLocalTeam.reverse()

    return (
        <Center w={"full"} border={"1px solid"} borderColor={"gray.700"}>
            <VStack w={"full"} py={4}>
                <HStack w={"full"} justifyContent={"space-between"}>
                    <Box flex={1} textAlign={"left"}>Player</Box>
                    <Box flex={1} textAlign={"center"}>Score</Box>
                    <Box flex={1} textAlign={"center"}>Goals</Box>
                    <Box flex={1} textAlign={"center"}>Assists</Box>
                    <Box flex={1} textAlign={"center"}>Saves</Box>
                    <Box flex={1} textAlign={"center"}>Shots</Box>
                </HStack>
                {sortedByLocalTeam.map((player) => (
                <HStack w={"full"} justifyContent={"space-between"} color={teamColors[player.Team]}>
                    <Box flex={1} textAlign={"left"} >{player.Name}</Box>
                    <Box flex={1} textAlign={"center"}>{player.Score}</Box>
                    <Box flex={1} textAlign={"center"}>{player.Goals}</Box>
                    <Box flex={1} textAlign={"center"}>{player.Assists}</Box>
                    <Box flex={1} textAlign={"center"}>{player.Saves}</Box>
                    <Box flex={1} textAlign={"center"}>{player.Shots}</Box>
                </HStack>
                ))}
            </VStack>
        </Center>
    )
}

export default Scoreboard