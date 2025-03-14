import User from "../models/user.js";
import Role from "../models/role.js";

async function approveTrainer(req, res) {
    try {
        const { trainerId } = req.body;
        const trainer = await User.findById(trainerId);

        if (!trainer || !(await Role.findById(trainer.role_id)).role_type === "trainer") {
            return res.status(400).json({ message: "Trainer not found" });
        }

        trainer.isApproved = true;
        await trainer.save();

        res.status(200).json({ message: "Trainer approved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { approveTrainer };
