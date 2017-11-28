from functools import wraps


def require_params(*params):
    """
    Require JSON input params to be supplied to the target handler function.

    :param params: List of param names to require.
    :return: Decorated function that will error if not all params are supplied.
    """
    def decorator(func):
        @wraps(func)
        def wrapped_run(self, *args, **kwargs):
            missing_params = set(params).difference(self.data)
            if len(missing_params):
                return self.error(
                    data=list(missing_params),
                    status=400,
                    message='Expected params are missing from input payload.',
                )

            return func(self, *args, **kwargs)

        return wrapped_run
    return decorator
