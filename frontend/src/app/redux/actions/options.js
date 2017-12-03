export const SET_EXPANDED_VISIBILITY = 'SET_EXPANDED_VISIBILITY';
export const SET_MAP_TYPE = 'SET_MAP_TYPE';

/**
 * Set whether expanded visibility of marker information should always be visible.
 *
 * @param {boolean} isExpanded True to set expanded visibility; false to unset.
 */
export const setExpandedVisibility = (isExpanded) => ({
  type: SET_EXPANDED_VISIBILITY,
  payload: { isExpanded },
});

/**
 * Set the map type.
 *
 * @param {string} mapType Constant describing the map type to set.
 */
export const setMapType = (mapType) => ({
  type: SET_MAP_TYPE,
  payload: { mapType },
});
