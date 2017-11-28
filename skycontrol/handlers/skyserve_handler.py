from skycontrol.handlers.base_handler import BaseHandler
from skycontrol.util.handler import require_params
from skycontrol.util.request import resource


class SkyserveHandler(BaseHandler):
    """
    Make a request to an arbitrary Skyserve handler.
    """

    methods = ['POST']
    path = '/api/skyserve/<path:skyserve_path>'

    @require_params('drone_ip')
    def run(self, skyserve_path):
        data, status = resource(
            drone_ip=self.data['drone_ip'],
            path=skyserve_path,
            data=self.data.get('data'),
        )

        return self.success(data=data, status=status)
