import axios from "axios";

const BASE_URI = "http://localhost:8000";

const client = axios.create({
    baseURL: BASE_URI,
    json: true,
});

class APIClient {
    async createTimesheetEntry(ts) {
        const timesheet = {
            name: ts.name
        };
        return this.perform("post", "/api/shifts", timesheet);
    }

    getTimesheetEntries() {
        return this.perform("get", "/api/shifts");
    }
    getTimesheetEntriesRange(userId, from, to) {
        // we'll need to do date validation at some point 
        // and we need to send a backend error if the parameter is incorrect 
        return this.perform("get", `/api/shifts/${userId}/?from=${from}&to=${to}`);
    }
    updateTimesheetEntry(ts) {
        const timesheet = {
            name: ts.name
        };
        return this.perform("put", "/api/shifts", timesheet);
    }

    async perform(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
        }).then((resp) => {
            return resp.data ? resp.data : [];
        });
    }
}

export default APIClient;
