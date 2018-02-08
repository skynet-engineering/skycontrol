import os

import skycommand.discovery

from skycontrol.handlers.base_handler import BaseHandler


class DiscoverHandler(BaseHandler):
    """
    Discover all other drones in the network.
    """

    methods = ['GET']
    path = '/api/discover'

    def run(self):
        drones = skycommand.discovery.discover_drones(local=bool(os.environ.get('SITL')))
        return self.success(data=[
            {'ip': ip, 'port': port}
            for ip, port in drones
        ])
