import { Box, Flex, Heading, HStack, Image, Presence, Text, VStack } from "@chakra-ui/react"
import { Tooltip } from "../ui/tooltip"
import { useEffect, useState, useMemo } from "react"
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

function CurrentStats({ dates }) {

    const [onesRankLogo, setOnesRankLogo] = useState("Unranked")
    const [twosRankLogo, setTwosRankLogo] = useState("Unranked")

    const rankRanges1s = [
        {"rank": "SSL", "min": 1352, "max": 10000},
        {"rank": "Grand-Champion-3", "min": 1285, "max": 1351},
        {"rank": "Grand-Champion-2", "min": 1227, "max": 1284},
        {"rank": "Grand-Champion-1", "min": 1164, "max": 1226},
        {"rank": "Champion-3", "min": 1115, "max": 1163},
        {"rank": "Champion-2", "min": 1055, "max": 1114},
        {"rank": "Champion-1", "min": 995, "max": 1054},
        {"rank": "Diamond-3", "min": 935, "max": 994},
        {"rank": "Diamond-2", "min": 860, "max": 934},
        {"rank": "Diamond-1", "min": 815, "max": 859},
        {"rank": "Platinum-3", "min": 740, "max": 814},
        {"rank": "Platinum-2", "min": 680, "max": 739},
        {"rank": "Platinum-1", "min": 620, "max": 679},
        {"rank": "Gold-3", "min": 575, "max": 619},
        {"rank": "Gold-2", "min": 515, "max": 574},
        {"rank": "Gold-1", "min": 455, "max": 514},
        {"rank": "Silver-3", "min": 395, "max": 454},
        {"rank": "Silver-2", "min": 335, "max": 394},
        {"rank": "Silver-1", "min": 275, "max": 334},
        {"rank": "Bronze-3", "min": 216, "max": 274},
        {"rank": "Bronze-2", "min": 157, "max": 215},
        {"rank": "Bronze-1", "min": 0, "max": 156},
    ]

    const rankRanges2s = [
        {"rank": "SSL", "min": 1866, "max": 10000},
        {"rank": "Grand-Champion-3", "min": 1714, "max": 1865},
        {"rank": "Grand-Champion-2", "min": 1575, "max": 1713},
        {"rank": "Grand-Champion-1", "min": 1435, "max": 1574},
        {"rank": "Champion-3", "min": 1315, "max": 1434},
        {"rank": "Champion-2", "min": 1195, "max": 1314},
        {"rank": "Champion-1", "min": 1075, "max": 1194},
        {"rank": "Diamond-3", "min": 995, "max": 1074},
        {"rank": "Diamond-2", "min": 915, "max": 994},
        {"rank": "Diamond-1", "min": 835, "max": 914},
        {"rank": "Platinum-3", "min": 775, "max": 834},
        {"rank": "Platinum-2", "min": 715, "max": 774},
        {"rank": "Platinum-1", "min": 655, "max": 714},
        {"rank": "Gold-3", "min": 595, "max": 654},
        {"rank": "Gold-2", "min": 535, "max": 594},
        {"rank": "Gold-1", "min": 475, "max": 534},
        {"rank": "Silver-3", "min": 415, "max": 474},
        {"rank": "Silver-2", "min": 355, "max": 414},
        {"rank": "Silver-1", "min": 289, "max": 354},
        {"rank": "Bronze-3", "min": 229, "max": 288},
        {"rank": "Bronze-2", "min": 174, "max": 228},
        {"rank": "Bronze-1", "min": -100, "max": 173}
    ]
    
    const [lastPlayedMatches, setlastPlayedMatches] = useState([])
    
    const lastPlayedText = useMemo(() => {
        if (!dates || dates.length === 0) return ""
        
        const [year, month, day] = dates[0].split("-").map(Number)
        const most_recent_date = new Date(year, month - 1, day)
        const today = new Date()
        
        const differenceInMs = today - most_recent_date
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24))
        
        if (differenceInDays === 0) return "today"
        if (differenceInDays === 1) return "yesterday"
        return `${differenceInDays} days ago`
    }, [dates])
    
    function getRankPNGFromMMR(mmr, range) {
        for (const rank of range) {
            if (mmr >= rank.min && mmr <= rank.max) {
                console.log(rank.rank)
                return rank.rank
            }
        }
        return null
    }
    
    useEffect(() => {
        const fetchLastMatches = async () => {
            const snapshot = await getDocs(collection(db, "latest_stats_by_playlist"))
            const fetchMatches = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
            setlastPlayedMatches(fetchMatches)
        }
        fetchLastMatches()
    }, [])
    
    useEffect(() => {
        if (!lastPlayedMatches || lastPlayedMatches.length === 0) return

        const onesMMR = lastPlayedMatches[0]["data"]["CurrentMMR"] 
        const twosMMR = lastPlayedMatches[1]["data"]["CurrentMMR"]

        setOnesRankLogo(getRankPNGFromMMR(onesMMR, rankRanges1s))
        setTwosRankLogo(getRankPNGFromMMR(twosMMR, rankRanges2s))
    }, [lastPlayedMatches])
    
    
    if (!dates || dates.length === 0) return null

    return (
        <Presence present={true} animationName={{ _open: "fade-in"}}
        animationDuration=".5s">
            <VStack position={"sticky"} top={"30%"} alignSelf={"start"} gap={10}>
                <Box>
                    <HStack>
                        <Image bg="transparent" height="50px" src="epic-games-logo.svg" />
                        <Heading size={"4xl"}>BrickBoned</Heading>
                    </HStack>
                    <Text color={"text.base/25"}>Last played {lastPlayedText}</Text>
                </Box>
                <VStack p={4} border={"1px solid"} borderColor={"gray.700"}>
                    <Text fontSize={"xl"} color={"gray.700"}>Current rankings</Text>
                    <HStack>
                        <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Tooltip showArrow content={onesRankLogo.replace("-", " ")}
                            openDelay={200} closeDelay={100}>
                                <Image src={`ranked-icons/${onesRankLogo}.png`} alt="1s rank" height={"150px"} />
                            </Tooltip>
                            <Text color={"gray.700"}>Duel 1v1</Text>
                        </Flex>
                        <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Tooltip showArrow content={twosRankLogo.replace("-", " ")}
                            openDelay={200} closeDelay={100}>
                                <Image src={`ranked-icons/${twosRankLogo}.png`} alt="2s rank" height={"150px"} />
                            </Tooltip>
                            <Text color={"gray.700"}>Doubles 2v2</Text>
                        </Flex>
                    </HStack>
                </VStack>
            </VStack>
        </Presence>
    )
}

export default CurrentStats