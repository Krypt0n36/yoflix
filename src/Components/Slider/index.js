
import * as React from "react";
import { useState, useEffect } from 'react'
import Typography from "@mui/material/Typography";
import { ArrowBackIos, ArrowBackIosNew, ArrowForward, ArrowForwardIos, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function HSlider(props) {
    const scrollerRef = React.useRef(null)
    const [autoScroll, setAutoScroll] = useState(false)
    
    useEffect(() => {

       

        const scrollerInterval = setInterval(() => {
            if (autoScroll == false) {
                setAutoScroll(true)
                scrollerRef.current.scrollLeft += 205;

            }

        }, 5000)


        return () => {
            clearInterval(scrollerInterval);
        };
    }, [])
    return (
        <div>
            <div
                style={{
                    display: 'inline-flex',
                    width: '100%'
                }}
            >
                <Typography variant="h6" style={{ marginBottom: 10 }}>{props.title}</Typography>

                <div style={{
                    display: 'inline-flex',
                    margin: 'auto',
                    marginRight: 0
                }}>
                    <IconButton aria-label="delete" size="small" onClick={() => { scrollerRef.current.scrollLeft -= 205 }}>
                        <ArrowBackIosNew fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => { scrollerRef.current.scrollLeft += 205 }}>
                        <ArrowForwardIos fontSize="small" />
                    </IconButton>
                </div>

            </div>
            <div ref={scrollerRef} style={{ minHeight: 300, width: '100%', display: 'inline-flex', overflowX: 'hidden', scrollBehavior: 'smooth', position: 'relative' }} >
                <div style={{ display: 'inline-flex' }} >
                    {props.children}
                </div>
            </div>
        </div>

    );
}