import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';
import { generateTokenMiddleware } from '../passport';

const router = express.Router();

/**
 * @api {post} /auth/login Login User
 * @apiName Login user
 * @apiPermission None
 * @apiGroup Authentication
 *
 * @apiSuccess {String} status Possible value: 'ok', 'wrongPassword', 'invalidUser', etc.
 * @apiSuccess {Object} user User Object
 * @apiSuccess {String} user.id User ID
 * @apiSuccess {String} user.username Username
 * @apiSuccess {String} token JWT token that can be placed in HEADER for authorization
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      "status": "ok",
 *      "user": {
 *        "id": "58af171ace68fe000f732753",
 *        "username": "isaac"
 *      },
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODgzNjkzODUsImV4cCI6MTQ4ODM3NjU4NX0.-fNQqa3zJZaCPB14G4wd6PoZTg3FV7dATkf9LCS_Rxg"
 *    }
 */
router.post('/login',
  passport.authenticate('local', { session: false, failWithError: true }),
  generateTokenMiddleware,
  async (req: any, res) => {
    res.json({ user: req.user, token: req.token });
  }
);

/**
 * @api {post} /auth/signup Signup User
 * @apiName Signup user
 * @apiPermission None
 * @apiGroup Authentication
 *
 * @apiParam {String} username Username of the new user
 * @apiParam {String} password Password of the new user
 *
 * @apiSuccess {String} id User ID of the new user
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      "id": "58af171ace68fe000f732753"
 *    }
 *
 * @apiError {String} error Possible value: 'alreadyExist', 'databaseError', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "alreadyExist"
 *    }
 *
 */
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await act({ role: 'auth', cmd: 'signup', username, password });
    res.json({ id });
  } catch (err) {
    res.status(403).json({ error: err.details.message });
  }
});

export default router;