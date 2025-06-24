import { Box, HStack, Heading, Text, VStack, Stat, FormatNumber, Badge, Flex } from "@chakra-ui/react"
import MoreInfo from "./info/MoreInfo"

function hasLocalPlayerWon(stats, localTeam, opponentTeam){
    let winner = -1
    if (stats.Team0Score === stats.Team1Score) {
        winner = stats.LocalMMRAfter > stats.LocalMMRBefore ? localTeam : opponentTeam
    } else {
        winner = stats.Team0Score > stats.Team1Score ? 0 : 1
    }
    return winner === localTeam
}

function Match({ matchStats }){
    const opponent = matchStats.MatchPlayerInfo[1].Name
    const mmrBefore = matchStats.LocalMMRBefore
    const mmrAfter = matchStats.LocalMMRAfter 
    
    const mmrDifference = mmrAfter - mmrBefore
    
    const [indicatorColor, indicator] = mmrDifference > 0
    ? ["green", <Stat.UpIndicator />]
    : mmrDifference < 0
    ? ["red", <Stat.DownIndicator />]
    : ["gray", null]
    
    const localPlayerTeam = matchStats.MatchPlayerInfo[0].Team
    const opponentTeam = localPlayerTeam === 0 ? 1 : 0

    const isLocalPlayerWinner = hasLocalPlayerWon(matchStats, localPlayerTeam, opponentTeam)
    const resultColor = isLocalPlayerWinner ? "green" : "red"
    const resultSymbol = isLocalPlayerWinner ? "W" : "L"

    const playlists = {
        "10": "1v1",
        "11": "2v2"
    }
    const matchPlaylist = playlists[matchStats.Playlist]


    const time = () => {
        const fullTime = matchStats.StartDate.split(" ")[1]
        const hour = parseInt(fullTime.split("-")[0])
        const minute = fullTime.split("-")[1]
        const symbol = hour < 12 ? "AM" : "PM"

        const adjustHour = (hour === 0 ? 12 : (hour < 13 ? hour : hour - 12 ))

        return `${adjustHour}:${minute} ${symbol}`
    }

    const score = localPlayerTeam === 0 ? (
        `${matchStats.Team0Score} - ${matchStats.Team1Score}`
    ) : (
        `${matchStats.Team1Score} - ${matchStats.Team0Score}`
    )

    const forfeitBadge = (
        <Badge colorPalette={resultColor} variant={"subtle"} position={"absolute"}
        bottom={-6} alignSelf={"flex-start"}>by Forfeit</Badge>
    )

    const mmrStats = (
        <Stat.Root>
            <Stat.Label>MMR</Stat.Label>
            <Stat.ValueText>
                <FormatNumber value={mmrAfter}></FormatNumber>
                <Badge colorPalette={indicatorColor} variant={"plain"} size={"md"} px={0} gap={0}>
                    {indicator} {mmrDifference !== 0 && Math.abs(mmrDifference)}
                </Badge>
            </Stat.ValueText>
            <Stat.HelpText>Prev: {mmrBefore}</Stat.HelpText>
        </Stat.Root>
    )

    return (
        <Box border={"1px solid"} borderColor={"gray.700"} color={"white"} p={4} 
            w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}
            overflow={"hidden"}>
            <VStack gap={8} w={"100%"}>
                <HStack w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                    <VStack position={"relative"}>
                        <HStack gap={4}>
                            <Heading size={"4xl"} color={`${resultColor}.300`}>{resultSymbol}</Heading>
                            <Text size={"lg"}>{score}</Text>
                        </HStack>
                        {matchStats.bForfeit === 1 && forfeitBadge}
                    </VStack>
                    <Text color={"white"}>{time()}</Text>
                </HStack>
                <Flex w={"100%"} align={"center"} position={"relative"}>
                    <Heading mx={"auto"}>vs. {opponent}</Heading>
                    <Box position={"absolute"} right={0} size={"sm"}>{mmrStats}</Box>
                </Flex>
                <VStack w={"100%"}>
                    <HStack w={"100%"} justifyContent={"space-between"} alignItems={"center"} position={"relative"}>
                        <MoreInfo matchStats={matchStats} />
                        <Text color="gray.700" position={"absolute"} right={0} top={0}>{matchPlaylist}</Text>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    )
}

export default Match