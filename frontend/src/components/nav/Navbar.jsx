import { Box, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function Navbar(){
    return (
        <>
            <Flex align={"center"} justify={"space-between"} bg={"container.base"} p={4}>
                <Link><Box fontWeight={"bold"} fontSize={"2xl"}>My Rocket League Stats</Box></Link>
                <Flex gap={4}>
                    <Link>About</Link>
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar