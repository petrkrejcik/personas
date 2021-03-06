export const ACTIONS = {
	editField: 'person/editField', // when typing in add/edit fields
	editPerson: 'person/editPerson', // when setting all fields to edit
	save: 'person/save', // when saving added/edited person
	FETCH: 'person/fetch',
	SET: 'person/set', // when setting from remote storage
	ADD: 'person/add',
	REMOVE: 'person/remove',
	TOGGLE_DELETE_OVERLAY: 'person/toggleDeleteOverlay',
	TOGGLE_ADD: 'person/toggleAdd',
};

/**
 * Sets a value to a one field in `personEdit` value in state.
 * @param {string} field
 * @param {any} value
 */
export const editField = (field, value) => ({type: ACTIONS.editField, payload: {field, value}});

/**
 * Sets person as `personEdit` into state.
 * @param {PersonEdit?} person
 */
export const editPerson = (person) => ({type: ACTIONS.editPerson, payload: person});

/**
 * Saves one person into the state.
 * @param {Person} person
 */
export const save = (person) => ({type: ACTIONS.save, payload: person});

/**
 * Removes person from state.
 * @param {string} id
 */
export const remove = (id) => ({type: ACTIONS.REMOVE, payload: id});

/**
 * Saves all persons to the state and overwrites all existing.
 * @param {Person[]} persons
 */
export const saveAll = (persons) => ({type: ACTIONS.SET, payload: persons});
export const toggleAdd = (isVisible) => ({type: ACTIONS.TOGGLE_ADD, payload: isVisible});
