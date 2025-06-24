import { Menu, Button, Portal } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi";

function FilterPlaylistMenu({ setSelectedPlaylist }){
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant={"plain"} size={"sm"} fontSize={"sm"} color={"white"}>
                    <GiHamburgerMenu />Filter by Playlist
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item onClick={() => setSelectedPlaylist(10)}>1v1</Menu.Item>
                        <Menu.Item onClick={() => setSelectedPlaylist(11)}>2v2</Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

export default FilterPlaylistMenu