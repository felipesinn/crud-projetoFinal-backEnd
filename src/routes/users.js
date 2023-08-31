
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { validateUserResistration } from "../middleware/validation";

const router = Router();
export const users = [];

// Rota para cadastrar o usúario
router.post("/signup", validateUserResistration, async (req, res) => {
    const { name, email, password } = req.body;


    const emailAlreadyRegistered = users.find((user) => user.email === email);
    if (emailAlreadyRegistered) {
        return res.status(400).json({
            message: "E-mail já cadastrado.",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
    };

    users.push(newUser);

    res.status(201).json({
        message: "Conta criada com sucesso.",
        user: newUser,
    });
});

// Rota para fazer o login do usúario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({
            message: "Credenciais inválidas.",
        });
    }

    if (!user) {
        return res.status(404).json({
            message: "Usuário não encontrado.",
        });
    }

    res.status(200).json({
        message: "Login bem-sucedido!",
        userId: user.id,
    });
});

export default router;
