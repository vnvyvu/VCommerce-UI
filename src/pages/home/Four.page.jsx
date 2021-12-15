import { Box, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { FrameMotionBox, FrameMotionGrid, MotionBox, MotionInView } from '../../components/motion/Motion.component';

function Four() {
    return (
        <MotionInView
            style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                alignItems: 'space-between',

                background: 'rgba(0, 0, 0, 0.5)',
                backgroundImage: 'url(http://localhost:3000/img/four-bg1.jpg)',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundBlendMode: 'darken',
                backfaceVisibility: 'hidden',
                overflowX: 'hidden',
                overflowY: 'scroll',
                padding: '2rem'
            }}
        >
            <Top />
            <Middle />
        </MotionInView>
    );
}

function Top() {
    return (
        <FrameMotionGrid
            from={{
                opacity: 0,
                x: -150
            }}
            transitions={[{
                type: 'tween',
                duration: 1.5
            }]}
            to={{
                opacity: 1,
                x: 0
            }}
            sx={{
                width: '40vw',
                height: 'auto',
                minWidth: '400px',
                p: 2,
                flexBasis: '50%'
            }}
        >
            <MotionBox
                src="http://localhost:3000/logo-text.png"
                sx={{
                    filter: 'grayscale(1) invert(1)'
                }}
                alt='logo-text'
                component="img"
            />
            <Typography
                variant="body1"
                sx={{
                    textAlign: 'justify',
                    fontFamily: 'Asap Condensed',
                    mt: 3
                }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis reprehenderit nihil ad amet at, dicta quo modi odit esse rerum tempore maiores aspernatur eveniet sit! Facilis consectetur assumenda officiis dolores.
            </Typography>
            <FrameMotionBox
                from={{
                    width: 0
                }}
                transitions={[{
                    type: 'tween',
                    delay: 1.2,
                    duration: 1.5
                }]}
                to={{
                    width: '100%',
                    margin: '0 auto'
                }}
            >
                <Divider
                    sx={{
                        borderTop: '0.1px solid rgba(170, 170, 170, 0.8)',
                        my: 4
                    }}
                />
            </FrameMotionBox>
            <Info
                title="Address"
                subtitle="799 Stanton Hollow Road, Waltham, Massachusetts."
                icon={<i className="fad fa-map-marker-alt"></i>}
                animateIcon={{
                    y: [0, -8, 8, -8, 8, -8, 8, 0],
                }}
                whileHoverIcon={{
                    y: [0, -8, 8],
                    transition: {
                        duration: 0.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'reverse'
                    },
                }}
            />
            <Info
                title="Call us"
                subtitle="0869976288, 0866182099"
                icon={<i className="fad fa-phone-alt"></i>}
                animateIcon={{
                    rotate: [0, -8, 8, -8, 8, -8, 8, 0],
                }}
                whileHoverIcon={{
                    rotate: [0, -15, 15],
                    transition: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    },
                }}
            />
            <SocialButtons
                buttons={[
                    {
                        icon: <i className="fab fa-facebook-f"></i>,
                        ariaLabel: 'facebook'
                    },
                    {
                        icon: <i className="fab fa-github"></i>,
                        ariaLabel: 'github'
                    },
                    {
                        icon: <i className="fab fa-twitter"></i>,
                        ariaLabel: 'twitter'
                    },
                    {
                        icon: <i className="fab fa-youtube"></i>,
                        ariaLabel: 'youtube'
                    },
                    {
                        icon: <i className="fab fa-twitch"></i>,
                        ariaLabel: 'twitch'
                    },
                ]}
            />

        </FrameMotionGrid>
    );
}
function Middle() {
    return (
        <FrameMotionBox
            from={{
                opacity: 0,
                x: 150
            }}
            transitions={[{
                type: 'tween',
                duration: 1.5
            }]}
            to={{
                opacity: 1,
                x: 0
            }}
            sx={{
                width: '40vw',
                height: 'auto',
                minWidth: '400px',
                display: 'flex',
                flexFlow: 'row wrap',
                p: 2,
                flexBasis: '50%'
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontFamily: "Asap Condensed",
                    fontWeight: 'lighter'
                }}
            >
                Have questions?
            </Typography>
            <Grid
                container
                component="form"
                direction="column"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item xs>
                    <TextField
                        id="name"
                        required
                        label="Your name"
                        variant="standard"
                        sx={{
                            width: 1
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="email"
                        required
                        label="Your email"
                        variant="standard"
                        sx={{
                            width: 1
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="content"
                        required
                        label="Type your question..."
                        multiline
                        rows={8}
                        maxRows={12}
                        sx={{
                            width: 1
                        }}
                    />
                </Grid>
                <Grid item xs textAlign="end">
                    <TextField
                        id="submit"
                        type="submit"
                        sx={{
                            width: 0.3
                        }}
                    />
                </Grid>
            </Grid>
        </FrameMotionBox>
    );
}

function Info({ title, subtitle, icon, animateIcon, whileHoverIcon, ...params }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                my: 5,
                flexFlow: 'row wrap'
            }}
            {...params}
        >
            <FrameMotionBox
                initial={false}
                to={animateIcon}
                transitions={[{
                    duration: 3,
                    delay: 2,
                    ease: 'easeInOut',
                }]}
                whileHover={whileHoverIcon}
                sx={{
                    fontSize: '2rem',
                    m: '0 auto'
                }}
            >
                {icon}
            </FrameMotionBox>
            <Box
                sx={{
                    ml: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    width: 0.8
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        mb: 2
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        m: 0
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
}

function SocialButtons({ buttons }) {
    return (
        <FrameMotionBox
            sx={{
                width: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexFlow: 'row wrap'
            }}
        >
            {buttons.map(({ icon, ariaLabel }) =>
                <FrameMotionBox
                    key={ariaLabel}
                    whileHover={{
                        rotate: 360,
                        transition: {
                            duration: 0.5,
                            ease: 'easeInOut'
                        },
                    }}
                    sx={{
                        width: '3rem',
                        height: '3rem'
                    }}
                >
                    <IconButton
                        variant="outlined"
                        aria-label={ariaLabel}
                        sx={{
                            width: 1,
                            height: 1,
                            border: '1px solid white',
                            borderRadius: 1,
                            fontSize: '1rem'
                        }}
                    >{icon}</IconButton>
                </FrameMotionBox>
            )}
        </FrameMotionBox>
    );
}

export default Four;