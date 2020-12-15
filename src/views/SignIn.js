import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from 'assets/img/mmf_logo.png';
import ProgressButton from 'react-progress-button';
import { SignIn } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import { ThemeProvider } from '@material-ui/core/styles'


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
        backgroundImage: 'url(./signin_bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
});


class MySignIn extends SignIn {

    constructor(props) {
        super(props);
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


    async signIn(event) {
        if (event) {
			event.preventDefault();
        }

        if (!Auth || typeof Auth.signIn !== 'function') {
			throw new Error(
				'No Auth module found, please ensure @aws-amplify/auth is imported'
			);
        }

        if(!this.state.number || !this.state.password) {
            this.setState(
                {
                    numberError: !this.state.number,
                    passwordError: !this.state.password,
                }
            );

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
    }


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