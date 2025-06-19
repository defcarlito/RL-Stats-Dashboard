import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import MoreInfo from "./info/MoreInfo"

function Match(){
    return (
        <Box border={"1px solid"} borderColor={"gray.700"} color={"white"} p={4} 
            w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}
            overflow={"hidden"}>
            <VStack gap={0} w={"100%"}>
                <HStack gap={4} alignSelf={"flex-start"}>
                    <Heading size={"lg"} color={"green.300"}>W</Heading>
                    <Text size={"lg"}>8 - 4</Text>
                </HStack>
                <HStack alignSelf={"flex-end"}>
                    <Text>+9 MMR</Text>
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