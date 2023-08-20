/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
// import formatvehiclesDate from "./format-vehicles-date";
// import formatvehiclesTime from "./format-vehicles-date";

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
	try {
		const response = await fetch(url, options);

		if (response.status === 204) {
			return null;
		}

		const payload = await response.json();

		if (payload.error) {
			return Promise.reject({ message: payload.error });
		}
		return payload.data;
	} catch (error) {
		if (error.name !== "AbortError") {
			console.error(error.stack);
			throw error;
		}
		return Promise.resolve(onCancel);
	}
}

/**
 * Retrieves all existing vehicles.
 * @returns {Promise<[vehicles]>}
 *  a promise that resolves to a possibly empty array of vehicles saved in the database.
 */
export async function listVehicles(signal) {
	const url = new URL(`${API_BASE_URL}/vehicles`);
	return await fetchJson(url, { headers, signal }, []);
}

/**
 * 'create' objects can include: vehicles, drivers, dispatchers, apoyos, customers.
 *  @param obj_type
 * 	describes the object type 'String' can only be vehicles, drivers, dispatchers, apoyos, customers.
 * 	@param obj
 * 	objects information that is being created with 'Object'
 */
export async function createObj(obj_type, obj, signal) {
	const url = `${API_BASE_URL}/${obj_type}`;
	const options = {
		method: "POST",
		headers,
		body: JSON.stringify({ data: obj }),
		signal,
	};
	return await fetchJson(url, options, {});
}

/**
 * 'read' objects to get singular one.
 *  @param obj_type
 * 	describes the object type 'String' can only be vehicles, drivers, dispatchers, apoyos, customers.
 * 	@param obj_id
 * 	object id thats being read 'String'.
 */
export async function readObj(obj_type, obj_id, signal) {
	const url = new URL(`${API_BASE_URL}/${obj_type}/${obj_id}`);
	return await fetchJson(url, { headers, signal }, []);
}

/**
 * 'edit' objects can include: vehicles, drivers, dispatchers, apoyos, customers.
 * 	@param obj
 * 	objects information that is being edited with 'Object'
 *  @param obj_type
 * 	describes the object type 'String' can only be vehicles, drivers, dispatchers, apoyos, customers.
 */
export async function editObj(obj_type, obj, signal) {
	const subsObjType = obj_type.substring(0, obj_type.length - 1);
	const obj_id = obj[`${subsObjType}_id`];
	const url = `${API_BASE_URL}/${obj_type}/${obj_id}`;
	const options = {
		method: "PUT",
		headers,
		body: JSON.stringify({ data: { ...obj } }),
		signal,
	};
	return await fetchJson(url, options, {});
}
