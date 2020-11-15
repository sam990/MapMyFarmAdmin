import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from './mmf_logo_signin.png';
import SignInImg from './signin_bg.jpg';
import ProgressButton from 'react-progress-button';
import 'react-progress-button/react-progress-button.css'
import './index.css';
import { SignIn } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'

// const useStyles = makeStyles ( theme => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         color: 'white'
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },

//     buttonText: {
//         fontWeight: "bold",
//         fontSize: "1em",
//     },

//     heading: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: '10px'
//     },

//     headingTypo: {
//         fontFamily: 'AlegreyaSansSCMedium',
//     },

//     logo: {
//         width: '20vh',
//         heading: '20vh',
//     },

//     window: {
//         backgroundImage: SignInImg,
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
// }));

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    buttonText: {
        fontWeight: "bold",
        fontSize: "1em",
    },

    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10px'
    },

    headingTypo: {
        fontFamily: 'AlegreyaSansSCMedium',
    },

    logo: {
        width: '20vh',
        heading: '20vh',
    },

    window: {
        backgroundImage: 'url(signin_bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
});

/* export default function SignIn() {
    const classes = useStyles();
    const [buttonState, setButtonState] = useState('');

    const clickHandler = (e) => {
        e.preventDefault();
        setButtonState('loading');
        setTimeout(
            () => setButtonState("success"), 1000
        );
    }

    return (
        <div className={classes.window}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <div className={classes.heading}>
                        <img src={logo} className={classes.logo} />
                        <Typography component="h1" variant="h4" className={classes.headingTypo}>
                            MapMyFarm Admin
                        </Typography>
                    </div>


                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="number"
                            label="Mobile Number"
                            name="number"
                            autoComplete="tel"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <ProgressButton
                            type="submit"
                            fullWidth
                            onClick={clickHandler}
                            // variant="contained"
                            // color="primary"
                            className={classes.submit}
                            state={buttonState}
                        >
                        <span className={classes.buttonText}>Sign In</span>
                        </ProgressButton>
                    </form>
                </div>
            </Container>
        </div>
    );
}
 */

// const window = {
//     backgroundImage: SignInImg,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
// };


class MySignIn extends SignIn {

    constructor(props) {
        super(props);
        // [this.buttonState, this.setButtonState] = useState('');
        this.state = {
            number: '',
            password: '',
            numberError: false,
            passwordError: false,
        };
        this.signIn = this.signIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
                [event.target.name + "Error"]: false,
            }
        )
    }

    resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 2000);
        });
    }

    async signIn(event) {
        if (event) {
			event.preventDefault();
        }
        // set Button State
        // this.setState({ buttonState: 'loading' });
        if (!Auth || typeof Auth.signIn !== 'function') {
			throw new Error(
				'No Auth module found, please ensure @aws-amplify/auth is imported'
			);
        }
        // console.log("Number: ", this.state.number);
        // console.log("Password: ",this.state.password);
        if(!this.state.number || !this.state.password) {
            this.setState(
                {
                    numberError: !this.state.number,
                    passwordError: !this.state.password,
                }
            );

            // setTimeout(() => {
            //     this.setState({buttonState: "error"});
            // }, 100);
            // this.setState({buttonState: ""});
            // this.setState({buttonState: "error"});
            console.log("called");
            // return new Promise((resolve, reject) => reject());
            throw new Error();
        }
        const { number, password } = this.state;
        try {
            const user = await Auth.signIn(number, password);
            this.changeState('signedIn', user);
        } catch (err) {
            console.log(err);
            throw err;
        }
        // let j = 1;
        // for (let i = 0; i < 10000000; i++) {
        //     i *= j;
        // }
        // return new Promise((resolve, reject) => resolve());
        // const result = await this.resolveAfter2Seconds();
    }

    // theme = createMuiTheme({
    //     palette: {
    //       type: 'dark'
    //     }
    // });

    showComponent(theme) {
        const { classes } = this.props;
        return (
        <ThemeProvider theme={theme}>
        <div className={classes.window}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <div className={classes.heading}>
                        <img src={logo} className={classes.logo} />
                        <Typography component="h1" variant="h4" className={classes.headingTypo}>
                            MapMyFarm Admin
                        </Typography>
                    </div>


                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="number"
                            label="Mobile Number"
                            name="number"
                            autoComplete="tel"
                            value={this.state.number}
                            onChange={this.handleChange}
                            autoFocus
                            error={this.state.numberError}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            error={this.state.passwordError}
                        />
                        <ProgressButton
                            type="submit"
                            controlled={false}
                            onClick={this.signIn}
                            // variant="contained"
                            // color="primary"
                            className={classes.submit}
                            // state={this.state.buttonState}
                        >
                        <span className={classes.buttonText}>Sign In</span>
                        </ProgressButton>
                    </form>
                </div>
            </Container>
        </div>
        </ThemeProvider>
    );
    }
}

export default withStyles(styles)(MySignIn);