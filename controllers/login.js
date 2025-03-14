import loginService from "../services/login.js";

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { token, role } = await loginService(email, password);
        
        res.status(200).json({ token, role, message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { login };
