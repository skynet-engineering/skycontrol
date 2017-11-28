import os

import skycommand.discovery

from skycontrol.handlers.base_handler import BaseHandler

DEFAULT_IP_RANGE = '172.27.0.*'


class DiscoverHandler(BaseHandler):
    """
    Discover all other drones in the network.
    """

    methods = ['POST']
    path = '/api/discover'

    def run(self):
        drones = skycommand.discovery.discover_drones(
            ip_range=os.environ.get('IP_RANGE', DEFAULT_IP_RANGE),
            parallel=True,
        )
        return self.success(data=drones)
