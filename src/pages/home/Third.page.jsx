import { Card, CardContent, Rating, Typography } from '@mui/material';
import { useRef } from 'react';
import { FrameMotionBox, FrameMotionGrid, MotionBox, MotionInView } from '../../components/motion/Motion.component';
function Third() {
    return (
        <MotionInView
            style={{
                height: '100vh',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                alignItems: 'flex-start',

                background: 'rgba(0, 0, 0, 0.1)',
                backgroundImage: 'url(http://localhost:3000/img/third-bg1.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                animationTimingFunction: 'ease-in-out',
                backgroundBlendMode: 'darken',
                backfaceVisibility: 'hidden',
                overflowY: 'scroll',
                overflowX: 'hidden'
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
                opacity: 0
            }}
            transitions={[{
                duration: 1.5,
                type: 'tween'
            }]}
            to={{
                opacity: 1
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
                    my: 2,
                    fontWeight: 'lighter',
                    color: '#F9975D'
                }}
            >
                Customer's
            </Typography>
            <Typography
                variant='h4'
                sx={{
                    fontFamily: 'Anton',
                    textAlign: 'center',
                    color: '#142F43'
                }}
            >
                Reviews & Feedbacks
            </Typography>
        </FrameMotionBox>
    );
}

function Middle() {
    const data = useRef([
        {
            author: "Albert Patrick",
            avatar: "https://i.pravatar.cc/100?u=" + Math.random().toString(36).substr(2, 10),
            rate: 5,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem non ad quae maiores eos maxime ea molestias reprehenderit consequatur facilis sint, quasi quisquam quia numquam obcaecati qui consectetur aliquam.",
            variants: {
                from: {
                    x: -200,
                    opacity: 0
                },
                transitions: [{
                    delay: 0.5,
                    duration: 1,
                    type: 'tween'
                }],
                to: {
                    x: 0,
                    opacity: 1
                }
            }
        },
        {
            author: "Barbara Griffith",
            avatar: "https://i.pravatar.cc/100?u=" + Math.random().toString(36).substr(2, 10),
            rate: 5,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione veniam placeat beatae a facere molestias voluptatibus, obcaecati perspiciatis tempora et veritatis, dignissimos consequuntur, sequi expedita! Saepe obcaecati quas ea nesciunt.",
            variants: {
                from: {
                    opacity: 0
                },
                transitions: [{
                    delay: 0.25,
                    duration: 1,
                    type: 'tween'
                }],
                to: {
                    opacity: 1
                }
            },
        },
        {
            author: "Jackson Washington",
            avatar: "https://i.pravatar.cc/100?u=" + Math.random().toString(36).substr(2, 10),
            rate: 5,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ea facere rerum sed nobis commodi quo, aut, ducimus aspernatur vitae nemo tempora amet blanditiis suscipit! Distinctio illo doloribus fugiat alias.",
            variants: {
                from: {
                    x: 200,
                    opacity: 0
                },
                transitions: [{
                    delay: 0.5,
                    duration: 1,
                    type: 'tween'
                }],
                to: {
                    x: 0,
                    opacity: 1
                }
            }
        }
    ]);
    return (
        <FrameMotionGrid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{
                my: 1
            }}
        >
            {data.current.map(u =>
                <Review
                    key={u.author}
                    {...u}
                />
            )}
        </FrameMotionGrid>
    );
}

function Review({ author, avatar, content, rate, variants }) {
    return (
        <FrameMotionGrid
            item
            xs
            sx={{
                mt: 8,
            }}
            {...variants}
        >
            <Card
                sx={{
                    p: 1.2,
                    borderRadius: 1.5,
                    overflow: 'visible',
                    mx: 2,
                    minWidth: '15rem',
                    borderBottom: '1px solid gray',
                    transition: 'all 1s ease-in-out',
                    '&:hover': {
                        borderBottom: '1px solid blue'
                    }
                }}
            >
                <CardContent sx={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'center'
                }}>
                    <MotionBox
                        component="img"
                        src={avatar}
                        sx={{
                            mt: -10,
                            borderRadius: 100,
                            border: '2px solid #dbdbdb',
                            p: 0.5,
                            background: 'white'
                        }}
                    />
                    <Typography
                        variant='h5'
                        sx={{
                            textAlign: 'center',
                            width: 1
                        }}
                    >
                        {author}
                    </Typography>
                    <Rating name="rate" value={rate} precision={0.5} readOnly />
                    <Typography
                        variant='body2'
                        sx={{
                            fontStyle: 'italic',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <i className="fad fa-quote-left" style={{ fontSize: '2rem', height: '1rem', opacity: 0.2 }}></i>
                        <Typography component="span" sx={{ textIndent: '0.6rem', margin: 0, textAlign: 'center', textOverflow: 'ellipsis' }}>
                            {content}
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>
        </FrameMotionGrid>
    );
}

export default Third;