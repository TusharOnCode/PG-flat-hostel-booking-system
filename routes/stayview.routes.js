
import express from 'express';
import Room from '../models/room.model.js'; 

const router = express.Router();

router.get('/stay', async (req, res) => {
    try {
        const rooms = await Room.find(); 
        res.render('stayview', { rooms });
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).send('Server error');
    }
});

export default router;
