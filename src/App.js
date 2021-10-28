import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomRoute from "./util/CustomRoute";
import Chat from "./Chat";
import Playground from "./Playground";
import Cats from "./Cats";
import Home from "./Home";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/compat";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },
}));

/*
export const firebaseConfig = {
  apiKey: "AIzaSyANtBaeDjrPPzY6TIrjq8CMvSB3Az5agL0",
  authDomain: "gb-react-project-350cd.firebaseapp.com",
  projectId: "gb-react-project-350cd",
  databaseURL:
    "https://gb-react-project-350cd-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "gb-react-project-350cd.appspot.com",
  messagingSenderId: "524675586930",
  appId: "1:524675586930:web:571c4afa11c8f74e439beb",
};
*/

export const firebaseConfig = {
  apiKey: "AIzaSyDm1wj26rbNxj0bVjxCKFEFz_gwdNjt_3w",
  authDomain: "firstfirebaseproject-28a85.firebaseapp.com",
  databaseURL: "https://firstfirebaseproject-28a85-default-rtdb.firebaseio.com",
  projectId: "firstfirebaseproject-28a85",
  storageBucket: "firstfirebaseproject-28a85.appspot.com",
  messagingSenderId: "433394342251",
  appId: "1:433394342251:web:81ac7881b103624e73142e"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();

const App = () => {
  const classes = useStyles();

  const [user, loading] = useAuthState(firebase.auth());

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <Router>
      <div className={classes.mainWrapper}>
        {/* <AppBar /> */}

        <Switch>
          <CustomRoute secured path="/chat/:id">
            <Chat />
          </CustomRoute>

          <CustomRoute path="/playground" secured withAppBar={true}>
            <Playground myProps={1} />
          </CustomRoute>

          <Route path="/cats" secured withAppBar={true}>
            <Cats />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/" withAppBar={false}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
