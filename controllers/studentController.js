import Student from '../models/student.js';

export const postStudent = async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const data = await Student.create ({ name, age, email });
        res.Status(201).json(data);
    } catch (error) {
        res.Status(500).json({ message: error.message });    
    }
}