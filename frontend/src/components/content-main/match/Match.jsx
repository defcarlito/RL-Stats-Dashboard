import { Box, HStack, Heading, Text, VStack, Stat, FormatNumber, Badge } from "@chakra-ui/react"
import MoreInfo from "./info/MoreInfo"

function Match(){
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
                            <FormatNumber value={1023}></FormatNumber>
                        </Stat.ValueText>
                        <Badge colorPalette={"green"} variant={"plain"} px={0} gap={0}>
                            <Stat.UpIndicator/>9
                        </Badge>
                    </Stat.Root>
                </HStack>
                <VStack w={"100%"}>
                    <Text>vs. PlaceHolder</Text>
                    <HStack w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                        <MoreInfo />
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    )
}

export default Match