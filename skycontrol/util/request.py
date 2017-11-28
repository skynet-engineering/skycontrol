import requests


def resource(drone_ip, path, mission_id=None, data={}, skyserve_port=5000):
    """
    Access a resource at a drone via a path.

    :param drone_ip: IP of the drone.
    :param path: Path to request.
    :param mission_id: ID of a mission, if this is a mission request.
    :param data: Optional JSON payload to attach to the request.
    :param skyserve_port: Port Skyserve is running on.
    :return: A tuple of (response JSON, status code) from the drone.
    """
    mission_path = 'mission/{mission_id}/{path}'.format(mission_id=mission_id, path=path)

    resp = requests.post(
        url='http://{drone_ip}:{skyserve_port}/{skyserve_path}'.format(
            drone_ip=drone_ip,
            skyserve_port=skyserve_port,
            skyserve_path=mission_path if mission_id else path,
        ),
        json=data or {},
        headers={
            'X-Skynet-Source': 'skycontrol',
        },
    )

    try:
        return resp.json().get('data', {}), resp.status_code
    except ValueError:
        return {}, resp.status_code
