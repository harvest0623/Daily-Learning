import { Router } from 'express'
import { postLoginRedirect } from '../middleware/redirect.js'
import { createSession } from './session.js'

export const authRoutes = Router();

authRoutes.get('/login', (_req, res) => {
    res.send(`
    <form method="POST" action="/auth/login">
        <input name="username" />
        <input name="password" type="password" />
        <button>Login</button>
    </form>
  `)
})

authRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await authenticate(username, password);
    if (!user) return res.status(401).send('Invalid credentials');

    await createSession(req, user);
    return postLoginRedirect(req, res);
})

async function authenticate(_username: string, _password: string) {
    return { id: 'u1', name: 'demo' };
}