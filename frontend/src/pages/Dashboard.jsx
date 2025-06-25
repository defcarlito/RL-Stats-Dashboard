import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/nav/Navbar";
import CurrentStats from "../components/content-left/CurrentStats";
import Log from "../components/content-main/Log";

function Dashboard() {
    const centered = {
        display: "flex",
        justifyContent: "center"
    }
    
    return (
        <Box bg={"gray.900"} color={"white"} minH={"100vh"}>
            <Navbar />
            <Grid templateColumns={"1fr 2fr 1fr"}>
                <GridItem {...centered}>
                    <CurrentStats />
                </GridItem>
                <GridItem borderX={"1px solid"} borderColor={"gray.700"}>
                    <Log />
                </GridItem>
                <GridItem {...centered}>

                </GridItem>
            </Grid>
        </Box>
    )
}

export default Dashboard