import { Flex, Heading, HStack, VStack, Menu, Button, Portal, Box } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi";
import Match from "./match/Match"
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, QuerySnapshot } from "firebase/firestore";
import { db } from "../Firebase";

function Log() {

    const [allMatches, setAllMatches] = useState([])
    useEffect(() => {
        const q = query(collection(db, "matches"))
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const matchesArr = [];
            QuerySnapshot.forEach((doc) => {
                matchesArr.push({id: doc.id, ...doc.data() })
            })
            setAllMatches(matchesArr)
        })
        return () => unsubscribe()
    }, [])

    const filterMenu = (
        <Menu.Root positioning={{ placement: "right-start" }}>
            <Menu.Trigger asChild>
                <Button variant={"outline"} size={"sm"} fontSize={"sm"}>
                    <GiHamburgerMenu />Filter by Playlist
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item>1v1</Menu.Item>
                        <Menu.Item>2v2</Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )

    return (
        <VStack w={"100%"} px={8} gap={2} py={4}>
            <Heading size={"md"}>Match Logs</Heading>
            <HStack alignSelf={"start"}>
                {filterMenu}
            </HStack>
            <Flex direction={"column"} w={"100%"} gap={4}>
                {allMatches.map((matchStats) => (
                    <Match matchStats={matchStats}/>
                ))}
            </Flex>
        </VStack>
    )
}

export default Log