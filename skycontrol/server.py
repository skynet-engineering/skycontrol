import os

from flask import Flask
from flask import jsonify
from flask import request

from skycontrol.handlers import handler_classes


def init_handlers(app):
    """
    Initialize all server-side handlers for the HTTP server.

    :param app: Flask application instance.
    """
    def map_handler_func(HandlerClass):
        """
        Create all necessary params for adding this route to the Flask server.

        :param HandlerClass: Handler class to prepare.
        :return: A tuple of (path, name, view_func, methods) for this handler.
        """
        def handler_wrapper(*args, **kwargs):
            # Provide an abstraction for supplying the handler with request JSON.
            data = request.get_json(force=True, silent=True) or {}
            handler = HandlerClass(data)
            resp_json, status = handler.invoke(*args, **kwargs)
            return jsonify(resp_json), status

        return HandlerClass.path, HandlerClass.__name__, handler_wrapper, HandlerClass.methods

    for rule, endpoint, view_func, methods in map(map_handler_func, handler_classes):
        app.add_url_rule(
            rule=rule,
            endpoint=endpoint,
            view_func=view_func,
            methods=methods,
        )

    @app.errorhandler(404)
    def frontend(*args, **kwargs):
        """
        Serve the frontend interface for all non-API routes.
        """
        return app.send_static_file('index.html')


def main():
    """
    Start the main backend server.
    """
    app = Flask(__name__, static_folder='../frontend/dist')
    init_handlers(app)
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 3000)),
        threaded=True,
        debug=True,
    )


if __name__ == '__main__':
    main()
