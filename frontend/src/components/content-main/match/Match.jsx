import { Box, HStack, Heading, Text, VStack, Stat, FormatNumber, Badge, Flex, IconButton } from "@chakra-ui/react"
import MatchCollapsible from "./collapsible/MatchCollapsible"
import { Clapperboard } from 'lucide-react';

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
    const mmrBefore = matchStats.LocalMMRBefore
    const mmrAfter = matchStats.LocalMMRAfter 
    const mmrDifference = mmrAfter - mmrBefore
    
    const [indicatorColor, indicator] = mmrDifference > 0
    ? ["green", <Stat.UpIndicator />]
    : mmrDifference < 0
    ? ["red", <Stat.DownIndicator />]
    : ["gray", null]
    
    
    const localPlayer = matchStats.MatchPlayerInfo.find(
        playerInfo => playerInfo.Name === "BrickBoned"
    )
    
    const localPlayerTeam = localPlayer.Team
    const opponentTeam = localPlayerTeam === 0 ? 1 : 0

    const opponentsInfo = matchStats.MatchPlayerInfo.filter(
        player => player.Team === opponentTeam 
    )
    const opponentNames = opponentsInfo.map(player => player.Name).join(", ");

    const isLocalPlayerWinner = hasLocalPlayerWon(matchStats, localPlayerTeam, opponentTeam)
    const resultColor = isLocalPlayerWinner ? "green" : "red"
    const resultSymbol = isLocalPlayerWinner ? "W" : "L"


    const time = () => {
        const fullTime = matchStats.StartTime
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
                <Stat.ValueText>
                    <FormatNumber value={mmrAfter}></FormatNumber>
                    <Badge colorPalette={indicatorColor} variant={"plain"} size={"md"} px={0} gap={0}>
                        {indicator} {mmrDifference !== 0 && Math.abs(mmrDifference)}
                    </Badge>
                </Stat.ValueText>
            <Stat.HelpText color={"text.quieter"}>Prev: {mmrBefore}</Stat.HelpText>
        </Stat.Root>
    )

    return (
        <Box border={"5px solid"} borderColor={"border.soft"} p={4} 
            w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}
            overflow={"hidden"} bg={"card.base"} borderRadius={"lg"} boxShadow={"0 0 10px rgba(0, 0, 0, 0.2)"}
            borderLeftColor={`${resultColor}.300`}>
            <VStack gap={8} w={"100%"}>
                <HStack w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                    <VStack position={"relative"}>
                        <HStack gap={4}>
                            <Heading size={"4xl"} color={`${resultColor}.300`}>{resultSymbol}</Heading>
                            <Text textStyle={"lg"}>{score}</Text>
                        </HStack>
                        {matchStats.bForfeit === 1 && forfeitBadge}
                    </VStack>
                    <Text color={"text.quieter"}>{time()}</Text>
                </HStack>
                <Flex w={"100%"} align={"center"} position={"relative"}>
                    <Heading mx={"auto"} color={"text.quieter"}>vs. {opponentNames}</Heading>
                    <Box position={"absolute"} right={0} size={"sm"}>{mmrStats}</Box>
                </Flex>
                <VStack w={"100%"}>
                    <HStack justifyContent={"flex-start"} alignSelf={"flex-start"} w={"100%"} position={"relative"}>
                        <MatchCollapsible matchStats={matchStats} />
                        <IconButton size={"sm"} variant={"outline"} borderColor={"border.soft"}
                            background={"container.soft"} _hover={{ bg: "text.quieter" }} position={"absolute"} left={11} top={0}
                            >
                            <Clapperboard />
                        </IconButton>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    )
}

export default Match