import { STATES } from "../data/states";
import { serializeErrorResponse, serializeEntityResponse } from "../utils/json";
import _ from "lodash";
import { ERRORS } from "../data/errors";
import { sleep } from "../utils/sleep";

const respondWithState = (exclude = null) => {
  const state = _.sample(_.filter(STATES, (s) => s !== exclude));
  return serializeEntityResponse({ state });
};

const respondWithError = () => {
  const error = _.sample(ERRORS);
  return serializeErrorResponse(error, error.code);
};

const respondWithTimeout = async () => await sleep(600);

export const showState = async (req, res) => {
  const dice = Math.random();

  const forceError = req.query.error === "1";
  const forceTimeout = req.query.timeout === "1";
  const forceSuccess = req.query.success === "1";
  const isForced = forceError || forceTimeout || forceSuccess;

  const shouldError = dice <= 0.2;
  const shouldTimeout = dice > 0.2 && dice <= 0.4;

  if ((isForced && forceError) || (!isForced && shouldError)) {
    return res.json(respondWithError());
  } else if ((isForced && forceTimeout) || (!isForced && shouldTimeout)) {
    await respondWithTimeout();
    return res.sendStatus(504);
  } else {
    const excludeState = req.params.exclude || req.query.exclude || null;
    return res.json(respondWithState(excludeState));
  }
};
