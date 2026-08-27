import { Router } from 'express'

export const adminRoutes: Router = Router();

adminRoutes.get('/', (_req, res) => {
    res.send('<h1>Admin Panel</h1>')
})

adminRoutes.get('/users', (_req, res) => {
    res.send('<h1>Manage Users</h1>')
})