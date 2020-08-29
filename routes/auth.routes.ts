import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

import { UserModel } from '../models';

const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Min lenght 6 symbols').isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }
      const { email, password } = req.body;

      const candidate = await UserModel.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User with this email already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch(error) {
      res.status(500).json({ message: "Something goes wrong" });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' },
      )

      res.json({ token, userId: user.id });
    } catch(error) {
      res.status(500).json({ message: "Something goes wrong" });
    }
  }
);

export { router };