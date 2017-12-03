import {
  SET_SELECTED_DRONE,
  SET_SELECTED_MISSION,
  SET_CONTROL_PANEL_VISIBILITY,
} from 'app/redux/actions/drone';
import createReducer from 'app/redux/reducers/create-reducer';

const initialState = {
  selectedDrone: null,
  selectedMission: null,
  isControlPanelVisible: true,
};

const setSelectedDroneReducer = (state, action) => ({
  ...state,
  selectedDrone: action.payload.droneIP,
  selectedMission: null,
  isControlPanelVisible: true,
});

const setSelectedMissionReducer = (state, action) => ({
  ...state,
  selectedMission: action.payload.missionID,
});

const setControlPanelVisibilityReducer = (state, action) => ({
  ...state,
  isControlPanelVisible: action.payload.isVisible,
});

const reducerMapping = {
  [SET_SELECTED_DRONE]: setSelectedDroneReducer,
  [SET_SELECTED_MISSION]: setSelectedMissionReducer,
  [SET_CONTROL_PANEL_VISIBILITY]: setControlPanelVisibilityReducer,
};

export default createReducer(reducerMapping, initialState);
