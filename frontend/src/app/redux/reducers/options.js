import {
  SET_EXPANDED_VISIBILITY,
  SET_MAP_TYPE,
} from 'app/redux/actions/options';
import createReducer from 'app/redux/reducers/create-reducer';

export const MAP_TYPE_SIMPLE = 'roadmap';
export const MAP_TYPE_SATELLITE = 'satellite';

const initialState = {
  expandedVisibility: false,
  mapType: MAP_TYPE_SIMPLE,
};

const setExpandedVisibilityReducer = (state, action) => ({
  ...state,
  expandedVisibility: action.payload.isExpanded,
});

const setMapTypeReducer = (state, action) => ({
  ...state,
  mapType: action.payload.mapType,
});

const reducerMapping = {
  [SET_EXPANDED_VISIBILITY]: setExpandedVisibilityReducer,
  [SET_MAP_TYPE]: setMapTypeReducer,
};

export default createReducer(reducerMapping, initialState);
