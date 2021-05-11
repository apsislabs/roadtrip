import _ from "lodash";

export const serializeEntityResponse = (data) => {
  return {
    data,
  };
};

export const serializeCollectionResponse = (data) => {
  return {
    data: _.castArray(data),
  };
};

export const serializeMetaResponse = (meta) => {
  return { meta };
};

export const serializeErrorResponse = (errors, status) => {
  const errorsObjects = _.map(_.castArray(errors), (e) =>
    serializeError(e, status)
  );

  return {
    status,
    errors: errorsObjects,
  };
};

const serializeError = (error, status) => {
  return {
    status,
    detail: error.message,
  };
};
