import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/nav/Navbar";
import CurrentStats from "../components/content-left/CurrentStats";
import Log from "../components/content-main/Log";
import { db } from "../components/Firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import DayRankChart from "../components/content-right/charts/DayRankChart";
import ContentRight from "../components/content-right/ContentRight";

function Dashboard() {

    const centered = {
        display: "flex",
        justifyContent: "center"
    }

    const [dates, setDates] = useState([])
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedPlaylist, setSelectedPlaylist] = useState(10) // default = ranked 1v1
    const [allMatchesOnDate, setAllMatchesOnDate] = useState([])

    useEffect(() => {
        const fetchMatches = async () => {
            const matchesRef = collection(db, "matches")
            const q = query(
                matchesRef, 
                where("StartDate", "==", selectedDate),
                where("Playlist", "==", selectedPlaylist),
                orderBy("StartEpoch", "desc")
            )
            const snapshot = await getDocs(q)
            const matches = snapshot.docs.map(doc => doc.data())
            setAllMatchesOnDate(matches)
        }
        fetchMatches()
    }, [selectedDate, selectedPlaylist])
    
    useEffect(() => {
        const fetchAvaliableDates = async () => {
            const snapshot = await getDocs(collection(db, "match_dates"))
            const fetchedDates = snapshot.docs.map(doc => doc.id)
            const datesInOrder = fetchedDates.reverse()
            setDates(datesInOrder)
            fetchedDates.length > 0 && setSelectedDate(datesInOrder[0]) // set default
        }
        fetchAvaliableDates()
    }, [])
    
    return (
        <Box bgGradient="to-r" gradientFrom="background.base" gradientVia="container.base" gradientTo="background.base" minH={"100vh"}>
            <Navbar />
            <Grid templateColumns={"1fr 2fr 1fr"}>
                <GridItem {...centered} border={"1px solid red"}>
                    <CurrentStats dates={dates} />
                </GridItem>
                <GridItem>
                    <Log 
                        dates={dates} 
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        allMatchesOnDate={allMatchesOnDate} 
                        setSelectedPlaylist={setSelectedPlaylist}
                    />
                </GridItem>
                <GridItem {...centered} border={"1px solid red"}>
                    <ContentRight allMatchesOnDate={allMatchesOnDate}/>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Dashboard