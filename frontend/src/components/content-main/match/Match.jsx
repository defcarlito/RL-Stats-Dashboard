import { Box, HStack, Heading, Text, VStack, Stat, FormatNumber, Badge } from "@chakra-ui/react"
import MoreInfo from "./info/MoreInfo"

function hasLocalPlayerWon(stats){
    const localPlayerTeam = matchStats.MatchPlayerInfo[0].Team
    // add functionality to get winner
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


    return (
        <Box border={"1px solid"} borderColor={"gray.700"} color={"white"} p={4} 
            w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}
            overflow={"hidden"}>
            <VStack gap={0} w={"100%"}>
                <HStack gap={4} alignSelf={"flex-start"}>
                    <Heading size={"3xl"} color={"green.300"}>W</Heading>
                    <Text size={"lg"}>8 - 4</Text>
                </HStack>
                <HStack alignSelf={"flex-end"}>
                    <Stat.Root>
                        <Stat.Label>MMR</Stat.Label>
                        <Stat.ValueText>
                            <FormatNumber value={mmrAfter}></FormatNumber>
                        </Stat.ValueText>
                        <Badge colorPalette={indicatorColor} variant={"plain"} size={"2xl"} px={0} gap={0}>
                            {indicator} {mmrDifference !== 0 ? Math.abs(mmrDifference) : "-"}
                        </Badge>
                        <Stat.HelpText>Prev: {mmrBefore}</Stat.HelpText>
                    </Stat.Root>
                </HStack>
                <VStack w={"100%"}>
                    <Text>vs. {opponent}</Text>
                    <HStack w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                        <MoreInfo />
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    )
}

export default Match