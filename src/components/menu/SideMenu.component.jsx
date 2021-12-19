import { Drawer as MuiDrawer, IconButton, ListItemButton, ListItemIcon, ListItemText, Tooltip as MuiTooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/system';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { MotionBox, MotionList, MotionListItem } from '../motion/Motion.component';

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
    return (
        <MotionList layout sx={{ height: 1, overflowY: 'scroll', display: 'flex', flexFlow: 'column' }}>
            {items.map(({ icon, text, sx, key, to }) =>
                <Tooltip title={text} placement="right" arrow key={key}>
                    <MotionListItem layout disablePadding sx={{ width: 1, ...sx }}>
                        <ListItemButton disableGutters={!open} component={Link} sx={open ? {} : { justifyContent: 'center' }} to={to}>
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
                    </MotionListItem>
                </Tooltip>
            )
            }
        </MotionList >
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

export const SideMenu = memo(({ items, open, onControlDrawer }) => {
    const handleController = () => {
        onControlDrawer(!open);
    }
    return (
        <Drawer
            open={open}
            variant='permanent'
        >
            <SideMenuTop
                src={process.env.PUBLIC_URL + (open ? "/logo.png" : "/favicon.png")}
                open={open}
            />
            <AnimateSharedLayout>
                <SideMenuItems
                    items={items}
                    open={open}
                />
            </AnimateSharedLayout>

            <SideMenuController
                onClick={handleController}
                open={open}
            />
        </Drawer>
    );
});
