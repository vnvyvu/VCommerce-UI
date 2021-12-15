import { Drawer as MuiDrawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip as MuiTooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/system';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MotionBox } from '../motion/Motion.component';

const Tooltip = styled(({ className, ...props }) =>
    <MuiTooltip {...props} classes={{ popper: className }} />,
    { shouldForwardProp: () => true })(
        () => ({
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            [`& .${tooltipClasses.arrow}`]: {
                color: 'rgba(0, 0, 0, 0.5)'
            }
        })
    )

function SideMenuTop({ src, open, ...params }) {
    return (
        <AnimatePresence
            style={{
                width: '100%'
            }}
            {...params}
        >
            <MotionBox
                key={open}
                transition={{ duration: 0 }}
                initial={{ display: 'none', opacity: 0, }}
                animate={{ display: 'block', opacity: 1, transition: { duration: 1 } }}
                exit={{ display: 'none' }}
                component="img"
                src={src} alt="logo"
            />
        </AnimatePresence >
    );
}

function SideMenuItems({ open, items }) {
    const navigate = useNavigate();
    return (
        <List sx={{ height: 1, overflowY: 'scroll', display: 'flex', flexFlow: 'column' }}>
            {(items(navigate) || []).map(({ icon, text, sx, key, ...itemParams }) =>
                <Tooltip title={text} placement="right" arrow key={key}>
                    <ListItem disablePadding sx={{ width: 1, ...sx }} {...itemParams}>
                        <ListItemButton disableGutters={!open} sx={open ? {} : { justifyContent: 'center' }}>
                            <ListItemIcon
                                sx={{
                                    justifyContent: 'center',
                                    fontSize: '1.1rem'
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            {open && <ListItemText
                                disableTypography
                            >
                                {text}
                            </ListItemText>}
                        </ListItemButton>
                    </ListItem>
                </Tooltip>
            )
            }
        </List >
    );
}

function SideMenuController({ open, onClick, ...params }) {
    return (
        <IconButton
            onClick={onClick}
            sx={{ mt: 'auto', borderRadius: 0, fontSize: '1rem' }}
            arial-label="control button"
            {...params}
        >
            <i className={"fad fa-angle-double-right" + (open ? " fa-rotate-180" : "")}></i>
        </IconButton>
    );
}

const openState = (theme) => ({
    width: theme.spacing(24),
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})
const closeState = (theme) => ({
    width: theme.spacing(8),
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
})


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => (open ?
        {
            ...openState(theme),
            '& .MuiDrawer-paper': openState(theme)
        } :
        {
            ...closeState(theme),
            '& .MuiDrawer-paper': closeState(theme)
        }
    )
)

export function SideMenu({ items, onControlDrawer }) {
    const [open, setOpen] = useState(false);
    const handleController = useCallback(() => {
        onControlDrawer(!open);
        setOpen(!open);
    }, [open, onControlDrawer])
    return (
        <Drawer
            open={open}
            variant='permanent'
        >
            <SideMenuTop
                src={process.env.PUBLIC_URL + (open ? "/logo.png" : "/favicon.png")}
                open={open}
            />

            <SideMenuItems
                items={items}
                open={open}
            />

            <SideMenuController
                onClick={handleController}
                open={open}
            />
        </Drawer>
    );
}


