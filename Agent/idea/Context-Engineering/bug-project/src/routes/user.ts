import { Router } from 'express'

export const userRoutes = Router()

userRoutes.get('/dashboard', (req, res) => {
    res.send(`<h1>Welcome ${req.session?.userId}</h1>`)
})

userRoutes.get('/settings', (_req, res) => {
    res.send('<h1>Settings</h1>')
})