import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRef } from 'react';
import SwiperCore, { Autoplay, Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FrameMotionBox, MotionInView } from "../../components/motion/Motion.component";
function Second() {
    return (

        <MotionInView
            style={{
                height: '50vh',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overFlow: 'scroll',
                backgroundColor: 'mintcream'
            }}
        >
            <Top />
            <Middle />
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
                duration: 1,
                type: 'tween'
            }]}
            to={{
                opacity: 1,
                y: 0
            }}
            sx={{
                flexBasis: '100%',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                variant='h5'
                sx={{
                    fontFamily: 'Pacifico',
                    textAlign: 'center',
                    my: 2,
                    fontWeight: 'lighter',
                    color: '#F9975D',

                }}
            >
                Famous brand
            </Typography>
            <Typography
                variant='h6'
                sx={{
                    fontFamily: 'M PLUS Rounded 1c',
                    textAlign: 'center',
                    my: 1,
                    fontWeight: 'lighter',
                    maxWidth: 425
                }}
            >
                Many big brands have trusted and are cooperating with us
            </Typography>
        </FrameMotionBox>
    );
}

SwiperCore.use([Autoplay, Mousewheel, Navigation]);

function Middle() {
    const data = useRef([
        "http://localhost:3000/brand-logos/captain.png",
        "http://localhost:3000/brand-logos/travel.png",
        "http://localhost:3000/brand-logos/ins.png",
        "http://localhost:3000/brand-logos/mail.png",
        "http://localhost:3000/brand-logos/onep.png",
        "http://localhost:3000/brand-logos/shopee.png",
        "http://localhost:3000/brand-logos/spotify.png",
        "http://localhost:3000/brand-logos/twitter.png"
    ])
    return (
        <FrameMotionBox
            from={{
                opacity: 0,
                y: 100
            }}
            to={{
                opacity: 1,
                y: 0
            }}
            transitions={[{
                duration: 1,
                type: 'tween'
            }]}
            style={{
                width: '50%'
            }}
        >
            <Swiper
                slidesPerView={4}
                loop
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                mousewheel
                style={{
                    height: '100%',
                    width: '100%'
                }}
            >
                {data.current.map((src, i) =>
                    <SwiperSlide key={`slide-${i}`} style={{ display: 'flex', justifyContent: 'center' }}>
                        <LogoBrand src={src} />
                    </SwiperSlide>
                )}
            </Swiper>
        </FrameMotionBox>
    );
}

function LogoBrand({ src }) {
    return (
        <Box
            component='img'
            src={src}
            sx={{
                filter: 'grayscale(100%)',
                width: '6rem',
                height: '6rem'
            }}
        />
    );
}

export default Second;