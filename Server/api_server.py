# Server
import hug
from hug_middleware_cors import CORSMiddleware

# Python
import os
import sys
import json

from datetime import datetime

# Logging
import logging
logging.basicConfig(level=logging.INFO)

from MongoRouter.MongoRouter import MongoRouter
mongo = MongoRouter()

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api, allow_origins=["*"]))

@hug.post('/scores')
def scores(*args, **kwargs):
    logging.info("Args")
    logging.info(args)

    print("Args")
    print(args)

    logging.info("Kwargs")
    logging.info(kwargs)

    print("Kwargs")
    print(kwargs)

    mongo.route("balls").insert({
        "user": kwargs["user"], "click_counter": kwargs["click_counter"], "ball_counter": kwargs["ball_counter"], "time": datetime.now()
    })


    scores = []

    for entry in mongo.route("balls").find({}):
        scores.append({
            "user": entry["user"], "click_counter": entry["click_counter"], "ball_counter": entry["ball_counter"],
            "time": entry["time"]
        })

    return {
        "scores": scores
    }