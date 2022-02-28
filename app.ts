//import dotenv from 'dotenv';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import session, { CookieOptions, SessionOptions } from 'express-session';
import { auth0Strategy } from './config/authStrategy';
import passport from 'passport';
import userInView from './middleware/userInViews';
import routes from './routes';
import { port } from './config/config';
//dotenv.config();


passport.use(auth0Strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: any, done) {
  done(null, user);
});

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

const sessionOptions:SessionOptions = {
  secret: 'CHANGE THIS SECRET',
  cookie: { sameSite: false },
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  // If you are using a hosting provider which uses a proxy (eg. Heroku),
  // comment in the following app.set configuration command
  //
  // Trust first proxy, to prevent "Unable to verify authorization request state."
  // errors with passport-auth0.
  // Ref: https://github.com/auth0/passport-auth0/issues/70#issuecomment-480771614
  // Ref: https://www.npmjs.com/package/express-session#cookiesecure
  app.set('trust proxy', 1);
  sessionOptions.proxy = true;

  const cookieOptions: CookieOptions = {
    secure: true
  }
  sessionOptions.cookie = cookieOptions
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));


app.use(userInView());
app.use(routes);
// app.use((req:Request, res: Response, next:NextFunction) => {
//   console.log('404 error')
//   next(new Error('404'));
// })

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(port, async () => {
  console.log('starting server');
})