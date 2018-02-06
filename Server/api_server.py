# Server
import hug
from hug_middleware_cors import CORSMiddleware

# Python
import os
import sys
import json

# Logging
import logging
logging.basicConfig(level=logging.INFO)

from MongoRouter.MongoRouter import MongoRouter
mongo = MongoRouter()

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api, allow_origins=["*"]))

@hug.post('/scores')
def autocomplete(*args, **kwargs):
    logging.info("Args")
    logging.info(args)

    print("Args")
    print(args)

    logging.info("Kwargs")
    logging.info(kwargs)

    print("Kwargs")
    print(kwargs)

    return {
        "scores": [{"user": "hardcoded", "click_counter": "hardcoded", "ball_counter": "hardcoded"}]
    }