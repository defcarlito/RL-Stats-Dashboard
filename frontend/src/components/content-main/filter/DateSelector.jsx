import { Button, Popover, HStack, VStack, Box, Separator, Heading, Flex } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../../styles/datepicker.css";
import { useEffect, useState } from "react";

function DateSelector({ dates, selectedDate, setSelectedDate, formatDate }) {

    const recent_three_dates = dates.slice(0, 3)

    const [selected, setSelected] = useState()
    useEffect(() => {
        if (!selected) return
        const formatted = selected.toISOString().split("T")[0]
        setSelectedDate(formatted)
    }, [selected])

    const availableDates = dates.map((d) => {
        const [y, m, day] = d.split("-")
        return new Date(y, m - 1, day)
    })

    const isSameDay = (a, b) => (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
    )


    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toLocaleDateString('en-CA')

    const yesterday = new Date()
    yesterday.setHours(0, 0, 0, 0)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toLocaleDateString('en-CA')

    

    return (
        <VStack bg={"container.base"} borderRadius={"lg"} boxShadow={"0 0 10px rgba(0, 0, 0, 0.2)"}
        alignContent={"center"} justifyContent={"center"} my={4} mx={2}>
            <HStack w={"full"} bg={"container.soft"} borderTopRadius={"lg"} textAlign={"flex-start"}
            direction={"row"} gap={4} px={4} py={2}>
                <Heading size={"lg"} color={"text.quiet"}>Log Date</Heading>
            </HStack>
            <HStack gap={2} p={4} alignContent={"center"} justifyContent={"center"}>     
                {recent_three_dates.map((date, index) => (
                        <Button size={"sm"} variant={"solid"} key={index}
                        onClick={() => setSelectedDate(date)} fontSize={"lg"}
                        color={ selectedDate === date ? "border.soft" : "text.quiet" }
                        bg={ selectedDate === date ? "text.quiet" : "border.soft" }
                        _hover={{ bg: selectedDate !== date ? "text.quieter" : undefined }}>
                            {date === todayStr ? 
                                "Today" : 
                                (date === yesterdayStr ? 
                                    "Yesterday" : 
                                    formatDate(date)
                                )
                            }
                        </Button>
                ))} 
                    <Separator orientation={"vertical"} height={8} borderColor={"card.base"} size={"lg"} borderRadius={"lg"} mx={2}/>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Button size={"sm"} fontSize={"lg"} variant={"plain"} color={"text.quieter"}
                            _hover={{ color: "text.quiet" }} p={0}>
                                More
                            </Button>
                        </Popover.Trigger>
                        <Popover.Positioner>
                            <Popover.Content css={{ "--popover-bg": "#1B2531" }}>
                            <Popover.CloseTrigger />
                            <Popover.Arrow>
                                <Popover.ArrowTip />
                            </Popover.Arrow> 
                            <Popover.Body>
                                <DayPicker
                                    animate
                                    mode="single"
                                    navLayout="around"
                                    selected={selected}
                                    onSelect={setSelected}
                                    modifiers={{ available: availableDates }}
                                    modifiersStyles={{
                                        available: {

                                        },
                                    }}
                                    disabled={(day) => !availableDates.some(d => isSameDay(d, day))}
                                />
                            </Popover.Body>
                            </Popover.Content>
                        </Popover.Positioner>
                    </Popover.Root>
            </HStack>
        </VStack>
    )
}

export default DateSelector