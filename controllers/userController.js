import bcrypt from "bcrypt";
import User from '../models/user.js'; //

// Function to change the user's password
export const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Verify the old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect old password" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: "Password updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
