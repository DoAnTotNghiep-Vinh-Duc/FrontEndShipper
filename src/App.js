import { Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./features/Home/Home";
import MyOrder from "./features/MyOrder/MyOrder";
import MyOrderDetail from "./features/MyOrder/MyOrderDetail/MyOrderDetail";
import SignIn from "./features/SignIn/SignIn";
import "./sass/index.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/myOrders" exact>
          <MyOrder />
        </Route>

        <Route path="/orderDetail/:orderId" exact>
          <MyOrderDetail />
        </Route>

        <Route path="/signin" exact>
          <SignIn />
        </Route>

        <Route path="*" component={SignIn}></Route>
      </Switch>
    </div>
  );
}

export default App;
