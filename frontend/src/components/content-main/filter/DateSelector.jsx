import { Button, Popover, HStack } from "@chakra-ui/react";
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

    const todayStr = new Date().toISOString().split('T')[0]
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split("T")[0]

    

    return (
        <HStack p={4}>
            {recent_three_dates.map((date, index) => (
                    <Button size={"sm"} variant={"plain"} key={index} 
                    onClick={() => setSelectedDate(date)} fontSize={"lg"}
                    color={ selectedDate === date ? "gray.400" : "gray.700"}
                    _hover={{ color: selectedDate !== date ? "gray.500" : undefined }}>
                        {date === todayStr ? 
                            "Today" : 
                            (date === yesterdayStr ? 
                                "Yesterday" : 
                                formatDate(date)
                            )
                        }
                    </Button>
            ))}
            <Popover.Root>
                <Popover.Trigger size={"sm"} color={"blue.200"} variant={"plain"}
                    _hover={{ color: "blue.500", cursor: "pointer" }}>
                        View more
                </Popover.Trigger>
                <Popover.Positioner>
                    <Popover.Content css={{ "--popover-bg": "#18181b" }}>
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
    )
}

export default DateSelector