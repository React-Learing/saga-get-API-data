import { connect } from "react-redux";
import Firebase from "../components/firebase";
import * as ActionCreators from "../actions";

export default connect(
  state => ({ data:state.read }),
  ActionCreators
)(Firebase);