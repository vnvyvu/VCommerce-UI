import { Button, Divider, Typography } from '@mui/material';
import { FrameMotionBox, MotionInView } from '../../components/motion/Motion.component';
import './First.style.scss';
function First() {
    return (
        <MotionInView
            style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                animation: 'slideBg 40s linear infinite 0s',
                animationTimingFunction: 'ease-in-out',
                backgroundBlendMode: 'darken',
                backfaceVisibility: 'hidden',
                overflow: 'scroll',

                height: '100vh',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}
        >
            <Top />
            <Middle />
            <End />
        </MotionInView>
    );
}

function Top() {
    return (
        <FrameMotionBox
            from={{
                opacity: 0,
                y: -100
            }}
            transitions={[{
                type: 'tween', duration: 2,
            }]}
            to={{
                opacity: 1,
                y: 0
            }}
            sx={{
                flexBasis: '100%'
            }}
        >
            <Typography
                variant='h5'
                sx={{
                    fontFamily: 'Pacifico',
                    textAlign: 'center',
                    mt: 2
                }}
            >
                Welcome
            </Typography>
            <Typography
                variant='h2'
                sx={{
                    fontFamily: 'Anton',
                    textAlign: 'center',
                    mt: 2,
                    fontSize: 75,
                }}
            >
                VCOMMERCE
            </Typography>
            <Typography
                variant='h6'
                sx={{
                    textAlign: 'center',
                    fontWeight: 'lighter',
                    mt: 3,
                }}
            >
                Help your product reach consumers or buy something at a competitive price
            </Typography>
        </FrameMotionBox>
    );
}
function Middle() {
    return (
        <FrameMotionBox
            from={{
                width: 0
            }}
            transitions={[{
                duration: 2,
            }]}
            to={{
                width: '100%',
                padding: '0 10%',
            }}
        >
            <Divider
                light
                sx={{
                    '&:before, &:after': {
                        borderTopColor: 'rgba(255, 255, 255, 0.6)'
                    },
                    mt: 2
                }}
            >
                <FrameMotionBox
                    from={{
                        opacity: 0,
                    }}
                    transitions={[{
                        duration: 1,
                        type: 'tween'
                    }, {
                        delay: 1.5,
                        duration: 1,
                        type: 'tween'
                    }]}
                    to={{
                        opacity: 1,
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            width: '20vw',
                            height: 50,
                            minWidth: 100,
                            borderRadius: 16,
                            color: 'lightsteelblue'
                        }}
                    >
                        Shop now
                    </Button>
                </FrameMotionBox>
            </Divider>
        </FrameMotionBox >
    );
}
function End() {

    return (
        <FrameMotionBox
            sx={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                width: 1
            }}
        >
            <FeatureCard
                from={{
                    x: -100,
                    opacity: 0,
                }}
                transitions={[{
                    type: 'tween', duration: 1.5
                }]}
                to={{
                    x: 0,
                    opacity: 1,
                }}
                cover={<i className="fal fa-money-bill"></i>}
                title="Competitive price"
                subtitle="We always have many monthly promotions, free shipping, deep discounts."
            />
            <FeatureCard
                from={{
                    y: 100,
                    opacity: 0,
                }}
                transitions={[{
                    type: 'tween', duration: 1.5
                }]}
                to={{
                    y: 0,
                    opacity: 1,
                }}
                cover={<i className="fal fa-shield-alt"></i>}
                title="Safe process"
                subtitle="Easy policy for sellers, ensuring safety for buyers."
            />
            <FeatureCard
                from={{
                    x: 100,
                    opacity: 0,
                }}
                transitions={[{
                    type: 'tween', duration: 1.5
                }]}
                to={{
                    x: 0,
                    opacity: 1,
                }}
                cover={<i className="fal fa-user-headset"></i>}
                title="30+ staffs"
                subtitle="Our team is always ready to support you 24/7."
            />
        </FrameMotionBox>
    );
}
function FeatureCard({ cover, title, subtitle, ...params }) {
    return (
        <FrameMotionBox
            sx={{
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                alignContent: 'center',
                width: '280px',
                mx: 1
            }}
            {...params}
        >
            <Typography
                variant='body1'
                sx={{
                    fontSize: 75
                }}
            >
                {cover}
            </Typography>
            <Typography
                variant='h5'
                sx={{
                    textAlign: 'center'
                }}
            >
                {title}
            </Typography>
            <Typography
                variant='body1'
                sx={{
                    textAlign: 'center',
                    fontWeight: 'lighter'
                }}
            >
                {subtitle}
            </Typography>
        </FrameMotionBox>
    );
}

export default First;
