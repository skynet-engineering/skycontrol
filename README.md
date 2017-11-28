# skycontrol

Skycontrol is a GCS frontend for controlling a fleet of drones running the Skynet software platform.

## Running

### SITL

1. Initialize SITL with at least two output ports via MAVProxy.
2. Run Skyserve, specifying `FC_ADDR` to one of the MAVProxy output ports.
3. `cd frontend && npm run build`
4. `make serve`
5. Run any Skymission, specifying the unused MAVProxy output port as appropriate.
6. Navigate to `localhost:3000` in a web browser

### On the GCS

1. `cd frontend && npm run build`
2. `make serve`
3. Navigate to `localhost:3000` in a web browser

## Development

### Backend

The backend application is a simple Flask server that proxies requests to Skyserve instances. All files are in directory `skycontrol/`.

Start the backend server with `make serve`.

### Frontend

The frontend is a React/Redux-based SPA, entirely decoupled from the backend. The project is in directory `frontend/`.

Build the frontend into a standalone HTML file served by the backend server with `npm run build`, or `npm run build-watch` to auto-rebuild on file changes.
