export const SET_SELECTED_DRONE = 'SET_SELECTED_DRONE';
export const SET_SELECTED_MISSION = 'SET_SELECTED_MISSION';
export const SET_CONTROL_PANEL_VISIBILITY = 'SET_CONTROL_PANEL_VISIBILITY';

/**
 * Set the selected drone for controlling.
 */
export const setSelectedDrone = (droneIP) => ({
  type: SET_SELECTED_DRONE,
  payload: { droneIP },
});

/**
 * Set the currently selected mission to control.
 *
 * @param {string|null} missionID Mission ID to control.
 */
export const setSelectedMission = (missionID) => ({
  type: SET_SELECTED_MISSION,
  payload: { missionID },
});

/**
 * Set whether to collapse or expand the control panel.
 *
 * @param {boolean} isVisible True to set the control panel to be visible; false otherwise.
 */
export const setControlPanelVisibility = (isVisible) => ({
  type: SET_CONTROL_PANEL_VISIBILITY,
  payload: { isVisible },
});
