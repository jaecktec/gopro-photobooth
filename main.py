#!/usr/bin/env python3
"""
Module Docstring
"""

__author__ = "Your Name"
__version__ = "0.1.0"
__license__ = "MIT"

import time

from flask import Flask, jsonify, send_from_directory, Response
import os
from goprocam import GoProCamera
import threading
from gopro_camera import Camera
from logzero import logger


class FuncThread(threading.Thread):
    def __init__(self, target, *args):
        self._target_asdf = target
        self._args_asdf = args
        threading.Thread.__init__(self)

    def run(self):
        self._target_asdf(*self._args_asdf)


def gen(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


def create_app(camera, gopro, config=None):
    app = Flask(__name__)
    app.config.update(dict(DEBUG=False))
    app.config.update(config or {'RESULT_STATIC_PATH': './static'})

    @app.route("/")
    def index():
        return send_from_directory(app.config['RESULT_STATIC_PATH'], "index.html")

    @app.route("/<path:path>")
    def foo_url_arg(path):
        # return jsonify({"echo": someId})
        return send_from_directory(app.config['RESULT_STATIC_PATH'], path)

    @app.route('/video_feed')
    def video_feed():
        """Video streaming route. Put this in the src attribute of an img tag."""
        return Response(gen(camera),
                        mimetype='multipart/x-mixed-replace; boundary=frame')

    @app.route('/take-picture', methods=['POST'])
    def take_picture():
        return jsonify({"echo": gopro.take_photo(0)})

    return app


def main():
    gopro = GoProCamera.GoPro()

    def gopro_thread():
        gopro.stream("udp://127.0.0.1:10000", quality="low")
        pass

    t1 = FuncThread(gopro_thread)
    t1.daemon = True
    t1.start()
    camera = Camera()

    port = int(os.environ.get("PORT", 8000))
    app = create_app(camera, gopro)
    app.run(host="0.0.0.0", port=port)


if __name__ == "__main__":
    """ This is executed when run from the command line """
    main()
