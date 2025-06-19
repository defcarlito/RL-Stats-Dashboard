import { Box, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function Navbar(){
    return (
        <>
            <Flex align={"center"} justify={"space-between"} borderBottom={"1px solid"} borderColor={"gray.700"} p={4}>
                <Link><Box fontWeight={"bold"}>My Rocket League Stats</Box></Link>
                <Flex gap={4}>
                    <Link>About</Link>
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar