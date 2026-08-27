import { Router } from 'express'

export const indexRoutes = Router()

indexRoutes.get('/', (_req, res) => {
    res.send('<h1>Home</h1><a href="/user/dashboard">Dashboard</a>')
})