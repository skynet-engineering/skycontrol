import { combineReducers } from 'redux';
import droneReducer from 'app/redux/reducers/drone';
import optionsReducer from 'app/redux/reducers/options';
import progressReducer from 'app/redux/reducers/progress';

const reducer = combineReducers({
  drone: droneReducer,
  options: optionsReducer,
  progress: progressReducer,
});

export default reducer;
