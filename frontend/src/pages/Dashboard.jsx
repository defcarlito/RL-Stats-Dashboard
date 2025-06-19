import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/nav/Navbar";
import CurrentStats from "../components/content-left/CurrentStats";
import Logs from "../components/content-main/Logs";

function Dashboard() {
    const centered = {
        display: "flex",
        justifyContent: "center"
    }
    
    return (
        <Box bg={"gray.900"} color={"white"} minH={"100vh"}>
            <Navbar />
            <Grid templateColumns={"1fr 2fr 1fr"} py={4}>
                <GridItem {...centered} border={"1px solid red"}>
                    <CurrentStats />
                </GridItem>
                <GridItem border={"1px solid red"}>
                    <Logs />
                </GridItem>
                <GridItem {...centered} border={"1px solid red"}>

                </GridItem>
            </Grid>
        </Box>
    )
}

export default Dashboard