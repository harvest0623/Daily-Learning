import express from 'express'
import cookieParser from 'cookie-parser'
import { authRoutes } from './auth/login.js'
import { userRoutes } from './routes/user.js'
import { adminRoutes } from './routes/admin.js'
import { indexRoutes } from './routes/index.js'
import { setReturnTo } from './middleware/auth.js'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(setReturnTo);

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => console.log('http://localhost:3000'));