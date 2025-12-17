import { Box, Paper, Typography } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { InternetSpeed } from "../../types/wsRX"

function AnimatedSpeedText({ value }: { value: string }) {
    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={value}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
            >
                {value}
            </motion.span>
        </AnimatePresence>
    )
}


export default function SpeedIndicator({speed}:{speed:InternetSpeed}) {

    return (
        <>
            <Box display="flex" gap={2} mt={2}>
                <Paper sx={{ p: 2, flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Download
                    </Typography>
                    <Typography variant="h5">
                        <AnimatedSpeedText value={speed.bytesIn} />
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2, flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Upload
                    </Typography>
                    <Typography variant="h5">
                        <AnimatedSpeedText value={speed.bytesOut} />
                    </Typography>
                </Paper>
            </Box>

        </>
    )
}