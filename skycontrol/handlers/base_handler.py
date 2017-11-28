from threading import Thread


class BaseHandler(object):
    """
    Base endpoint logic handler.
    """

    # Methods recognized by this handler.
    methods = ['GET']
    # Route recognized by this handler.
    path = None
    # Whether the handler should run asynchronously (i.e., return a response to the client
    # immediately after invocation while running the logic in the background).
    async = False

    def __init__(self, data):
        """
        Create a handler.

        :param data: Input JSON payload.
        """
        self.data = data

    def success(self, data={}, status=200):
        """
        Return to the client with a success response.

        :param data: Optional data payload to send to the client.
        :param status: Optional HTTP status code to attach to the response.
        :return: A tuple of (response JSON, status code).
        """
        return {
            'success': True,
            'message': None,
            'data': data,
        }, status

    def error(self, data={}, status=500, message='Something went wrong.'):
        """
        Return to the client with an error response.

        :param data: Optional data payload to send to the client.
        :param status: Optional HTTP status to attach to the response.
        :param message: Optional string message describing the error.
        :return: A tuple of (response JSON, status code).
        """
        return {
            'success': False,
            'message': message,
            'data': data,
        }, status

    def run(self, *args, **kwargs):
        """
        Run the handler's core logic routine.
        """
        raise NotImplementedError('Handler logic not implemented.')

    def invoke(self, *args, **kwargs):
        """
        Invoke this handler from the server, respecting the asynchronous election by the handler.

        :return: A tuple of (response JSON, status code).
        """
        def async_task():
            return self.run(*args, **kwargs) or self.success()

        if self.async:
            thread = Thread(target=async_task)
            thread.daemon = True
            thread.start()
            return self.success()

        return async_task()


class BaseAsyncHandler(BaseHandler):
    """
    Asynchronous handler. An HTTP response is sent to the client immediately while the core handler
    logic runs asynchronously in a background thread.
    """

    async = True
