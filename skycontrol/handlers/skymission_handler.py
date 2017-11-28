from skycontrol.handlers.base_handler import BaseHandler
from skycontrol.util.handler import require_params
from skycontrol.util.request import resource


class SkymissionHandler(BaseHandler):
    """
    Make a request to an arbitrary Skymission by ID, via Skyserve.
    """

    methods = ['POST']
    path = '/api/skymission/<path:skymission_path>'

    @require_params('drone_ip', 'mission_id')
    def run(self, skymission_path):
        data, status = resource(
            drone_ip=self.data['drone_ip'],
            mission_id=self.data['mission_id'],
            path=skymission_path,
            data=self.data.get('data'),
        )

        return self.success(data=data, status=status)
